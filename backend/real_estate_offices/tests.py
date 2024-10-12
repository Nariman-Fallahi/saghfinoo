from django.urls import reverse
from rest_framework.test import APITestCase
from common import codes
from common.utils.test import login, test_invalid_field, test_have_fields, create_realtor, NumberGenerator, create_real_estate_office
from common.utils import characters

from realtors.models import Realtor

class CreateRealEstateOfficeTest(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('create_search_real_estate_office')
        self.number = NumberGenerator.get_number()
        self.default_data = {
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

        self.access, self.refresh = login(self, self.number)
        self.headers = {'Authorization': 'Bearer '+ self.access}

        create_realtor(self, self.number, self.headers)

        return super().setUp()

    def test_without_confirmed_realtor(self):
        access, refresh = login(self, NumberGenerator.get_number())
        
        # create Realtor
        data = {
            'number': '09128282837',
            'landlineNumber': '021938493849849',
            'whatsapp': 'test.ir',
            'twitter': 'test',
            'facebook':'test',
            'email':'test@test.com',
            'telegram': 'test',
            'description': 'test is test'            
        }
        resp = self.client.post(reverse('create_realtor'), data, headers={'Authorization': 'Bearer '+ access})
        self.assertEqual(resp.data['status'], 200, resp.data)
        
        resp = self.client.post(self.url, self.default_data, headers={'Authorization': 'Bearer '+ access})
        self.assertEqual(resp.data['status'], 403, resp.data)
        # self.assertEqual(resp.data['code'], codes.REALTOR_NOT_CONFIRMED, resp.data)

    def test_invlid_field(self):
        test_invalid_field(self, self.url, self.default_data, {
                'name': characters.NAME_INVALID_CHARS,
                'description': characters.DESCRIPTION_INVALID_CHARS,
                'username': characters.USERNAME_INVALID_CHARS,
                'city':characters.NAME_INVALID_CHARS,
                'mainStreet': characters.NAME_INVALID_CHARS,
                'subStreet': characters.NAME_INVALID_CHARS,
                'number': characters.NUMBER_INVALID_CHARS,
                'landlineNumber': characters.NUMBER_INVALID_CHARS,
                'whatsapp': characters.USERNAME_INVALID_CHARS,
                'twitter': characters.USERNAME_INVALID_CHARS,
                'facebook':characters.USERNAME_INVALID_CHARS,
                'facebook':characters.USERNAME_INVALID_CHARS,
                'facebook':characters.USERNAME_INVALID_CHARS,
                'email':characters.USERNAME_INVALID_CHARS,
                'telegram': characters.USERNAME_INVALID_CHARS,
        }, self.headers)

    def test_success(self):

        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 200, resp.data)
        
    def test_owner_of_two_real_estate_office(self):
        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 200, resp.data)

        data = self.default_data
        data['username'] = 'test2'
        resp = self.client.post(self.url, data, headers=self.headers)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], codes.USER_IS_ALREADY_REO_OWNER, resp.data)


class GetAllRealEstateOfficesTest(APITestCase):
    def setUp(self):
        self.url = reverse('create_search_real_estate_office')
        self.number = NumberGenerator.get_number()
        self.access, self.refresh = login(self, self.number)
        self.headers = {'Authorization': 'Bearer '+ self.access}

        create_realtor(self, self.number, self.headers)

        create_real_estate_office(self, self.headers)

    def test_success(self):

        resp = self.client.get(self.url+'?page=1', headers=self.headers)
        self.assertEqual(resp.data['status'], 200, resp.data)
        self.assertNotEqual(resp.data.get('data', ''), '', resp.data)
        self.assertGreater(len(resp.data['data']), 0, 'not data exist in resp.data["data"]')
        test_have_fields(self, list(resp.data['data'])[0], ['name', 'username', 'city', 'mainStreet', 'subStreet', 'score', 'numberOfActiveAds', 'numberOfComments', 'imageFullPath', 'blueTick'])        
