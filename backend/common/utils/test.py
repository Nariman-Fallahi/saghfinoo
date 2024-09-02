from django.core.cache import caches
from django.urls import reverse

auth_cache = caches['auth']

from common import codes

from realtors.models import Realtor
from real_estate_offices.models import RealEstateOffice

def test_invalid_field(self, url: str, data: dict, invalid_chars: dict, headers: dict):
    """data example: {"name":"test"} , invalid_chars example: {"name":"*"},
        invalid_chars for valid range example: {"name": (1, 10)}
    """
    
    default_data = data
    fields = invalid_chars.keys()
    
    for field in fields:
        if type(invalid_chars[field]) == tuple:
            # set values of out of range
            min_value = invalid_chars[field][0]-1
            max_value = invalid_chars[field][1]+1
            data = default_data
            data[field] = min_value
            if headers:
                resp = self.client.post(url, data, headers=headers)
            else:
                resp = self.client.post(url, data)
            self.assertEqual(resp.data['status'], 400, f"Request data: {data} \nResponse data: {resp.data}")
            self.assertEqual(resp.data['code'], codes.INVALID_FIELD, resp.data)

            data = default_data
            data[field] = max_value
            if headers:
                resp = self.client.post(url, data, headers=headers)
            else:
                resp = self.client.post(url, data)
            self.assertEqual(resp.data['status'], 400, f"Request data: {data} \nResponse data: {resp.data}")
            self.assertEqual(resp.data['code'], codes.INVALID_FIELD, resp.data)
            
        else:
            for char in invalid_chars[field]:
                data = default_data
                data[field] = default_data[field] + char
                if headers:
                    resp = self.client.post(url, data, headers=headers)
                else:
                    resp = self.client.post(url, data)
                self.assertEqual(resp.data['status'], 400, f"Request data: {data} \nResponse data: {resp.data}")
                self.assertEqual(resp.data['code'], codes.INVALID_FIELD, resp.data)
                    

def login(self, number):
    
        """login or signup (if not already) and returns acesss, refresh"""
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

def test_have_fields(self, data: dict, fields: list):
     
     for field in fields:
          self.assertNotEqual(data.get(field, ''), '', f'field: {field}, data: {data}')


class NumberGenerator:
    _number = 9000000000

    @classmethod
    def get_number(cls):
        cls._number = cls._number + 1
        return f'0{cls._number}'
    

def create_realtor(self, number, headers) -> Realtor:
    """creates realtor confrims it and returns its object"""

    # create Realtor
    data = {
        'description':'test is test', 
        'number':'09120120102', 
        'landlineNumber':'0211287821', 
        'telegram':'test',
        'whatsapp': 'test',
        'twitter': 'test',
        'facebook': 'tset',
        'email': 'test@test.com'
        }
    resp = self.client.post(reverse('create_realtor'), data, headers=headers)
    self.assertEqual(resp.data['status'], 200, resp.data)

    # confirm the realtor
    realtor = Realtor.objects.get(user__number=number)
    realtor.is_confirmed = True
    realtor.save()

    return realtor

def create_real_estate_office(self, headers):
        default_data = {
                'name': 'test',
                'description': 'tset test',
                'username': 'test',
                'city':'test',
                'mainStreet': 'test',
                'subStreet': 'test',
                'number': '09121211212',
                'landlineNumber': '021938493849849',
                'whatsapp': 'test.ir',
                'twitter': 'test',
                'facebook':'test',
                'email':'test',
                'telegram': 'test',
        }

        resp = self.client.post(reverse('create_real_estate_office'), default_data, headers=headers)
        self.assertEqual(resp.data['status'], 200, resp.data)

        # confirm real estate office
        reo = RealEstateOffice.objects.get(id=resp.data['id'])
        reo.is_confirmed = True
        reo.save()