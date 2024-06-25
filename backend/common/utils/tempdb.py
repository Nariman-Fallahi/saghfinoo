import datetime

class TempDB:
    def __init__(self, duration):
        self.duration = duration
        self.data = {}
        self.start = datetime.datetime.now()

    def get(self,key, default):
        return self.data.get(key, default)
    
    def set(self, key, value):
        self.data[key] = value
        self.auto_delete()

    def auto_delete(self):
        if datetime.datetime.now() > self.start+datetime.timedelta(0, 2*60*60):
            self.start = datetime.datetime.now()
            self.data = {}
    