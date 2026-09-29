from rest_framework import serializers
from team.models import TeamSkill,Team
from django.utils import timezone
from dateutil.relativedelta import relativedelta


def get_full_url(request,file_obj):
    if file_obj:
        return request.build_absolute_uri(file_obj.url)
    return None


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeamSkill
        fields = ["name"]


class TeamSerializer(serializers.ModelSerializer):

    skills = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    years = serializers.SerializerMethodField()
    profile_url = serializers.SerializerMethodField()

    joining_date = serializers.DateField(format="%b %Y", read_only=True)

    class Meta:
        model = Team
        fields = "__all__"


    def get_profile_url(self,obj):
        return get_full_url(self.context.get("request"),obj.profile)


    def get_years(self,obj):
        if not obj.joining_date:
            return None
        
        current_date = timezone.localdate()

        difference = relativedelta(current_date, obj.joining_date)

        if difference.days > 0 or difference.months > 0:
            return f"{difference.years} +"
        return difference.years
