from rest_framework.views import exception_handler

def custom_error_handler(exc, context):
    # call rest framework default error handler first
    response = exception_handler(exc, context)
    
    response.data = customize_error_messages(response.data)

    response.data['status'] = response.status_code
    response.status_code = 200

    return response


def customize_error_messages(data):
    if data.get("detail", '') == "Authentication credentials were not provided.":
        del data['detail']
        data['error'] = "Authentication required"

    return data
