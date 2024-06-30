# from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from common.codes import users_codes
from django.core.cache import caches

auth_cache = caches['auth']

class VerifyNumberTests(APITestCase):
    def setUp(self):
        self.url = reverse('verify_number')
        self.number = "09111111111"

    # def test_number_multiple_code_request(self):
    #     data = {'number':self.number, "code":0}

    #     resp = self.client.post(self.url, data)
    #     self.assertEqual(resp.status_code, 200, resp.data)
    #     self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

    #     resp = self.client.post(self.url, data)
    #     self.assertEqual(resp.status_code, 400, resp.data)
    #     self.assertEqual(resp.data['code'], users_codes.NUMBER_DELAY, resp.data)

    def test_send_code(self):
        data = {'number':self.number, "code":0, 'token':''}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

    def test_to_manny_wrong_code(self):
        data1 = {'number':self.number, "code":0, 'token':''}
        data2 = {'number':self.number, 'code':1, 'token':''}

        resp = self.client.post(self.url, data1)
        self.assertEqual(resp.data['status'], 200)
        data2['token'] = resp.data['token'] 

        for i in range(6):
            resp = self.client.post(self.url, data2)
            self.assertEqual(resp.data['status'], 400, resp.data)
            self.assertEqual(resp.data['code'], users_codes.WRONG_CODE, resp.data)
        
        resp = self.client.post(self.url, data2)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.TO_MANNY_TRIES, resp.data)

    def test_send_code_first_time(self):
        data = {'number':self.number, 'code':1000, 'token':''}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.ZERO_CODE_FIRST, resp.data)

    def test_right_code(self):
        data = {'number':self.number, 'code':0, 'token':''}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 303, resp.data)
        self.assertEqual(resp.data['code'], users_codes.COMPLETE_SIGNUP, resp.data)


    def test_right_code_when_user_exist(self):
        #create user

        # verfy number
        data = {'number':self.number, 'code':0, 'token':''}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 303, resp.data)
        self.assertEqual(resp.data['code'], users_codes.COMPLETE_SIGNUP, resp.data)
        
        # signup
        data2 = {'number':self.number, 'first_name':'abc', 'last_name':'abc', 'password':'1234', 'token': data['token']}
        resp = self.client.post(reverse('signup'), data2)
        # token = resp.data['token']
        self.assertEqual(resp.data['status'], 201, resp.data)

        # logout
        # resp = self.client.post(reverse('logout'), headers={"Authorization":f"Token {token}"})
        # self.assertEqual(resp.data['status'], 200, resp.data)

        # verify number (must login)
        data = {'number':self.number, 'code':0, 'token':''}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.LOGIN_DONE, resp.data)
        self.assertTrue(resp.data.get('accesss') != '', f"access is '' or not exist: {resp.data}")
        self.assertTrue(resp.data.get('refresh') != '', f"refresh is '' or not exist: {resp.data}")

        # test login
        resp = self.client.get(reverse('get_user_info'), headers={'Authorization': 'Bearer '+resp.data['access']})

        self.assertEqual(resp.data['status'], 200, resp.data)

    def test_wrong_code(self):
        data = {'number':self.number, 'code': 0, 'token':''}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)

        data['code'] = 1
        data['token'] = resp.data['token']

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.WRONG_CODE, resp.data)

    def test_invalid_number(self):
        data = {'number':'11111111111', 'code': 0, 'token':''} # length number is 11 and not start with 09
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.INVALID_FIELD, resp.data)

        data = {'number':'0911111111', 'code': 0, 'token':''} # length number is 10
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.INVALID_FIELD, resp.data)

        data = {'number':'091111111111', 'code': 0, 'token':''} # length number is 12
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.INVALID_FIELD, resp.data)


class SignupTests(APITestCase):
    def setUp(self):
        self.number = '09111111112'
        self.url = reverse('signup')
        self.verify_number_url = reverse('verify_number')
        self.default_data = {'number':self.number, 'first_name': 'abc', 'last_name':'abc', 'token': 'a', 'password': 'abc'}
        

    def test_without_verify_number(self):
        auth_cache.delete(self.number)
        resp = self.client.post(self.url, self.default_data)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.VERIFY_NUMBER_FIRST)

    def test_when_user_exist(self):
        
        data = {'number':self.number, 'code':0, 'token':''}
        resp = self.client.post(self.verify_number_url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(self.verify_number_url, data)
        self.assertEqual(resp.data['status'], 303, resp.data)
        self.assertEqual(resp.data['code'], users_codes.COMPLETE_SIGNUP, resp.data)
        
        # signup
        data2 = {'number':self.number, 'first_name':'abc', 'last_name':'abc', 'password':'1234', 'token': data['token']}
        resp = self.client.post(self.url, data2)
        # token = resp.data['token']
        self.assertEqual(resp.data['status'], 201, resp.data)

        data = {'number':self.number, 'code':0, 'token':''}
        resp = self.client.post(self.verify_number_url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = auth_cache.get(data['number'])['code']
        data['token'] = resp.data['token']
        resp = self.client.post(self.verify_number_url, data)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.LOGIN_DONE, resp.data)
        
        # signup
        data2 = {'number':self.number, 'first_name':'abc', 'last_name':'abc', 'password':'1234', 'token': data['token']}
        resp = self.client.post(self.url, data2)
        # token = resp.data['token']
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.INVALID_FIELD, resp.data)
