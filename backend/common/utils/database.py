from django.conf import settings
from django.utils import timezone

def formated_datetime_now():
    return timezone.now().strftime(settings.REST_FRAMEWORK['DATETIME_FORMAT'])




class ScoreManager:
    @staticmethod
    def increase_obj_score(score, obj):
        """obj must have score, score_sum and score_num"""
        obj.score_sum += score
        obj.score_num += 1
        obj.score = round(obj.score_sum/obj.score_num, 1)
        obj.save()

    @staticmethod
    def edit_obj_score(old_score, new_score, obj):
        """obj must have score, score_sum and score_num"""
        obj.score_sum += new_score-old_score
        if obj.score_num == 0:
            obj.score = settings.REALTOR_DEFAULT_SCORE
            obj.score_sum = 0
            obj.save()
            return

        obj.score = round(obj.score_sum/obj.score_num, 1)
        obj.save()

    @staticmethod
    def decrease_obj_score(score, obj):
        """on deleting comment
        obj must have score, score_sum and score_num"""
        obj.score_sum -= score
        obj.score_num -= 1
        if obj.score_num == 0:
            obj.score = settings.REALTOR_DEFAULT_SCORE
            obj.score_sum = 0
            obj.save()
            return

        obj.score = round(obj.score_sum/obj.score_num, 1)
        obj.save()
