from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.utils import timezone

class Patient(models.Model):
    ID_UNIQUE = models.AutoField(primary_key=True)
    NOM = models.CharField(max_length=100)
    PRENOM = models.CharField(max_length=100)
    DATE_NAISSANCE = models.DateField(null=True, blank=True, default=None)
    ADRESSE = models.CharField(max_length=255, default='')
    TELEPHONE = models.CharField(max_length=15, default='')
    EMAIL = models.EmailField(max_length=255, default='')
    SEXE = models.CharField(max_length=1, choices=[('M', 'Masculin'), ('F', 'Féminin')], default='M')
    num_carte_desoin = models.CharField(max_length=50, default='')
    DATE_SUBMIT = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.NOM} {self.PRENOM}'

class Demande(models.Model):
    N_DEMANDE = models.AutoField(primary_key=True)
    DATE_DEMANDE = models.DateField(auto_now_add=True)
    ID_UNIQUE = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'Demande {self.N_DEMANDE} pour {self.ID_UNIQUE}'
    
class LigneDemande(models.Model):
    demande = models.ForeignKey(Demande, on_delete=models.CASCADE, related_name='lignes')
    cde_prod = models.CharField(max_length=100)  # Changez la longueur selon vos besoins
    qte_dem = models.DecimalField(max_digits=10, decimal_places=2)  # Ajustez les valeurs si nécessaire
    qte_dist = models.DecimalField(max_digits=10, decimal_places=2)  # Ajustez les valeurs si nécessaire

    def __str__(self):
        return f'Ligne {self.num_dem} pour demande {self.demande.N_DEMANDE}'


class ligne_distrubition(models.Model):
    num_dem = models.ForeignKey(Demande, on_delete=models.CASCADE, related_name='lots')
    code_prod = models.CharField(max_length=100, default="prod1")
    nlot = models.CharField(max_length=100)  # Changez la longueur selon vos besoins
    date_peremption = models.DateField()
    qte_lot = models.DecimalField(max_digits=10, decimal_places=2)  # Ajustez les valeurs si nécessaire
    prix_dist = models.DecimalField(max_digits=10, decimal_places=2)  # Ajustez les valeurs si nécessaire

    def __str__(self):
        return f'Lot {self.nlot} pour demande {self.num_dem.N_DEMANDE}'

class Fournisseur(models.Model):
    CDE_FOUR = models.CharField(max_length=10, primary_key=True)
    NOM_FOUR = models.CharField(max_length=100)
    ADR_FOUR = models.TextField()
    TEL_PORT = models.CharField(max_length=30)
    TEL_BUR = models.CharField(max_length=15)
    FAX_FOUR = models.CharField(max_length=50, default='mail')
    MAIL_FOUR = models.CharField(max_length=50, default='mail')

    @classmethod
    def generate_CDE_FOUR(cls):
        last_fournisseur = cls.objects.order_by('-CDE_FOUR').first()
        if last_fournisseur:
            last_ref = int(last_fournisseur.CDE_FOUR[2:])
            new_ref_number = last_ref + 1
        else:
            new_ref_number = 1
        return f"FR{new_ref_number:03d}"

    def save(self, *args, **kwargs):
        if not self.CDE_FOUR:
            self.CDE_FOUR = self.generate_CDE_FOUR()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.CDE_FOUR} - {self.NOM_FOUR}"
import datetime
class Article(models.Model):
    CDE_PROD = models.CharField(max_length=20, primary_key=True, default='AR001')
    LIB_PROD = models.CharField(max_length=250, default='produit')
    PRI_ACHT_PROD = models.DecimalField(max_digits=12, decimal_places=3, default=0)
    PRI_VENT_PROD = models.DecimalField(max_digits=12, decimal_places=3, default=0)
    TYPE_PROD = models.CharField(max_length=50, default='produit')
    COND_PROD = models.IntegerField(default=0)
    STOCK_PROD = models.IntegerField(default=0)
    DATE_PROD = models.DateField(default=datetime.date.today)
    def save(self, *args, **kwargs):
        if not self.CDE_PROD:
            self.CDE_PROD = self.generate_article_ref()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_article_ref():
        last_article = Article.objects.order_by('-CDE_PROD').first()
        if last_article:
            last_num = int(last_article.CDE_PROD[2:])
            new_num = last_num + 1
        else:
            new_num = 1
        return f'AR{new_num:03d}'

    def __str__(self):
        return f"{self.CDE_PROD} - {self.LIB_PROD}"

class Commande(models.Model):
    NUM_COM = models.AutoField(primary_key=True)
    DATE_COM = models.DateTimeField()
    CDE_FOUR = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    OBSE = models.CharField(max_length=200, default='produit')
    ETAT = models.CharField(max_length=50, default='produit')

class LigneCommande(models.Model):
    id = models.AutoField(primary_key=True)
    QTE_COM = models.IntegerField()
    QTE_COM_TOTALE = models.IntegerField(default=0)
    CDE_PROD = models.ForeignKey(Article, on_delete=models.CASCADE)
    NUM_COM = models.ForeignKey(Commande, related_name='lignes', on_delete=models.CASCADE)
    PRIX_COM_UNITAIRE = models.DecimalField(max_digits=10, decimal_places=4, default=0.00)
    TOT_COM = models.DecimalField(max_digits=10, decimal_places=4, default=0.00)


class Livraison(models.Model):
    NUM_LIV = models.AutoField(primary_key=True)
    ARR_LIV =models.DateField()
    DAT_LIV=models.DateField()
    NUM_COM = models.ForeignKey(Commande, on_delete=models.CASCADE, default=1)
    ETAT_LIV = models.CharField(max_length=50, default='En Cours')
    CDE_FOUR=models.CharField(max_length=30)
from django.core.exceptions import ValidationError

def validate_price(value):
    if value < 0:
        raise ValidationError('Le prix ne peut pas être négatif.')
class LivraisonLigne(models.Model):
    NUM_LIV = models.ForeignKey(Livraison, related_name='lignes', on_delete=models.CASCADE)
    CDE_PROD = models.CharField(max_length=30)
    QTE_LIV = models.IntegerField(default=1)
    PRIX_LIV = models.DecimalField(max_digits=10, decimal_places=3, default=0.00, validators=[validate_price])
    line_created_at = models.DateTimeField(default=timezone.now)
    NUM_LOT = models.CharField(max_length=30)
    DATE_PER = models.DateField()
    QTE_COM = models.IntegerField(default=1)
    ARRIVAGE_LIV = models.IntegerField(default=1)

class AvoirLot(models.Model):
    NUM_LOT = models.CharField(max_length=30)
    CDE_PROD = models.CharField(max_length=30)
    DATE_PER = models.DateField()
    QTE_LOT = models.IntegerField()
    PRIX_ACHT_LOT = models.DecimalField(max_digits=10, decimal_places=4)
    PRIX_VENT_LOT = models.DecimalField(max_digits=10, decimal_places=4)
    SUSPENDU = models.CharField(max_length=5, blank=True, null=True)

    def __str__(self):
        return f"{self.NUM_LOT} - {self.CDE_PROD}"
    



