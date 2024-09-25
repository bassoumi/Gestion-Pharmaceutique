# urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import  UserLoginView ,CustomLogoutView, check_superuser ,LigneCommandeCreateView , search_fournisseur ,search_Article,CommandeListView,DernierNumeroCommandeView,CommandeDetailView,search_Facture,LivraisonListCreateView,LivraisonDetailView,search_livraison,AvoirLotViewSet,AvoirLotListCreateView,AvoirLotDetailView,patient_list,patient_detail,DemandeListCreateView, DemandeDetailView, LigneDemandeListCreateView, LigneDemandeDetailView,update_stock,get_filtered_lot,update_lot_quantite,AvoirLotListView,UpdateLotView,SaveUsedLotsView,LigneDistributionListView,DemandeListView,search_patient,LigneDistributionSearchView
from django.contrib.auth import views as auth_views
from . import views



urlpatterns = [

    path('token/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('api/logout/', CustomLogoutView.as_view(), name='auth_logout'),
    path('api/check_superuser/', check_superuser, name='check_superuser'),
     path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('commande/', LigneCommandeCreateView.as_view(), name='commande-create'),
    path('fournisseurs/', views.fournisseurs, name='fournisseurs'),
    path('fournisseurs/<str:id>/', views.fournisseur_detail, name='fournisseur_detail'),
    path('fournisseurs/last-ref', views.last_fournisseur_ref, name='last_fournisseur_ref'),
    path('articles/', views.articles, name='article-list-create'),
    path('articles/last-ref/', views.last_article_ref, name='last_article_ref'),
    path('articles/<str:id>/', views.article_detail, name='article_detail'),
    path('search_fournisseur/', search_fournisseur, name='search_fournisseur'),
    path('commandes/', CommandeListView.as_view(), name='commande-list'),
    path('search_Article/', search_Article, name='search_Article'),
    path('search_Facture/', search_Facture, name=' search_Facture'),
    path('search_livraison/', search_livraison, name=' search_livraison'),
    path('articles/<str:num_article>/update-quantite-finale/', views.update_quantite_finale),
    path('last-num-commande/', DernierNumeroCommandeView.as_view(), name='last_num_commande'),
    path('livraisons/', LivraisonListCreateView.as_view(), name='livraison-list-create'),
    path('livraisons/<str:num_liv>/', LivraisonDetailView.as_view(), name='livraison-detail'),
    path('update_stock_stock/', views.update_stock_stock, name='update_stock'),
    path('avoirlots/', AvoirLotListCreateView.as_view(), name='avoirlot-list'),
    path('avoirlots/<int:pk>/', AvoirLotDetailView.as_view(), name='avoirlot-detail'),
    path('avoirlots/create/', AvoirLotViewSet.as_view({'post': 'create_avoirlots'}), name='create-avoirlots'),
    path('updateQuantiteCommandes/', views.update_quantite_commandes, name='update_quantite_commandes'),
    path('commandes/<int:NUM_COM>/', CommandeDetailView.as_view(), name='commande-detail'),
        path('patients/', patient_list, name='patient-list'),
    path('patients/<int:pk>/', patient_detail, name='patient-detail'),
path('search-patients/', search_patient, name='search-patient'),

        path('last-demande/', views.get_last_demande, name='get_last_demande'),
          path('demandes/', DemandeListCreateView.as_view(), name='demande-list-create'),
    path('demandes/<int:n_demande>/', DemandeDetailView.as_view(), name='demande-detail'),
    path('lignes-demande/', LigneDemandeListCreateView.as_view(), name='ligne-demande-list-create'),
    path('lignes-demande/<int:pk>/', LigneDemandeDetailView.as_view(), name='ligne-demande-detail'),
    path('update_stock/', update_stock, name='update_stock'),
    path('filtered-lot/<str:cde_prod>/', get_filtered_lot, name='filtered_lot'),
    path('update-lot-quantite/<str:cde_prod>/', update_lot_quantite, name='update_lot_quantite'),
    path('lots/', AvoirLotListView.as_view(), name='avoirlot-list'),
path('update-lot/', UpdateLotView.as_view(), name='update-lot'),
path('save-used-lots/', SaveUsedLotsView.as_view(), name='save_used_lots'),

    path('ligne-distributions/', LigneDistributionListView.as_view(), name='ligne-distribution-list'),
        path('demandes/', DemandeListView.as_view(), name='demande-list'),
            path('ligne-distributions/search/', LigneDistributionSearchView.as_view(), name='ligne-distribution-search'),
                path('lignes-demande/', LigneDemandeListCreateView.as_view(), name='ligne-demande-list-create'),












]

