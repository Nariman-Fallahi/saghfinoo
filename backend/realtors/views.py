import uuid
import math
from PIL import Image

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import default_storage
from django.conf import settings
from django.db.models import Q

from common.utils.request import get_page_and_limit
from common import codes
from common.utils import validations
from common.utils.permissions import IsAdmin, IsOwner, IsRealtor
from common.utils.database import formated_datetime_now, ScoreManager

from .serializers import RealtorSerializer, RealtorResponseSerializer, RealtorPreviewResponseSerializer, CommentSerializer, CommentResponseSerializer, CommentScoreReasonResponseSerializer, ReportSerializer, ReportReasonResponseSerializer
from .models import Realtor, Comment, CommentScoreReason, ReportReason


class CreateSearchRealtor(APIView):
    serializer_class = RealtorSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def post(self, req):
        serializer = RealtorSerializer(data=req.data)
        if serializer.is_valid():
            realtor = serializer.save(user=req.user)
            return Response({"msg":"done", 'id':realtor.id, 'status':200})
        return Response({"errors":serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    

    def get(self, req):
        qp = dict(req.query_params)
        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})

        
        query = None
        if qp.get('city', '') != '':
            if type(qp['city']) == list:
                for c in qp['city']:
                    if c == '' or c == '"':
                        continue
                    try:
                        validations.validate_name(c)
                    except ValueError as e:
                        return Response({'erorrs':{'city':str(e)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
                    
                    if query:
                        query |= Q(real_estate_office__city=c)
                    else:
                        query = Q(real_estate_office__city=c)
            
            
        if query:
            query &= Q(is_confirmed=True)
        else:
            query = Q(is_confirmed=True)

        reou = req.query_params.get('reo_username', '')
        if reou != '':
            try:
                validations.validate_username(reou)
            except ValueError as e:
                return Response({'errors':{'reo_username':str(e)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
                
            query &= Q(real_estate_office__username=req.query_params['reo_username'])
            query &= Q(is_confirmed_by_real_estate_office=True)

        realtors = Realtor.objects.filter(query)[page*limit: page*limit+limit]
        realtors = RealtorPreviewResponseSerializer(realtors, many=True).data
        total_pages = math.ceil(Realtor.objects.filter(query).count()/limit)
        
    
        return Response({'data':realtors, 'total_pages':total_pages, 'status':200})



class GetTopRealtorsAPIView(APIView):
    def get(self, req):

        try:
            limit = int(req.query_params.get('limit', '8'))
        except:
            return Response({'errors':{'limit':'invalid limit'}, 'status':400})
        
        reo = Realtor.objects.all().order_by('-score')[:limit]
        reo = RealtorPreviewResponseSerializer(reo, many=True).data

        return Response({'data': reo, 'status':200})



class GetEditDeleteRealtorAPIView(APIView):
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def get(self, req, realtor_id):
        try:
            realtor = Realtor.objects.get(is_confirmed=True, id=realtor_id)
        except Realtor.DoesNotExist:
            return Response({'status':404, 'code':codes.OBJ_NOT_FOUND})

        realtor = RealtorResponseSerializer(realtor).data
        return Response({"data":realtor, 'status':200})        

    def put(self, req, realtor_id):
        serializer = RealtorSerializer(data=req.data)
        if serializer.is_valid():

            req.realtor.fill_from_dict(serializer.data)
            req.realtor.save()
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})



class UploadRealtorBGImageAPIView(APIView):

    def post(self, req):
            image = req.FILES.get('image', '')
            if image == '':
                return Response({'errors':{'image':'image not sent'}})

            if Image.open(image).format not in ('PNG', 'JPEG'):
                return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
            
            file_ext = image.name.split('.')[-1]
            file_name = f'{uuid.uuid4()}.{file_ext}'
            try:
                realtor = Realtor.objects.get(user=req.user)
            except Realtor.DoesNotExist:
                return Response({'errors':{'user':'user not realtor'}, 'code':codes.USER_IS_NOT_REALTOR, 'status':404})

            if realtor.bg_image:
                default_storage.delete(realtor.bg_image)
            realtor.bg_image = default_storage.save(f'users/{file_name}', image, max_length=1*1024*1024)
            realtor.bg_image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{realtor.bg_image}'
            realtor.save()

            return Response({"msg":"done", 'status':200})
    

#####################################  comment ################################################

class CreateGetAllCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return super().get_permissions()

    def post(self, req, realtor_id):
        """Create comment for realtor"""
        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                realtor = Realtor.objects.get(id=realtor_id)
            except Realtor.DoesNotExist:
                return Response({'errors':{'non-field-error':'realtor not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

            comment = serializer.save(owner=req.user, realtor=realtor)
            ScoreManager.increase_obj_score(comment.score, comment.realtor)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})

    def get(self, req, realtor_id):
        """Get Realtor comments by page"""
        try:
            page, limit = get_page_and_limit(req, default_limit=16)
        except ValueError as e:
            return Response({'errors': e.dict, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
        
        comments = Comment.objects.filter(realtor=realtor_id).order_by('-created_at')[page*limit:page*limit+limit]
        comments = CommentResponseSerializer(comments, many=True).data
        return Response({'data':comments, 'status':200})


class EditDeleteCommentAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]

    def put(self, req, comment_id):
        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return Response({'errors':{'non-field-error':'comment not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND}) 

            self.check_object_permissions(req, comment)

            old_score = comment.score

            comment.description = serializer.data['description']
            comment.score = serializer.data['score']
            comment.modified_at = formated_datetime_now()
            comment.save()

            ScoreManager.edit_obj_score(old_score, comment.score, comment.realtor)

            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
    def delete(self, req, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({'errors':{'non-field-error':'comment not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        
        self.check_object_permissions(req, comment)
        
        comment.delete()

        ScoreManager.decrease_obj_score(comment.score, comment.realtor)

        return Response({'msg':'done', 'status':200})
    
class GetAllCommentScoreReasonAPIView(APIView):
    
    def get(self, req):
        
        score = req.query_params.get('score', 0)
        try:
            validations.validate_integer(score)
        except ValueError as v:
            return Response({'errors':{'score':str(v)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})

        if score:
            csrs = CommentScoreReason.objects.filter(score=score)
        else:
            csrs = CommentScoreReason.objects.all()

        csrs = CommentScoreReasonResponseSerializer(csrs, many=True).data

        return Response({'data':csrs,'status':200})


######################## report ##################################

class CreateReportAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req, realtor_id):
        serializer = ReportSerializer(data=req.data)
        if serializer.is_valid():
            try:
                realtor = Realtor.objects.get(id=realtor_id)
            except Realtor.DoesNotExist:
                return Response({'errors':{'non-field-error':'realtor not exist'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

            serializer.save(user=req.user, realtor=realtor)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
class GetAllReportReasonsAPIView(APIView):
    
    def get(self, req):
        reasons = ReportReason.objects.all()
        reasons = ReportReasonResponseSerializer(reasons, many=True).data
        return Response({'data':reasons, 'status':200})