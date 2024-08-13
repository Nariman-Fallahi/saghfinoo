import uuid
import math
from PIL import Image

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.files.storage import default_storage
from django.conf import settings
from django.db.models import Q

from common.utils.request import get_page_and_limit
from common import codes
from common.utils import validations
from common.utils.permissions import IsAdmin, IsOwner
from common.utils.database import formated_datetime_now, ScoreManager

from .serializers import RealtorSerializer, RealtorResponseSerializer, RealtorPreviewResponseSerializer, CommentSerializer, CommentResponseSerializer
from .models import Realtor, Comment


class CreateRealtor(APIView):
    serializer_class = RealtorSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        serializer = RealtorSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save(user=req.user)
            return Response({"msg":"done", 'status':200})
        return Response({"errors":serializer.errors, 'status':400})
    


class GetAllRealtorAPIView(APIView):

    def get(self, req):
        try:
            page, limit = get_page_and_limit(req)
        except ValueError as e:
            return Response({'errors':e.dict, 'code':codes.INVALID_QUERY_PARAM, 'status':400})
        
        reo = Realtor.objects.filter(is_confirmed=True).values(*RealtorPreviewResponseSerializer.Meta.fields)[page*limit:page*limit+limit]
        
        return Response({'data':reo, 'status':200})
    
class GetRealtorAPIView(APIView):
    """get real estate office by username"""
    def get(self, req, realtor_id):
        try:
            reo = Realtor.objects.values(*RealtorResponseSerializer.Meta.fields).get(is_confirmed=True, id=realtor_id)
            return Response({"data":reo, 'status':200})        
        except Realtor.DoesNotExist:
            return Response({'status':404})



class SearchRealtorsAPIView(APIView):

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

        reo = Realtor.objects.values(*RealtorPreviewResponseSerializer.Meta.fields).filter(query)[page*limit: page*limit+limit]
        total_pages = math.ceil(Realtor.objects.filter(query).count()/limit)
        
    
        return Response({'data':reo, 'total_pages':total_pages, 'status':200})



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

class CreateCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, req, realtor_id):
        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                realtor = Realtor.objects.get(id=realtor_id)
            except Realtor.DoesNotExist:
                return Response({'errors':{'non-field-error':'realtor not found'}, 'status':404})

            comment = serializer.save(owner=req.user, realtor=realtor)
            ScoreManager.increase_realtor_score(comment.score, comment.realtor)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
class EditCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, req, comment_id):
        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return Response({'errors':{'non-field-error':'comment not found'}, 'status':404}) 

            old_score = comment.score

            comment.description = serializer.data['description']
            comment.score = serializer.data['score']
            comment.modified_at = formated_datetime_now()
            comment.save()

            ScoreManager.edit_realtor_score(old_score, comment.score, comment.realtor)

            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
class GetAllRealtorCommentsAPIView(APIView):

    def get(self, req, realtor_id):
        try:
            page, limit = get_page_and_limit(req, default_limit=16)
        except ValueError as e:
            return Response({'errors': e.dict, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
        
        comments = Comment.objects.filter(realtor=realtor_id).values(*CommentResponseSerializer.Meta.fields).order_by('-created_at')[page*limit:page*limit+limit]
        return Response({'data':comments, 'status':200})
    
class DeleteCommentAPIVew(APIView):
    permission_classes = [IsAuthenticated, IsOwner|IsAdmin]
    authentication_classes = [JWTAuthentication]

    def delete(self, req, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({'errors':{'non-field-error':'comment not found'}, 'status':404})
        
        self.check_object_permissions(req, comment)
        print('deleteing --------------------------')
        comment.delete()

        ScoreManager.decrease_realtor_score(comment.score, comment.realtor)

        return Response({'msg':'done', 'status':200})
