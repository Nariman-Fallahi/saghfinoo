from django.core.cache import caches
from django.urls import reverse

auth_cache = caches['auth']

from common import codes


def test_invalid_field(self, url, data, invalid_chrs=None):
    """default invalid chrs: #!@&/\)(*^%${[<>=+`~]})'\""""
    
    default_data = data
    FIELDS = data.keys()
    INVALID_CHARS = "#!@&/\\)(*^%${[<>=+`~]})'\""
    if invalid_chrs:
        INVALID_CHARS = invalid_chrs
    
    for field in FIELDS:
        for char in INVALID_CHARS:
            data[field] = default_data[field] + char
            resp = self.client.post(url, data)
            self.assertEqual(resp.data['status'], 400, f"Request data: {data} \nResponse data: {resp.data}")
            self.assertEqual(resp.data['code'], codes.INVALID_FIELD, resp.data)
                

def login(self, number):
    
        # login

        data = {'number':number, 'password':'1234'}
        resp = self.client.post(reverse('login'), data)
        if resp.data.get('access', ''):
            return resp.data['access'], resp.data['refresh']


        # create account
        data = {'number':number, 'code':0, 'token':''}
        resp = self.client.post(reverse('verify_number'), data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(reverse('verify_number'), data)
        self.assertEqual(resp.data['status'], 303, resp.data)
        self.assertEqual(resp.data['code'], codes.COMPLETE_SIGNUP, resp.data)
        
        # signup
        data2 = {'number':number, 'first_name':'abc', 'last_name':'abc', 'password':'1234', 'token': data['token']}
        resp = self.client.post(reverse('signup'), data2)
        self.assertEqual(resp.data['status'], 201, resp.data)

        return resp.data['access'], resp.data['refresh']