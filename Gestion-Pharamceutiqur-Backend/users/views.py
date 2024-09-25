from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.response import Response
from .models import AvoirLot,Patient,Demande,LigneDemande,ligne_distrubition

from django.core.exceptions import ObjectDoesNotExist


from .serializer import  UserLoginSerializer ,FournisseurSerializer, ArticleSerializer, CommandeSerializer, LigneCommandeSerializer , LivraisonSerializer, LivraisonLigneSerializer , Livraison, LivraisonLigne,AvoirLotSerializer,PatientSerializer,Demande,LigneDemandeSerializer,LigneDemandeSerializer,DemandeSerializer,ArticleSerializer,AvoirLotSerializer,LigneDistributionSerializer
from django.db.utils import IntegrityError
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser





from django.http import JsonResponse
from django.db.models import Q
from rest_framework.decorators import api_view



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        username = UserLoginSerializer.username

        # Ajout de débogage
        username = user.username
        print(f"Authenticated user: {user}")
        print(f"User's username: {username}")

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username":  UserLoginSerializer.username 
        }, status=status.HTTP_200_OK)

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CustomLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        print("Logout endpoint reached")
        try:
            refresh_token = request.data["refresh"]
            print(f"Refresh token: {refresh_token}")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"Error: {e}")
            return Response(status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
@api_view(['GET'])

@permission_classes([IsAuthenticated])
def check_superuser(request):
    return Response({'is_superuser': request.user.is_superuser})




from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging 
import json
logger = logging.getLogger(__name__)

from rest_framework import viewsets
from .models import  Fournisseur, Article, Commande, LigneCommande


class FournisseurViewSet(viewsets.ModelViewSet):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer

class LigneCommandeCreateView(generics.CreateAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CommandeListView(generics.ListAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer

class CommandeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    lookup_field = 'NUM_COM'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
from django.views import View
class DernierNumeroCommandeView(View):
    def get(self, request, *args, **kwargs):
        try:
            dernier_numero_commande = Commande.objects.latest('NUM_COM').NUM_COM
        except Commande.DoesNotExist:
            dernier_numero_commande = 0
        return JsonResponse({'dernier_numero_commande': dernier_numero_commande + 1})

@api_view(['GET', 'POST'])
def fournisseurs(request):
    if request.method == 'GET':
        fournisseurs = Fournisseur.objects.all()
        serializer = FournisseurSerializer(fournisseurs, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FournisseurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def fournisseur_detail(request, id):
    try:
        fournisseur = Fournisseur.objects.get(pk=id)
    except Fournisseur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FournisseurSerializer(fournisseur)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = FournisseurSerializer(fournisseur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        Commande.objects.filter(CDE_FOUR=fournisseur).delete()
        fournisseur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['PUT'])
def update_quantite_finale(request, num_article):
    try:
        article = Article.objects.get(pk=num_article)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    quantite_finale = request.data.get('quantite_finale', None)
    if quantite_finale is not None:
        article.quantite_finale = quantite_finale
        article.save()
        return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_quantite_finale(request, num_article):
    try:
        article = Article.objects.get(pk=num_article)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    quantite = request.data.get('quantite', None)
    if quantite is not None:
        article.quantite = quantite
        article.save()
        return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request, id):
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    elif request.method == 'PUT':
        print(f"Received data: {request.data}") 
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def articles(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def last_fournisseur_ref(request):
    last_fournisseur = Fournisseur.objects.order_by('-CDE_FOUR').first()
    if last_fournisseur:
        last_ref = last_fournisseur.CDE_FOUR
    else:
        last_ref = "FR0000"
    return Response(last_ref)





@api_view(['GET'])
def last_article_ref(request):
    try:
        last_ref = Article.objects.latest('num_article')
        return Response({'lastRef': last_ref.num_article})
    except Article.DoesNotExist:
        return Response({'lastRef': None}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def search_fournisseur(request):
    CDE_FOUR = request.GET.get('CDE_FOUR', None)
    queryset = Fournisseur.objects.all()

    if CDE_FOUR:
        queryset = queryset.filter(CDE_FOUR__icontains=CDE_FOUR)
    serializer = FournisseurSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_Facture(request):
    try:
        NUM_COM = request.GET.get('NUM_COM', None)
        queryset = Commande.objects.all()

        if NUM_COM:
            queryset = queryset.filter(NUM_COM__icontains=NUM_COM)

        serializer = CommandeSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def search_Article(request):
    search_type = request.GET.get('searchType', None)
    query = request.GET.get('query', None)
    queryset = Article.objects.all()

    if search_type == 'CDE_PROD' and query:
        queryset = queryset.filter(CDE_PROD__icontains=query)
    elif search_type == 'LIB_PROD' and query:
        queryset = queryset.filter(LIB_PROD__icontains=query)

    serializer = ArticleSerializer(queryset, many=True)
    return Response(serializer.data)



class LivraisonListCreateView(APIView):
    def get(self, request):
        livraisons = Livraison.objects.all()
        serializer = LivraisonSerializer(livraisons, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LivraisonSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LivraisonDetailView(APIView):
    def get(self, request, num_liv):
        livraison = get_object_or_404(Livraison, NUM_LIV=num_liv)
        serializer = LivraisonSerializer(livraison)
        return Response(serializer.data)

    def put(self, request, num_liv):
        livraison = get_object_or_404(Livraison, NUM_LIV=num_liv)
        serializer = LivraisonSerializer(livraison, data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, num_liv):
        livraison = get_object_or_404(Livraison, NUM_LIV=num_liv)
        try:
            livraison.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


@api_view(['GET'])
def search_livraison(request):
    try:
        NUM_LIV = request.GET.get('NUM_LIV', None)
        queryset = Livraison.objects.all()

        if NUM_LIV:
            queryset = queryset.filter(NUM_LIV__icontains=NUM_LIV)

        serializer = LivraisonSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['POST'])
def update_stock_stock(request):
    try:
        livraisons = request.data.get('livraisons')
        print("Données reçues:", livraisons)  

        if not livraisons:
            return Response({"error": "No livraisons data provided"}, status=status.HTTP_400_BAD_REQUEST)

        for livraison in livraisons:
            for ligne in livraison['lignes']:
                try:
                    print(f"Recherche de l'article avec CDE_PROD: {ligne['CDE_PROD']}")  
                    article = Article.objects.get(CDE_PROD=ligne['CDE_PROD'])
                    print(f"Article trouvé: {article.CDE_PROD}")  

                    new_stock = article.STOCK_PROD + (article.COND_PROD * ligne['QTE_LIV'])
                    print(f"Ancien stock pour {article.CDE_PROD}: {article.STOCK_PROD}")  
                    print(f"Nouvelle quantité livrée: {ligne['QTE_LIV']}")  
                    print(f"Condition produit: {article.COND_PROD}")  
                    article.STOCK_PROD = new_stock
                    article.save()
                except Article.DoesNotExist:
                    return Response({"error": f"Article with CDE_PROD {ligne['CDE_PROD']} not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"success": "Stock updated successfully"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView



from rest_framework.decorators import action


class AvoirLotViewSet(viewsets.ModelViewSet):
    queryset = AvoirLot.objects.all()
    serializer_class = AvoirLotSerializer

    @action(detail=False, methods=['post'])
    def create_avoirlots(self, request):
        avoirlots_data = request.data.get('avoirLots', [])
        response_data = []

        for data in avoirlots_data:
            existing_avoirlot = AvoirLot.objects.filter(
                NUM_LOT=data.get('NUM_LOT'),
                CDE_PROD=data.get('CDE_PROD')
            ).first()
            
            if existing_avoirlot:
                serializer = AvoirLotSerializer(existing_avoirlot, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = AvoirLotSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response_data, status=status.HTTP_200_OK)

class AvoirLotListCreateView(ListCreateAPIView):
    queryset = AvoirLot.objects.all()
    serializer_class = AvoirLotSerializer

class AvoirLotDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AvoirLot.objects.all()
    serializer_class = AvoirLotSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Commande

@api_view(['POST'])
def update_quantite_commandes(request):
    data = request.data
    print('Données reçues:', data)  

    if not isinstance(data, list):
        return Response({'error': 'Le format des données est incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    for item in data:
        num_com = item.get('NUM_COM')
        cde_prod = item.get('CDE_PROD')
        qte_liv = item.get('QTE_LIV')
        
        if num_com is None or qte_liv is None or cde_prod is None:
            print('NUM_COM, QTE_LIV ou CDE_PROD manquant:', item)
            return Response({'error': 'NUM_COM, QTE_LIV et CDE_PROD sont requis'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            ligne_commande = LigneCommande.objects.get(NUM_COM__NUM_COM=num_com, CDE_PROD__CDE_PROD=cde_prod)
            print(f'Ligne de commande trouvée : {ligne_commande}') 

            if ligne_commande.QTE_COM_TOTALE is None:
                ligne_commande.QTE_COM_TOTALE = ligne_commande.QTE_COM
                ligne_commande.save()  
                print(f'QTE_COM_TOTALE initialisée pour la ligne de commande {num_com}, produit {cde_prod}: {ligne_commande.QTE_COM_TOTALE}')
            else:
                print(f'QTE_COM_TOTALE déjà remplie pour la ligne de commande {num_com}, produit {cde_prod}: {ligne_commande.QTE_COM_TOTALE}')

            ligne_commande.QTE_COM -= qte_liv
            ligne_commande.save()  

            print(f'Quantité mise à jour pour la ligne de commande {num_com}, produit {cde_prod}: {ligne_commande.QTE_COM}') 
        except LigneCommande.DoesNotExist:
            print(f'Ligne de commande avec NUM_COM {num_com} et CDE_PROD {cde_prod} non trouvée')
            return Response({'error': 'Ligne de commande non trouvée'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Erreur lors de la mise à jour de la ligne de commande {num_com}, produit {cde_prod}: {e}') 
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({'status': 'Quantités mises à jour'}, status=status.HTTP_200_OK)




@api_view(['GET', 'POST'])
def patient_list(request):
    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def search_patient(request):
    try:
        id_unique = request.GET.get('ID_UNIQUE', None)
        num_carte_desoin = request.GET.get('num_carte_desoin', None)

        queryset = Patient.objects.all()

        if id_unique:
            queryset = queryset.filter(ID_UNIQUE__icontains=id_unique)
        
        if num_carte_desoin:
            queryset = queryset.filter(num_carte_desoin__icontains=num_carte_desoin)

        serializer = PatientSerializer(queryset, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, pk):
    try:
        patient = Patient.objects.get(pk=pk)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PatientSerializer(patient)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = PatientSerializer(patient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        patient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



from django.db import transaction

    
def get_last_demande(request):
    try:
        with transaction.atomic():
            last_demande_n = Demande.objects.order_by('-N_DEMANDE').values_list('N_DEMANDE', flat=True).first()
            
            if last_demande_n:
                last_demande = Demande.objects.select_for_update().get(N_DEMANDE=last_demande_n)
                return JsonResponse({'lastNDEMANDE': last_demande.N_DEMANDE})
            else:
                return JsonResponse({'lastNDEMANDE': 0})

    except Demande.DoesNotExist:
        return JsonResponse({'lastNDEMANDE': 0})

    except Exception as e:
        logger.error(f"Erreur lors de la récupération du dernier N_DEMANDE: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

    except ObjectDoesNotExist:
        return JsonResponse({'lastNDEMANDE': 0})

    except Exception as e:
        logger.error(f"Erreur lors de la récupération du dernier N_DEMANDE: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)
    
class DemandeListCreateView(APIView):
    def get(self, request):
        demandes = Demande.objects.all()
        serializer = DemandeSerializer(demandes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DemandeSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DemandeDetailView(APIView):
    def get(self, request, n_demande):
        demande = get_object_or_404(Demande, N_DEMANDE=n_demande)
        serializer = DemandeSerializer(demande)
        return Response(serializer.data)

    def put(self, request, n_demande):
        demande = get_object_or_404(Demande, N_DEMANDE=n_demande)
        serializer = DemandeSerializer(demande, data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, n_demande):
        demande = get_object_or_404(Demande, N_DEMANDE=n_demande)
        try:
            demande.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class LigneDemandeListCreateView(APIView):
    def get(self, request):
        lignes_demande = LigneDemande.objects.all()
        serializer = LigneDemandeSerializer(lignes_demande, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LigneDemandeSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LigneDemandeDetailView(APIView):
    def get(self, request, pk):
        ligne_demande = get_object_or_404(LigneDemande, pk=pk)
        serializer = LigneDemandeSerializer(ligne_demande)
        return Response(serializer.data)

    def put(self, request, pk):
        ligne_demande = get_object_or_404(LigneDemande, pk=pk)
        serializer = LigneDemandeSerializer(ligne_demande, data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        ligne_demande = get_object_or_404(LigneDemande, pk=pk)
        try:
            ligne_demande.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def update_stock(request):
    data = request.data
    cde_prod = data.get('cde_prod')
    qte_dist = data.get('qte_dist')

    try:
        article = Article.objects.get(CDE_PROD=cde_prod)
        
        if article.STOCK_PROD - qte_dist < 0:
            print(f"Error: Insufficient stock for article {cde_prod}")
            return Response({'error': 'Insufficient stock for this article'}, status=status.HTTP_400_BAD_REQUEST)

        article.STOCK_PROD -= qte_dist
        article.save()

        return Response({'status': 'Stock updated'}, status=status.HTTP_200_OK)
    
    except Article.DoesNotExist:
        return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from datetime import date
def update_lot_quantite(request, cde_prod):
    lot = get_object_or_404(AvoirLot, CDE_PROD=cde_prod)
    
    qte_dist = request.data.get('qte_dist')
    
    lot.QTE_LOT -= qte_dist
    lot.save()

    return JsonResponse({'success': 'Stock updated successfully'})

from django.db.models import Sum
class AvoirLotListView(APIView):
    def get(self, request, *args, **kwargs):
        lots = AvoirLot.objects.all()
        serializer = AvoirLotSerializer(lots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def get_filtered_lot(request, cde_prod):
    lot = AvoirLot.objects.filter(CDE_PROD=cde_prod).order_by('DATE_PER').first()

    if lot:
        return JsonResponse({
            'NUM_LOT': lot.NUM_LOT,
            'DATE_PER': lot.DATE_PER,
            'QTE_LOT': lot.QTE_LOT
        })
    else:
        return JsonResponse({'error': 'Lot not found'}, status=404)
    
class UpdateLotView(APIView):
    def put(self, request, *args, **kwargs):
        num_lot = request.data.get('num_lot')
        qte_lot = request.data.get('qte_lot')
        cde_prod = request.data.get('cde_prod')

        try:
            lots = AvoirLot.objects.filter(NUM_LOT=num_lot, CDE_PROD=cde_prod)

            if not lots.exists():
                return Response({'error': 'Lot not found or product code does not match'}, status=status.HTTP_404_NOT_FOUND)

            for lot in lots:
                lot.QTE_LOT = qte_lot
                lot.SUSPENDU = 'oui' if qte_lot == 0 else 'non'
                lot.save()

            self.recalculate_stock(cde_prod)
            return Response({'message': 'Lot(s) updated successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def recalculate_stock(self, cde_prod):
        total_stock = AvoirLot.objects.filter(CDE_PROD=cde_prod).aggregate(total=Sum('QTE_LOT'))['total'] or 0
        try:
            article = Article.objects.get(CDE_PROD=cde_prod)
            article.STOCK_PROD = total_stock
            article.save()
        except Article.DoesNotExist:
            print(f"Article with code {cde_prod} does not exist.")
        except Exception as e:
            print(f"Error updating article stock: {str(e)}")


class SaveUsedLotsView(APIView):
    def post(self, request, *args, **kwargs):
        lots_data = request.data
        print('Received lots data:', lots_data)

        if not isinstance(lots_data, list):
            return Response({'error': 'Invalid data format, expected a list of lots'}, status=status.HTTP_400_BAD_REQUEST)

        for lot_data in lots_data:
            num_dem_id = lot_data.get('ndemande')
            nlot = lot_data.get('nlot')
            date_peremption = lot_data.get('date_peremption')
            qte_lot = lot_data.get('qte_lot')
            prix_dist = lot_data.get('prix_dist')
            code_prod = lot_data.get('cde_prod')

            if not all([num_dem_id, nlot, date_peremption, qte_lot, prix_dist]):
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                qte_lot = float(qte_lot)
                prix_dist = float(prix_dist)
            except ValueError:
                return Response({'error': 'Invalid data format for qte_lot or prix_dist'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                num_dem = Demande.objects.get(N_DEMANDE=num_dem_id)
            except Demande.DoesNotExist:
                return Response({'error': f'Demande with id {num_dem_id} not found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                ligne_distrubition.objects.create(
                    num_dem=num_dem,
                    nlot=nlot,
                    code_prod=code_prod,
                    date_peremption=date_peremption,
                    qte_lot=qte_lot,
                    prix_dist=prix_dist
                )
            except Exception as e:
                print(f'Error creating lot: {e}')
                return Response({'error': 'Failed to save lot data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Used lots saved successfully'}, status=status.HTTP_201_CREATED)


class LigneDistributionListView(generics.ListAPIView):
    queryset = ligne_distrubition.objects.all()
    serializer_class = LigneDistributionSerializer


class DemandeListView(generics.ListAPIView):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

class LigneDistributionSearchView(generics.ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        queryset = Demande.objects.all()

        n_demande = self.request.query_params.get('N_DEMANDE', None)
        id_unique = self.request.query_params.get('ID_UNIQUE', None)

        if n_demande:
            queryset = queryset.filter(lots__num_dem=n_demande).distinct()

        if id_unique:
            queryset = queryset.filter(ID_UNIQUE=id_unique).distinct()

        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"message": "Aucune demande trouvée pour les critères donnés"}, status=status.HTTP_404_NOT_FOUND)

        demandes = []
        for demande in queryset:
            lignes = ligne_distrubition.objects.filter(num_dem=demande.N_DEMANDE)
            demandes.append({
                **DemandeSerializer(demande).data,
                'lignes': LigneDistributionSerializer(lignes, many=True).data
            })

        return Response(demandes, status=status.HTTP_200_OK)

class LigneDemandeListCreateView(generics.ListCreateAPIView):
    queryset = LigneDemande.objects.all()
    serializer_class = LigneDemandeSerializer

    def create(self, request, *args, **kwargs):
        print('Données reçues:', request.data)
        
        data = request.data
        demande_id = data.get('demande')
        
        if not demande_id:
            return Response({'error': 'DEMANDE_ID est requis'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Demande.objects.filter(N_DEMANDE=demande_id).exists():
            return Response({'error': 'Demande non trouvée'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                response_data = serializer.data
                response_data['id'] = serializer.instance.id
                return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
            except Exception as e:
                print('Erreur lors de la création:', e)
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print('Erreurs de validation:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)