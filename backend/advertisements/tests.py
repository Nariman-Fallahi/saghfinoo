from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from common.utils.test import login, create_realtor, NumberGenerator, test_have_fields, test_invalid_field
from realtors.models import Realtor
from common.utils import characters
# Create your tests here.


class CreateAdvertisementTests(APITestCase):
    def setUp(self):
        self.number = NumberGenerator.get_number()
        self.url = reverse('create_search_advertisement')

        # find choices IDs
        resp = self.client.get(reverse('get_all_advertisements_choices'))
        for id, key, value in resp.data:
            if key == 'type_of_transaction' and value == 'رهن و اجاره':
                type_of_transaction_id = id
            elif key == 'property_type':
                property_type_id = id
            elif key == 'type_of_restroom':
                type_of_restroom_id = id
            elif key == 'flooring':
                flooring_id = id
            elif key == 'cooling_system':
                cooling_system_id = id
            elif key == 'heating_system':
                heating_system_id = id

        self.default_data = {
            'city': 'test',
            'province': 'test',
            'main_street': 'test',
            'side_street': 'test',
            'type_of_transaction': type_of_transaction_id,
            'property_type': property_type_id,
            'deposit': 10000,
            'rent': 10000,
            'convertible': True,
            'area': 150,
            'room':1,
            'floor': 1,
            'number_of_floors': 2,
            'parking': 2,
            'restroom': 2,
            'type_of_restroom': type_of_restroom_id,
            'storage': 1,
            'elevator': 1,
            'flooring': flooring_id,
            'cooling_system': cooling_system_id,
            'heating_system': heating_system_id,
            'description':'test is test',
        }        
        # login
        self.access, _ = login(self, self.number)
        self.headers = {'Authentication':'Bearer '+self.access}

        # create realtor
        self.realtor =create_realtor(self, self.number, self.headers)



    def test_without_auth(self):
        resp = self.client.post(reverse(self.url))
        self.assertEqual(resp.data['status'], 401)


    def test_without_realtor(self):
        number = NumberGenerator.get_number()
        access, _ = login(self, number)
        resp = self.client.post(reverse(self.url), self.default_data, headers={'Authorization':'Bearer '+ access})
        self.assertEqual(resp.data['status'], 403)

    def test_success(self):
        realtor_number_of_active_ads = self.realtor.number_of_active_ads
        realestateoffice_number_of_active_ads = self.realtor.real_estate_office.number_of_active_ads

        resp = self.client.post(self.url, self.default_data, headers=self.headers)
        self.assertEqual(resp.data['status'], 200)
        test_have_fields(self, resp.data, [
            'owner',
            'id',
            'createdAt',
            'modifiedAt',
            'city',
            'mainStreet',
            'sideStreet',
            'province' ,
            'area' ,
            'propertyType',
            'typeOfTransaction',
            'deposit' ,
            'rent' ,
            'room',
            'parking',
            'storage',
            'restroom',
            'typeOfRestroom',
            'elevator' ,
            'floor',
            'numberOfFloors',
            'heatingSystem',
            'coolingsystem',
            'flooring' ,
            'description',
            'mapPosition',
            'numberOfViews',
            'numberOfSaves',
            'convertible'
        ])

        test_have_fields(self, resp.data['owner'], [
            'score', 
            'numberOfActiveAds',
            'user',
            'realEstateOffice',
        ])

        test_have_fields(self, resp.data['owner']['user'], [
            'firstName',
            'lastName',
            'imageFullPath'
        ])

        test_have_fields(self, resp.data['owner']['realEstateOffice'], [
            'username',
            'name',
            'imageFullPath',
        ])

        # check owner number_of_active_ads is increased
        realtor = Realtor.objects.get(id=self.realtor.id)
        self.assertEqual(realtor.number_of_active_ads, realtor_number_of_active_ads+1, 'number of active ads not increased for realtor')

        # check realestate number_of_active_ads is increased
        self.assertEqual(realtor.real_estate_office.number_of_active_ads, realestateoffice_number_of_active_ads+1, 'number of active ads not increased for real estate office')


    def test_invalid_fields(self):
        test_invalid_field(self, self.url, self.default_data, {
            'city': characters.NAME_INVALID_CHARS,
            'province': characters.NAME_INVALID_CHARS,
            'main_street': characters.NAME_INVALID_CHARS,
            'side_street': characters.NAME_INVALID_CHARS,
            'convertible': "a",
            'room':(1, 20),
            'floor': (1,100),
            'number_of_floors': (1,101),
            'parking': (1,20),
            'restroom': (1,20),
            'storage': (1,20),
            'elevator': (1,20),
            'description':characters.DESCRIPTION_INVALID_CHARS,
        })


class SearchAdvertisementsTests(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('create_search_advertisement')
        return super().setUp()

    def test_success(self):
        resp = self.client.get(self.url)
        self.assertEqual(resp.data["status"], 200)
        self.assertNotEqual(resp.data.get('data', None), None)
