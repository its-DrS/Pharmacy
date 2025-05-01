from rest_framework.decorators import api_view
from . serializers import CustomUserSerializer
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

@api_view(["POST"])
def register(request):
    serializer_class = CustomUserSerializer(data = request.data)
    if serializer_class.is_valid():
        user = serializer_class.save()
        return Response({
            "user" : {
                "id" : user.id,
                "username" : user.username,
                "first_name" : user.first_name,
                "last_name" : user.last_name,
                "email" : user.email,
                "phone" : user.phone,
                "role" : user.role
            },
        }, status=status.HTTP_201_CREATED)
    return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)