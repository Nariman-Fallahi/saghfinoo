from rest_framework.permissions import BasePermission

from . import realtor_model
from real_estate_offices.models import RealEstateOffice

class IsRealEstateOfficeOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
            
    
class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return False

    def has_object_permission(self, request, view, obj):
        return False
        # todo: complete

class IsRealtor(BasePermission):
    
    def has_permission(self, request, view):
        try:
            realtor = realtor_model.objects.get(user=request.user, is_confirmed=True)
            request.realtor = realtor
            return True
        except realtor_model.DoesNotExist:
            return False

class IsRealEstateOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner.user == request.user