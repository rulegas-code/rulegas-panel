from rest_framework import serializers, viewsets

from rulegas.models import FuelCompanyAward


# Serializers define the API representation.
class FuelCompanyAwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelCompanyAward
        fields = ['id',  'fuel_company', 'name', 'total_awards', 'awards_per_day', 'probability', 'roulette_position', 'is_active']


# ViewSets define the view behavior.
class FuelCompanyAwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FuelCompanyAward.objects.all()
    serializer_class = FuelCompanyAwardSerializer
