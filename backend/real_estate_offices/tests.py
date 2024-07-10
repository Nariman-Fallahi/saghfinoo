from django.urls import reverse
from rest_framework.test import APITestCase
from common import codes
from common.utils.test import login, test_invalid_field

from realtors.models import Realtor

class CreateRealEstateOfficeTest(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('create_real_estate_office')
        self.number = '09121111111'
        self.default_data = {
                'name': 'test',
                'description': 'tset test',
                'username': 'test',
                'city':'test',
                'main_street': 'test',
                'sub_street': 'test',
                'number': '09121211212',
                'landline_number': '021938493849849',
                'site': 'test.ir',
                'linkedin': 'test',
                'instagram':'test',
                'telegram': 'test'
        }

        self.access, self.number = login(self, self.number)
        self.headers = {'Authorization': 'Bearer '+ self.access}

        # create Realtor
        data = {}
        self.client.post(reverse('create_realtor'), data, headers=self.headers)
        
        # confirm the realtor
        realtor = Realtor.objects.get(user__number=self.number)
        realtor.is_confirmed = True
        realtor.save()



        return super().setUp()

    def test_without_confirmed_realtor(self):
        access, refresh = login(self, '091111211111')
        
        # create Realtor
        data = {}
        self.client.post(reverse('create_realtor'), data, headers=self.headers)
        
        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], codes.REALTOR_NOT_CONFIRMED, resp.data)

    def test_invlid_field(self):
        test_invalid_field(self, self.url, self.defult_data, "@/\\<>", self.headers)

    def test_right(self):

        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 200, resp.data)
        
    def test_owner_of_two_real_estate_office(self):
        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 200, resp.data)

        data = self.defualt_data
        data['username'] = 'test2'
        resp = self.client.post(self.url, data, headers=self.headers)
        self.assertEqual(resp.data['status'], 400, resp.data)
        self.assertEqual(resp.data['code'], codes.USER_IS_ALREADY_REO_OWNER, resp.data)