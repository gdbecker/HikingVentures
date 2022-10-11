from rest_framework.serializers import ModelSerializer
from accounts.serializers import UserCreateSerializer
from . models import Difficulty, RouteType, State, Park, Trail, Image, Review, UserFavorite, History

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
        fields = ('id', 'name', 'description', 'city', 'state', 'img_url')
    state = StateSerializer(many=False)

class TrailSerializer(ModelSerializer):
    class Meta:
        model = Trail
        fields = ('id', 'name', 'description', 'length', 'elevation_gain', 'park', 'difficulty', 'routetype', 'map_url', 'img_url')
    park = ParkSerializer(many=False)
    difficulty = DifficultySerializer(many=False)
    routetype = RouteTypeSerializer(many=False)

class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ('trail', 'img_url')
    trail = TrailSerializer(many=False)

class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ('body', 'rating', 'date', 'user', 'trail')
    user = UserCreateSerializer(many=False)
    trail = TrailSerializer(many=False)

class UserFavoriteSerializer(ModelSerializer):
    class Meta:
        model = UserFavorite
        fields = ('user', 'trail')
    user = UserCreateSerializer(many=False)
    trail = TrailSerializer(many=False)

class HistorySerializer(ModelSerializer):
    class Meta:
        model = History
        fields = ('date', 'user', 'trail')
    user = UserCreateSerializer(many=False)
    trail = TrailSerializer(many=False)
