from drf_yasg import openapi
from common import codes

verify_number_schema_responses = {
    '200': openapi.Response(
        description="the OTP code with send to number",
        examples={
            'application/json':{
                "msg": "code sent to number",
                "code": codes.OTP_SENT,
                "token":"<token>",
                "status":200 
            }
        },
    ),



}