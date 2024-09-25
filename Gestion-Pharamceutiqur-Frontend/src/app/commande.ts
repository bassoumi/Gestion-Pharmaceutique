export interface Commande {
  DATE_COM: string;
  CDE_FOUR: string;
  NUM_COM?: number;
  OBSE: string;
  ETAT: string;
  id?: number;
  totalPrix?: number;
  user: string;
  lignes: {
    CDE_PROD : string;
    id : string;
    NUM_COM : string;
    PRIX_COM_UNITAIRE: string;
    TOT_COM: string;
    QTE_COM: string;
    QTE_COM_TOTALE:string
    QTE_STOCK: string;
  }[];
}


/* export interface Commande {
  date_commande: string;
  nom_fournisseur: string;
  totalPrix?: number;
  user: string;
  lignes: {
    num_ligne_commande: string;
    nom_article: string;
    num_article: string;
    Prix: string;
    prix_total: string;
    quantite: string;
   num_commande: string;
  }[];
}
 */