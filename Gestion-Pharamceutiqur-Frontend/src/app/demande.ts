export interface Demande {
  N_DEMANDE: number;     
  DATE_DEMANDE: string;  
  ID_UNIQUE: string; 
  lignes: {
    cde_prod: string;
    ndemande: number;   
    qte_dem: number;
    qte_dist: number;
  }[];
}
