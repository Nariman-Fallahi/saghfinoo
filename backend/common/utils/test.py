
from common.codes import users_codes


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
            self.assertEqual(resp.data['code'], users_codes.INVALID_FIELD, resp.data)
                