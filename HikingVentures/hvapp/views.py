from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from . models import Difficulty, RouteType, State, Park, Trail, Image
from . serializers import DifficultySerializer, RouteTypeSerializer, StateSerializer, ParkSerializer, TrailSerializer, ImageSerializer

# Create your views here.

# Difficulties
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

# RouteTypes
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

# States
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

# Parks
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

# Trails
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

# Images
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getImages(request):
    images = Image.objects.all().order_by('trail')
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)
