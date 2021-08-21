import datetime
import random
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db.models import ObjectDoesNotExist

from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser

from rulegas.models import User, FuelCompany, FuelStation, FuelCompanyAward

from rulegas.serializers import FuelCompanyAwardSerializer

# Create your views here.
def index(request):
    # if request.user.is_anonymous:
    #     return redirect('/login.html')
    # return html(request, 'index')

    context = {'users': User.objects.all()}
    return render(request, 'sells.html', context=context)

def users(request):
    context = {'users': User.objects.all()}
    return render(request, 'users.html', context=context)


def fuelstations(request):
    stations = FuelStation.objects.all()
    context = {'fuelstations': stations}
    return render(request, 'fuelstation.html', context=context)


def api_sells(request):
    random.seed(datetime.datetime.now().timestamp())

    totalSells = {
        'today': {
            'qty': 50,
            'lts': 500
        },
        'week': {
            'qty': [random.randint(400, 500) + i for i in range(7)],
            'lts': [random.randint(4000, 5000) + i for i in range(7)]
        },
        'month': {
            'qty': [random.randint(40000, 50000) + i for i in range(31)],
            'lts': [random.randint(40000, 50000) + i for i in range(31)]
        }
    }

    return JsonResponse(totalSells)


def add_awards(request):
    companies = FuelCompany.objects.all()
    awards = 5

    context = {
        'companies': companies,
        'awardCount': awards,
        'awardRange': range(awards)
    }
    return render(request, 'add_awards.html', context=context)


def list_awards(request):
    awards = FuelCompanyAward.objects.all()
    context = {'awards': awards}
    return render(request, 'list_awards.html', context=context)


def edit_awards(request):
    award = FuelCompanyAward.objects.get(pk=request.POST['awardId'])

    award.name = request.POST['awardName']
    award.is_active = 1 if request.POST['awardName'] else 0

    award.save()

    return redirect('AwardsList')


@api_view(['GET'])
@parser_classes([JSONParser])
def api_award_id(request, award_id=''):
    print(award_id)

    award = FuelCompanyAward.objects.get(pk=award_id)
    award = FuelCompanyAwardSerializer(award)

    return JsonResponse(award.data)


@api_view(['POST'])
@parser_classes([JSONParser])
def api_award_save(request):
    print(request.data)

    i = 0
    for award in request.data['awards']:
        a = FuelCompanyAward()
        a.id = uuid.uuid1()
        a.fuel_company_id = request.data['companyId']
        a.name = award['name']
        a.total_awards = int(award['total'])
        a.awards_per_day = int(award['perDay'])
        a.probability = 0.125
        a.roulette_position = i
        a.is_active = 1
        a.save()

        i = i + 1

    return JsonResponse({'status': True})


def html(request, filename):
    context = {'filename': filename,
               'collapse': ''}
    # if request.user.is_anonymous and filename != 'login':
    #     return redirect('/login.html')
    if filename == 'logout':
        logout(request)
        return redirect('/')
    if filename == 'login' and request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            if '@' in username:
                user = User.objects.get(email=username)
            else:
                user = User.objects.get(username=username)
            user = authenticate(request, username=user.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                context['error'] = 'Wrong password'
        except ObjectDoesNotExist:
            context['error'] = 'User not found'

        print('login')
        print(username, password)
    print(filename, request.method)
    if filename in ['buttons', 'cards']:
        context['collapse'] = 'components'
    if filename in ['utilities-color', 'utilities-border', 'utilities-animation', 'utilities-other']:
        context['collapse'] = 'utilities'
    if filename in ['404', 'blank']:
        context['collapse'] = 'pages'

    return render(request, f'{filename}.html', context=context)
