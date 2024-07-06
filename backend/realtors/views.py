from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import RealtorSerializer

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