export interface Livraison {
    NUM_LIV: string;
    ARR_LIV: number;
    NUM_COM?: string;
    CDE_FOUR?: string;
    DAT_LIV: string;
    ETAT_LIV?: string;
    lignes: {
      CDE_PROD: string;
      ARRIVAGE_LIV:number
      QTE_COM:string
      QTE_LIV:number
      NUM_LOT: string;
      PRIX_LIV: number;
      DATE_PER: string;
    }[];
  }
  