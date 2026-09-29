from django.db import models
from ckeditor.fields import RichTextField
from core.models import BaseModel
from filer.fields.image import FilerFileField
# Create your models here.

    
class TeamSkill(BaseModel):
    name = models.CharField(null=True, blank=True, max_length=150)

    class Meta:
        verbose_name = "Team Skill"
        verbose_name_plural = "Team Skills"
    
    def __str__(self):
            return self.name
        
class Team(BaseModel):
    profile = FilerFileField(on_delete=models.SET_NULL, null=True, blank=True, related_name="member_profile")
    
    first_name = models.CharField(max_length=200, null=True, blank=True)
    last_name  = models.CharField(max_length=200, null=True, blank=True)
    designation = models.CharField(max_length=300, null=True, blank=True)

    office_location = models.CharField(max_length=250, null=True, blank=True)

    joining_date = models.DateField(null=True, blank=True)
    area_of_work = RichTextField(null=True, blank=True)
    strength = RichTextField(null=True, blank=True)
    skills = models.ManyToManyField(TeamSkill, related_name="team_members", blank=True)
    talents = models.JSONField(null=True, blank=True)
    outside_work = models.JSONField(null=True, blank=True)

    overcomed_challenge = models.TextField(null=True, blank=True)



    class Meta:
            verbose_name = "Team Member"
            verbose_name_plural = "Team Members"
        
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.designation}"
        