from rest_framework.permissions import BasePermission

from realtors.models import Realtor

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
            realtor = Realtor.objects.get(user=request.user, is_confirmed=True)
            request.realtor = realtor
            return True
        except Realtor.DoesNotExist:
            return False

class IsAdvertisementOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner.user == request.user
    

class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user