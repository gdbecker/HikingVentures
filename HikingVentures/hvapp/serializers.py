from rest_framework.serializers import ModelSerializer
from . models import Difficulty, RouteType, State, Park, Trail, Image

class DifficultySerializer(ModelSerializer):
    class Meta:
        model = Difficulty
        fields = '__all__'

class RouteTypeSerializer(ModelSerializer):
    class Meta:
        model = RouteType
        fields = '__all__'

class StateSerializer(ModelSerializer):
    class Meta:
        model = State
        fields = '__all__'

class ParkSerializer(ModelSerializer):
    class Meta:
        model = Park
        fields = '__all__'

class TrailSerializer(ModelSerializer):
    class Meta:
        model = Trail
        fields = '__all__'

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
