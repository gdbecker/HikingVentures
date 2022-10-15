from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
# hvapp

User = get_user_model()

class Difficulty(models.Model):
    rank = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.rank

    class Meta:
        ordering = ['rank']

class RouteType(models.Model):
    type = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.type

    class Meta:
        ordering = ['type']

class State(models.Model):
    name = models.CharField(max_length=2, unique=True)
    full_name = models.CharField(max_length=30)
    country = models.CharField(max_length=30)

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = ['name']

class Park(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = models.CharField(max_length=2000)
    city = models.CharField(max_length=100)
    state = models.ForeignKey(State, related_name='parks', on_delete=models.CASCADE)
    img_url = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Trail(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=2000)
    length = models.CharField(max_length=100)
    elevation_gain = models.CharField(max_length=100)
    park = models.ForeignKey(Park, related_name='trails', on_delete=models.CASCADE)
    difficulty = models.ForeignKey(Difficulty, related_name='trails', on_delete=models.CASCADE)
    routetype = models.ForeignKey(RouteType, related_name='trails', on_delete=models.CASCADE)
    map_url = models.CharField(max_length=1000)
    img_url = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Image(models.Model):
    trail = models.ForeignKey(Trail, related_name='images', on_delete=models.CASCADE)
    img_url = models.CharField(max_length=1000)

    def __str__(self):
        return self.img_url

    class Meta:
        ordering = ['trail']

class Review(models.Model):
    body = models.CharField(max_length=2000)
    rating = models.CharField(max_length=10)
    date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='user_reviews', on_delete=models.CASCADE)
    trail = models.ForeignKey(Trail, related_name='reviews', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name + ' ' + self.rating + ' ' + self.trail.name

    class Meta:
        pass

class UserFavorite(models.Model):
    user = models.ForeignKey(User, related_name='user_trails', on_delete=models.CASCADE)
    trail = models.ForeignKey(Trail, related_name='favorites', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name

    class Meta:
        unique_together = ('user', 'trail')

class History(models.Model):
    date = models.DateField()
    user = models.ForeignKey(User, related_name='user_history', on_delete=models.CASCADE)
    trail = models.ForeignKey(Trail, related_name='history', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name + ' ' + self.date + ' ' + self.trail.name

    class Meta:
        pass
