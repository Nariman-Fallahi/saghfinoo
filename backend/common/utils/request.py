

def get_page_and_limit(request, default_limit=21):
    """riase error if page was not found in query params or invalid. and if limit was invalid"""
    try:
        page = int(request.query_params['page'])
    except KeyError:
        e = ValueError("page is required in query params")
        e.dict = {'page': "page is required in query params"}
        raise e
    except:
        e = ValueError("invalid query param page")
        e.dict = {'page':"invalid query param page"}
        raise e

    try:
        limit = int(request.query_params.get('limit', default_limit))
    except:
        e = ValueError("invalid query param limit")
        e.dict = {'limit':'invalid query param limit'}
        raise e
    
    return page-1, limit
    

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    
    return ip