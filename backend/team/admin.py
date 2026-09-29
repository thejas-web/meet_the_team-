from django.contrib import admin
from team import models as team_models
from import_export.admin import ImportExportModelAdmin
from core.service import move_file_to_folder

# Register your models here.


@admin.register(team_models.TeamSkill)
class TeamSkillAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ("id","name")
    search_fields = ("name",)


@admin.register(team_models.Team)
class TeamAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ("first_name","last_name","designation","office_location")
    search_fields = ("first_name","last_name","designation","office_location")
    list_filter = ("office_location",)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if obj.profile_id:
            move_file_to_folder(folder_name="team",filer_file=obj.profile)