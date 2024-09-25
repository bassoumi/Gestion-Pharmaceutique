from datetime import datetime
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

class TimeRestrictionMiddleware(MiddlewareMixin):
    def process_request(self, request):
        current_time = datetime.now().time()
        current_day = datetime.now().weekday() 

        # Définir les heures de travail pour chaque jour
        weekday_start_time = datetime.strptime('08:00', '%H:%M').time()
        weekday_end_time = datetime.strptime('17:00', '%H:%M').time()

        saturday_start_time = datetime.strptime('08:00', '%H:%M').time()
        saturday_end_time = datetime.strptime('14:00', '%H:%M').time()

        if current_day == 6:
            return JsonResponse({
                'error': 'L\'application est fermée le dimanche.'
            }, status=403)

        elif current_day == 5:
            if not (saturday_start_time <= current_time <= saturday_end_time):
                return JsonResponse({
                    'error': 'L\'application est accessible le samedi entre 8h et 14h.'
                }, status=403)

        elif not (weekday_start_time <= current_time <= weekday_end_time):
            return JsonResponse({
                'error': 'L\'application est accessible du lundi au vendredi entre 8h et 17h.'
            }, status=403)

