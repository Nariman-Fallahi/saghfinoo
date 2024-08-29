import math
import uuid

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
from django.core.files.storage import default_storage
from django.conf import settings

from common.utils.permissions import IsRealEstateOfficeOwner, IsAdmin, IsRealtor, IsOwner
from common.utils.request import get_page_and_limit
from common.utils.database import formated_datetime_now, ScoreManager
from common import codes
from common.utils import validations
from django.db.models import Q

from .serializers import RealEstateOfficeSerializer, RealEstateOfficePreviewResponseSerializer, RealEstateOfficeResponseSerializer, CommentResponseSerializer, CommentSerializer, CommentScoreReasonResponseSerializer, ReportReasonResponseSerializer, ReportSerializer
from .models import RealEstateOffice, Comment, CommentScoreReason, ReportReason



class CreateSearchRealEstateOfficeAPIView(APIView):
    """after create, real estate office must be confirmed by admin"""

    serializer_class = RealEstateOfficeSerializer
    permission_classes = [IsAuthenticated, IsRealtor]
    authentication_classes = [JWTAuthentication]

    def post(self, req):
        """create real estate office"""
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            try:
                reo = RealEstateOffice.objects.get(owner=req.user)
                return Response({'errors':{"user":"user is already owner of "+reo.name}, 'code':codes.USER_IS_ALREADY_REO_OWNER, 'status':400})
            except RealEstateOffice.DoesNotExist:
                reo = serializer.save(owner=req.realtor.user)
                return Response({"msg": "done", 'status':200, 'id': reo.id})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})
    
    def get(self, req):
        """ Search for real estate office

            two city example: ?city=something1&city=something2
        """

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
                        return Response({'errors':{'city':str(e)}, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
                    
                    if query:
                        query |= Q(city=c)
                    else:
                        query = Q(city=c)
            
            
        if query:
            query &= Q(is_confirmed=True)
        else:
            query = Q(is_confirmed=True)

        reo = RealEstateOffice.objects.filter(query)[page*limit: page*limit+limit]
        reo = RealEstateOfficePreviewResponseSerializer(reo, many=True).data
        total_pages = math.ceil(RealEstateOffice.objects.filter(query).count()/limit)
    
        return Response({'data':reo, 'total_pages':total_pages, 'status':200})


class GetEditDeleteRealEstateOfficeAPIView(APIView):

    serializer_class = RealEstateOfficeSerializer
    permission_classes = [IsAuthenticated, (IsRealEstateOfficeOwner| IsAdmin)]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()

    def put(self, req, realestateoffice_username):
        """Edit real estate office"""

        try:
            reo = RealEstateOffice.objects.get(username=realestateoffice_username)
        except RealEstateOffice.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate office not found'}, 'code':codes.OBJ_NOT_FOUND, 'status':404})
        self.check_object_permissions(req, reo)
        
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save(id=realestateoffice_username)# TODO: fix save
            return Response({"msg":"done", 'status':200})
        return Response({"errors": serializer.errors, 'code':codes.INVALID_FIELD, 'status':400})

    def get(self, req, realestateoffice_username):
        """Get one real estate office by its username"""

        try:
            reo = RealEstateOfficeResponseSerializer(RealEstateOffice.objects.get(is_confirmed=True, username=realestateoffice_username))
        except RealEstateOffice.DoesNotExist:
            return Response({'status':404, 'code':codes.OBJ_NOT_FOUND})

        return Response({"data":reo.data, 'status':200})        

    def delete(self, req, realestateoffice_username):
        return Response({'msg':'not impelemented yet'}) # TODO:
    

class UploadDeleteRealEstateOfficeImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, realestateoffice_username):
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
        
        try:
            reo = RealEstateOffice.objects.get(username=realestateoffice_username)
        except RealEstateOffice.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate office not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        
        self.check_object_permissions(req, reo)

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if reo.image:
            default_storage.delete(reo.image)
        reo.image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        reo.image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{reo.image}'
        reo.save()

        return Response({"msg":"done", 'status':200})


    def delete(self, req, realestateoffice_username):
        return Response({'msg':'not impelemented yet'}) # TODO:
    


class UploadDeleteRealEstateOfficeBGImageAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]
    
    def post(self, req, realestateoffice_username):
        
        image = req.FILES.get('image', '')
        if image == '':
            return Response({'errors':{'image':'image not sent'}})

        if Image.open(image).format not in ('PNG', 'JPEG'):
            return Response({"errors":{"image":"invalid image format (accepted formats: PNG, JPEG)"}})
        
        try:
            reo = RealEstateOffice.objects.get(username=realestateoffice_username)
        except RealEstateOffice.DoesNotExist:
            return Response({'errors':{'non-field-error':'real estate office not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        
        self.check_object_permissions(reo)

        file_ext = image.name.split('.')[-1]
        file_name = f'{uuid.uuid4()}.{file_ext}'

        if reo.bg_image:
            default_storage.delete(reo.bg_image)
        reo.bg_image = default_storage.save(f'real_estate_offices/{file_name}', image, max_length=1*1024*1024)
        reo.bg_image_full_path = f'{settings.S3_ENDPOINT_URL_WITH_BUCKET}/{reo.bg_image}'
        reo.save()

        return Response({"msg":"done", 'status':200})

    def delete(self, req, realestateoffice_username):
        return Response({'msg':'not impelemented yet'}) # TODO:



#####################################  comment ################################################

class CreateGetAllCommentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return super().get_permissions()

    def post(self, req, realestateoffice_username):
        """Create comment for real estate office"""

        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                reo = RealEstateOffice.objects.get(username=realestateoffice_username)
            except RealEstateOffice.DoesNotExist:
                return Response({'errors':{'non-field-error':'real estate office not found'}, 'status':404, 'code': codes.OBJ_NOT_FOUND})

            comment = serializer.save(owner=req.user, real_estate_office=reo)

            comment.real_estate_office.number_of_comments += 1
            comment.real_estate_office.save()

            ScoreManager.increase_obj_score(comment.score, comment.real_estate_office)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})

    def get(self, req, realestateoffice_username):
        """Get all real estate office comments"""

        try:
            page, limit = get_page_and_limit(req, default_limit=16)
        except ValueError as e:
            return Response({'errors': e.dict, 'status':400, 'code':codes.INVALID_QUERY_PARAM})
        
        comments = Comment.objects.filter(real_estate_office__username=realestateoffice_username).order_by('-created_at')[page*limit:page*limit+limit]
        comments = CommentResponseSerializer(comments, many=True).data
        return Response({'data':comments, 'status':200})
    
    
class EditDeleteCommentAPIView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    authentication_classes = [JWTAuthentication]

    def put(self, req, realestateoffice_username, comment_id):
        """Edit real estate office comment"""

        serializer = CommentSerializer(data=req.data)
        if serializer.is_valid():
            try:
                comment = Comment.objects.get(id=comment_id)
            except Comment.DoesNotExist:
                return Response({'errors':{'non-field-error':'comment not found'}, 'status':404, 'code': codes.OBJ_NOT_FOUND}) 

            self.check_object_permissions(req, comment)

            old_score = comment.score

            comment.description = serializer.data['description']
            comment.score = serializer.data['score']
            comment.modified_at = formated_datetime_now()
            comment.save()

            ScoreManager.edit_obj_score(old_score, comment.score, comment.real_estate_office)

            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
    def delete(self, req, realestateoffice_username, comment_id):
        """Delete real estate office comment"""

        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({'errors':{'non-field-error':'comment not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})
        
        self.check_object_permissions(req, comment)
        comment.delete()

        comment.real_estate_office.number_of_comments -= 1
        comment.real_estate_office.save()

        ScoreManager.decrease_obj_score(comment.score, comment.real_estate_office)

        return Response({'msg':'done', 'status':200})


class GetAllCommentScoreReasonAPIView(APIView):
    
    def get(self, req, realestateoffice_username):
        """Get all Score Reasons for comments
        
        filter by score exampe: ?score=1"""
        
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

    def post(self, req, realestateoffice_username):
        """Create Report for real estate office"""
        serializer = ReportSerializer(data=req.data)
        if serializer.is_valid():
            try:
                reo = RealEstateOffice.objects.get(username=realestateoffice_username)
            except RealEstateOffice.DoesNotExist:
                return Response({'errors':{'non-field-error':'real estate office not found'}, 'status':404, 'code':codes.OBJ_NOT_FOUND})

            serializer.save(user=req.user, real_estate_office=reo)
            return Response({'msg':'done', 'status':200})
        
        return Response({'errors':serializer.errors, 'status':400, 'code':codes.INVALID_FIELD})
    
class GetAllReportReasonsAPIView(APIView):
    
    def get(self, req, realestateoffice_username):
        """Get all Report Reasons"""
        reasons = ReportReason.objects.all()
        reasons = ReportReasonResponseSerializer(reasons, many=True).data
        return Response({'data':reasons, 'status':200})