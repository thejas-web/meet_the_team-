from django.contrib import admin
from django.urls import path,include
from team.views import TeamView

urlpatterns = [
    path("", TeamView.as_view(), name="team_members_list"),
]