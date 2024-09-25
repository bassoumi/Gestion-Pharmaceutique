# serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Fournisseur, Article, Commande, LigneCommande,Livraison, LivraisonLigne,AvoirLot,Demande,LigneDemande,Patient,ligne_distrubition

from django.contrib.auth.models import User



class LigneDemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneDemande
        fields = ['cde_prod',  'qte_dem', 'qte_dist','demande']

class DemandeSerializer(serializers.ModelSerializer):
    lignes = LigneDemandeSerializer(many=True)

    class Meta:
        model = Demande
        fields = ['N_DEMANDE', 'DATE_DEMANDE', 'ID_UNIQUE', 'lignes']

    def create(self, validated_data):
        lignes_data = validated_data.pop('lignes')
        try:
            with transaction.atomic():
                demande = Demande.objects.create(**validated_data)
                for ligne_data in lignes_data:
                    LigneDemande.objects.create(demande=demande, **ligne_data)
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})

        return demande


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['ID_UNIQUE', 
            'NOM', 
            'PRENOM', 
            'DATE_NAISSANCE', 
            'ADRESSE', 
            'TELEPHONE', 
            'EMAIL', 
            'SEXE', 
            'num_carte_desoin','DATE_SUBMIT'] 
        extra_kwargs = {
            'ID_UNIQUE': {'read_only': True} 
        }
        

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                    return data
                else:
                    raise serializers.ValidationError("User is not active.")
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must provide both username and password.")
        






class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'

        
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

    def update(self, instance, validated_data):
        print(f"Before update: {instance.quantite}")
        instance = super().update(instance, validated_data)
        print(f"After update: {instance.quantite}")
        return instance






from rest_framework import serializers
from django.db import transaction


class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class LigneCommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneCommande
        fields = ['CDE_PROD', 'PRIX_COM_UNITAIRE', 'QTE_COM', 'TOT_COM','QTE_COM_TOTALE']  

class CommandeSerializer(serializers.ModelSerializer):
    lignes = LigneCommandeSerializer(many=True)
    CDE_FOUR = serializers.PrimaryKeyRelatedField(queryset=Fournisseur.objects.all())

    class Meta:
        model = Commande
        fields = ['DATE_COM', 'CDE_FOUR', 'OBSE', 'ETAT', 'lignes','NUM_COM']  
    def create(self, validated_data):
        lignes_data = validated_data.pop('lignes')
        CDE_FOUR = validated_data.pop('CDE_FOUR')

        with transaction.atomic():
            commande = Commande.objects.create(CDE_FOUR=CDE_FOUR, **validated_data)
            for ligne_data in lignes_data:
                LigneCommande.objects.create(NUM_COM=commande, **ligne_data)
        
        return commande
    
from rest_framework import serializers
from .models import Livraison, LivraisonLigne
from django.db import transaction

class LivraisonLigneSerializer(serializers.ModelSerializer):
    class Meta:
        model = LivraisonLigne
        fields = ['CDE_PROD', 'PRIX_LIV', 'DATE_PER', 'QTE_COM', 'QTE_LIV', 'ARRIVAGE_LIV','NUM_LOT']

class LivraisonSerializer(serializers.ModelSerializer):
    lignes = LivraisonLigneSerializer(many=True)

    class Meta:
        model = Livraison
        fields = ['NUM_LIV', 'ARR_LIV','DAT_LIV', 'NUM_COM', 'ETAT_LIV', 'lignes', 'CDE_FOUR']

    def create(self, validated_data):
        lignes_data = validated_data.pop('lignes')
        try:
            with transaction.atomic():
                livraison = Livraison.objects.create(**validated_data)
                for ligne_data in lignes_data:
                    LivraisonLigne.objects.create(NUM_LIV=livraison, **ligne_data)
        except Exception as e:
            raise serializers.ValidationError({'error': str(e)})

        return livraison



class AvoirLotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvoirLot
        fields = '__all__'

class LigneDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ligne_distrubition
        fields = '__all__' 

class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'


