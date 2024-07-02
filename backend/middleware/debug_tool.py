from django.conf import settings

class DebugTool:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            print('%%%%%%%%%%%%%%%%%%%%%%%%')
            print("Request: ")
            print(request.body.decode('utf-8'))

            response = self.get_response(request)

            print("\nResponse: ")
            print(response.data)

            print('%%%%%%%%%%%%%%%%%')

            return response
        except Exception as e:
            print('error in debug_tool: ', e)
            response = self.get_response(request)
            return response

