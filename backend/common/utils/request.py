

def get_page_and_limit(request):
    """riase error if page was not found or invalid. and if limit was invalid"""
    try:
        page = int(request.query_params['page'])
    except KeyError:
        e = KeyError("page not found in query params")
        e.dict = {'page': "page not found in query params"}
        raise e
    except:
        e = ValueError("invalid page")
        e.dict = {'page':"invalid page"}
        raise e

    try:
        limit = int(request.query_params.get('limit', 21))
    except:
        e = ValueError("invalid limit")
        e.dict = {'limit':'invalid limit'}
        raise e
    
    return page-1, limit
    