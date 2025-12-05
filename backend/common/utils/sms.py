import logging
import http.client
import json

from django.conf import settings

logger = logging.getLogger(__name__)

def send_sms_otp(phone_number: str, otp: int):
    conn = http.client.HTTPSConnection('api.sms.ir', timeout=10)
    payload = {
        "mobile": phone_number,
        "templateId": settings.SMS_TEMPLATE_ID,
        "parameters": [
            {
                "name": "Code",
                "value": str(otp)
            }
        ]
    }
    headers = {
        "Content-Type": 'application/json',
        'Accept': 'text/plain',
        'x-api-key': settings.SMS_API_KEY
    }

    try:
        conn.request("POST", '/v1/send/verify', json.dumps(payload), headers)
        res = conn.getresponse()
        data = json.loads(res.read().decode('utf-8'))
        if data['status'] != 1:
            logger.error(f"cannot send sms: sms provider response: {data}")
            raise RuntimeError('cannot send sms')

    except Exception as e:
        logger.exception("failed to send sms")
        raise
    
    finally:
        try:
            conn.close()
        except:
            pass