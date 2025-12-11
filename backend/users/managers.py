from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone_number, password, first_name, last_name):
        user = self.model(email=email, phone_number=phone_number, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, phone_number, password, first_name, last_name):
        user = self.model(email=email, phone_number=phone_number, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.is_staff = True
        user.activity_type = 'admin'
        return user