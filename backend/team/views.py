from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from team.serializers import TeamSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.pagination import CustomPagination
from team.models import Team


# Create your views here.

class TeamView(GenericAPIView):
    pagination_class = CustomPagination
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]
    queryset = Team.objects.prefetch_related("skills").filter(is_published=True).order_by('created_at').all()

    def get(self,request): 
        
        paginator = self.pagination_class()

        page = paginator.paginate_queryset(self.queryset,request)

        serializer = self.serializer_class(page, many=True, context = {"request":request})

        return paginator.get_paginated_response(serializer.data)
    



        

