from django.db import models


# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

# Create your models here.


class FuelCompany(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    name = models.CharField(max_length=50)
    prize_spins = models.IntegerField()
    give_ads_promo_ticket = models.IntegerField(blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fuel_company'


class FuelCompanyAward(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    fuel_company = models.ForeignKey(FuelCompany, models.DO_NOTHING)
    name = models.CharField(max_length=50)
    total_awards = models.IntegerField()
    awards_per_day = models.IntegerField()
    probability = models.FloatField()
    roulette_position = models.IntegerField()
    is_active = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fuel_company_award'


class FuelStation(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    fuel_company = models.ForeignKey(FuelCompany, models.DO_NOTHING)
    name = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    address = models.CharField(max_length=500)
    is_active = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        managed = False
        db_table = 'fuel_station'


class User(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    firebaseid = models.CharField(db_column='firebaseId', max_length=36)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=100)
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    mother_last_name = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=14, blank=True, null=True)
    rfc = models.CharField(max_length=13, blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    is_admin = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class UserAwards(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    user = models.ForeignKey(User, models.DO_NOTHING)
    fuel_company_award = models.ForeignKey(FuelCompanyAward, models.DO_NOTHING)
    is_active = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_awards'


class UserTickets(models.Model):
    id = models.CharField(primary_key=True, max_length=36)
    user = models.ForeignKey(User, models.DO_NOTHING)
    fuel_station = models.ForeignKey(FuelStation, models.DO_NOTHING)
    ticket = models.CharField(max_length=100)
    ticket_amount = models.FloatField()
    ticket_date = models.DateTimeField(blank=True, null=True)
    ticket_liters = models.FloatField(blank=True, null=True)
    ticket_type = models.IntegerField(blank=True, null=True)
    is_ads_promo_ticket = models.IntegerField(blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    created_by = models.CharField(max_length=36, blank=True, null=True)
    updated_by = models.CharField(max_length=36, blank=True, null=True)
    deleted_by = models.CharField(max_length=36, blank=True, null=True)
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.amount = 0

    class Meta:
        managed = False
        db_table = 'user_tickets'
        unique_together = (('fuel_station', 'ticket'),)
