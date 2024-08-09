

def get_page_and_limit(request, default_limit=21):
    """riase error if page was not found in query params or invalid. and if limit was invalid"""
    try:
        page = int(request.query_params['page'])
    except KeyError:
        e = ValueError("page not found in query params")
        e.dict = {'page': "page not found in query params"}
        raise e
    except:
        e = ValueError("invalid page")
        e.dict = {'page':"invalid page"}
        raise e

    try:
        limit = int(request.query_params.get('limit', default_limit))
    except:
        e = ValueError("invalid limit")
        e.dict = {'limit':'invalid limit'}
        raise e
    
    return page-1, limit
    