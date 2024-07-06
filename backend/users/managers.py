from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, number, password, first_name, last_name):
        user = self.model(number=number, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, number, password):
        user = self.model(number=number, first_name='admin', last_name='admin')
        user.set_password(password)
        user.is_staff = True
        return user