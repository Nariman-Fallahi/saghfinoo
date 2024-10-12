from django.http import JsonResponse
from common import codes

def json404(request, exception=None):
    return JsonResponse({'status':404, 'code': codes.PAGE_NOT_FOUND})

def json500(request, exception=None):
    return JsonResponse({'status':500, 'code':codes.SERVER_ERROR})