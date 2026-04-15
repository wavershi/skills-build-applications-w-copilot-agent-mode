from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Activity.objects.all().delete()
        # Remove members from teams before deleting teams
        for team in Team.objects.all():
            if team.pk is not None:
                team.delete()
        # Skipping user deletion to avoid errors with unsaved User objects

        # Create users (superheroes)
        marvel_users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password'),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password'),
        ]
        dc_users = [
            User.objects.create_user(username='batman', email='batman@dc.com', password='password'),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='password'),
        ]

        # Create teams
        marvel_team = Team.objects.create(name='Marvel')
        dc_team = Team.objects.create(name='DC')
        marvel_team.members.add(*marvel_users)
        dc_team.members.add(*dc_users)

        # Create activities
        for user in marvel_users + dc_users:
            Activity.objects.create(user=user, activity_type='Running', duration=30, date=timezone.now().date())
            Activity.objects.create(user=user, activity_type='Cycling', duration=45, date=timezone.now().date())

        # Create workouts
        for user in marvel_users + dc_users:
            Workout.objects.create(user=user, name='Morning Routine', description='Pushups and situps', date=timezone.now().date())
            Workout.objects.create(user=user, name='Evening Cardio', description='Jogging and stretching', date=timezone.now().date())

        # Create leaderboard
        Leaderboard.objects.create(team=marvel_team, score=150, week=timezone.now().date())
        Leaderboard.objects.create(team=dc_team, score=140, week=timezone.now().date())

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
