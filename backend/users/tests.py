# from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from common.codes import users_codes

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
        data = {'number':self.number, "code":0}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

    def test_to_manny_wrong_code(self):
        data = {'number':self.number, 'code':1}
        data2 = {'number':self.number, "code":0}

        resp = self.client.post(self.url, data2)
        self.assertEqual(resp.status_code, 200)
        

        for i in range(6):
            resp = self.client.post(self.url, data)
            self.assertEqual(resp.status_code, 400, resp.data)
            self.assertEqual(resp.data['code'], users_codes.WRONG_CODE, resp.data)
        
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.TO_MANNY_TRIES, resp.data)

    def test_send_code_first_time(self):
        data = {'number':self.number, 'code':1000}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.ZERO_CODE_FIRST, resp.data)

    def test_right_code(self):
        data = {'number':self.number, 'code':0}

        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = self.client.session['code']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.COMPLETE_SIGNUP, resp.data)

    def test_right_code_when_user_exist(self):
        # verfy number
        data = {'number':self.number, 'code':0}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = self.client.session['code']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.COMPLETE_SIGNUP, resp.data)
        
        # signup
        data = {'first_name':'abc', 'last_name':'abc', 'password':'1234'}
        resp = self.client.post(reverse('signup'), data)
        token = resp.data['token']
        self.assertEqual(resp.status_code, 201, resp.data)

        # logout
        resp = self.client.post(reverse('logout'), headers={"Authorization":f"Token {token}"})
        self.assertEqual(resp.status_code, 200, resp.data)

        # verify number (must login)
        data = {'number':self.number, 'code':0}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.CODE_SENT_TO_NUMBER, resp.data)

        data['code'] = self.client.session['code']
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)
        self.assertEqual(resp.data['code'], users_codes.LOGIN_DONE, resp.data)

    def test_wrong_code(self):
        data = {'number':self.number, 'code': 0}
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 200, resp.data)

        data['code'] = 1
        resp = self.client.post(self.url, data)
        self.assertEqual(resp.status_code, 400, resp.data)
        self.assertEqual(resp.data['code'], users_codes.WRONG_CODE, resp.data)


