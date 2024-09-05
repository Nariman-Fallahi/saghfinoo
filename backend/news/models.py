from django.db import models

from common.utils.database import formated_datetime_now
from users.models import CustomUser
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)

    @classmethod
    def add_default_rows(cls):
        default = (
            'مسکن',
            'ساخت و ساز',
            'اجاره',

        )

        if Category.objects.count() == 0:
            categories = []
            for name in default:
                
                # continue if already exist
                try:
                    Category.objects.get(name=name)
                    continue
                except Category.DoesNotExist:
                    pass

                r = Category()
                r.name = name
                categories.append(r)

            Category.objects.bulk_create(categories)



# news
class News(models.Model):
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200, unique=True)
    short_description = models.CharField(max_length=500)
    content = models.TextField()
    tags = models.CharField(max_length=200) # splited by |
    read_time = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    publish_date = models.DateTimeField(default=formated_datetime_now)

    image = models.CharField(max_length=1000, default='')
    image_full_path = models.CharField(max_length=1000, default='')

    author = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)