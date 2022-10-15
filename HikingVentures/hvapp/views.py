from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from accounts.models import UserAccount
from . models import Difficulty, RouteType, State, Park, Trail, Image, Review, UserFavorite, History
from . serializers import DifficultySerializer, RouteTypeSerializer, StateSerializer, ParkSerializer, TrailSerializer, ImageSerializer, ReviewSerializer, UserFavoriteSerializer, HistorySerializer

# Create your views here.

user = get_user_model()

# Difficulty
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getDifficulties(request):
    difficulties = Difficulty.objects.all().order_by('id')
    serializer = DifficultySerializer(difficulties, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getDifficulty(request, pk):
    difficulty = Difficulty.objects.get(id=pk)
    serializer = DifficultySerializer(difficulty, many=False)
    return Response(serializer.data)

# RouteType
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getRouteTypes(request):
    routetypes = RouteType.objects.all().order_by('type')
    serializer = RouteTypeSerializer(routetypes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getRouteType(request, pk):
    routetype = RouteType.objects.get(id=pk)
    serializer = RouteTypeSerializer(routetype, many=False)
    return Response(serializer.data)

# State
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getStates(request):
    states = State.objects.all().order_by('id')
    serializer = StateSerializer(states, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getState(request, pk):
    state = State.objects.get(id=pk)
    serializer = StateSerializer(state, many=False)
    return Response(serializer.data)

# Park
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getParks(request):
    parks = Park.objects.all().order_by('name')
    serializer = ParkSerializer(parks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getPark(request, pk):
    park = Park.objects.get(id=pk)
    serializer = ParkSerializer(park, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createPark(request):
    data = request.data
    state = State.objects.get(id=int(data['state']))

    park = Park.objects.create(
        name=data['name'],
        description=data['description'],
        city=data['city'],
        state=state,
        img_url=data['img_url']
    )
    serializer = ParkSerializer(park, many=False)
    return Response(serializer.data)

@api_view(['PATCH'])
def updatePark(request, pk):
    new_data = request.data
    state = State.objects.get(id=int(new_data['state']))

    park = Park.objects.get(id=pk)
    park.name = new_data['name']
    park.description=new_data['description']
    park.city=new_data['city']
    park.state=state
    park.img_url=new_data['img_url']
    park.save()

    serializer = ParkSerializer(park, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePark(request, pk):
    park = Park.objects.get(id=pk)
    park.delete()
    return Response('Park was deleted.')

# Trail
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getTrails(request):
    trails = Trail.objects.all().order_by('name')
    serializer = TrailSerializer(trails, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getTrail(request, pk):
    trail = Trail.objects.get(id=pk)
    serializer = TrailSerializer(trail, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createTrail(request):
    data = request.data
    park = Park.objects.get(id=int(data['park']))
    difficulty = Difficulty.objects.get(id=int(data['difficulty']))
    routetype = RouteType.objects.get(id=int(data['routeType']))

    trail = Trail.objects.create(
        name=data['name'],
        description=data['description'],
        length=data['length'],
        elevation_gain=data['elevationGain'],
        park=park,
        difficulty=difficulty,
        routetype=routetype,
        map_url=data['map_url'],
        img_url=data['img_url']
    )

    serializer = TrailSerializer(trail, many=False)
    return Response(serializer.data)

@api_view(['PATCH'])
def updateTrail(request, pk):
    new_data = request.data
    park = Park.objects.get(id=int(new_data['park']))
    difficulty = Difficulty.objects.get(id=int(new_data['difficulty']))
    routetype = RouteType.objects.get(id=int(new_data['routeType']))

    trail = Trail.objects.get(id=pk)
    trail.name = new_data['name']
    trail.description=new_data['description']
    trail.length=new_data['length']
    trail.elevation_gain=new_data['elevationGain']
    trail.park=park
    trail.difficulty=difficulty
    trail.routetype=routetype
    trail.map_url=new_data['map_url']
    trail.img_url=new_data['img_url']
    trail.save()

    serializer = TrailSerializer(trail, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTrail(request, pk):
    trail = Trail.objects.get(id=pk)
    trail.delete()
    return Response('Trail was deleted.')

# Image
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getImages(request):
    images = Image.objects.all().order_by('trail')
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createImage(request):
    data = request.data
    trail = Trail.objects.get(id=int(data['trail']))

    image = Image.objects.create(
        img_url=data['img_url'],
        trail=trail
    )
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)

# Review
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getReviews(request):
    reviews = Review.objects.all().order_by('date')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createReview(request):
    data = request.data
    user = UserAccount.objects.get(id=int(data['currentUser']))
    trail = Trail.objects.get(id=int(data['id']))

    review = Review.objects.create(
        rating=data['rating'],
        body=data['text'],
        user=user,
        trail=trail
    )
    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)

# UserFavorite
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getUserFavorites(request):
    userfavorites = UserFavorite.objects.all()
    serializer = UserFavoriteSerializer(userfavorites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUserFavorite(request):
    data = request.data
    user = UserAccount.objects.get(id=int(data['userID']))
    trail = Trail.objects.get(id=int(data['trailID']))

    userfavorite = UserFavorite.objects.create(
        user=user,
        trail=trail
    )
    serializer = UserFavoriteSerializer(userfavorite, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteUserFavorite(request, pk):
    userfavorite = UserFavorite.objects.get(id=pk)
    userfavorite.delete()
    return Response('UserFavorite was deleted.')

# History
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getHistory(request):
    history = History.objects.all().order_by('date')
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createHistory(request):
    data = request.data
    user = UserAccount.objects.get(id=int(data['userID']))
    trail = Trail.objects.get(id=int(data['trailID']))

    history = History.objects.create(
        date=data['date']['date'],
        user=user,
        trail=trail
    )
    serializer = HistorySerializer(history, many=False)
    return Response(serializer.data)
