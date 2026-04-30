export type TipoCondicion = 'agravante' | 'atenuante';

export type Delito = {
  id: string;
  nombre: string;
  pena_min_base: number;
  pena_max_base: number;
};

export type Condicion = {
  id: string;
  nombre: string;
  tipo: TipoCondicion;
  impacto_min: number;
  impacto_max: number;
};

export type ResultadoCalculo = {
  delitoId: string;
  delitoNombre: string;
  condicionesAplicadas: Array<{
    id: string;
    nombre: string;
    tipo: TipoCondicion;
  }>;
  pena_min: number;
  pena_max: number;
};

export type CalculatePenaltyInput = {
  delito: Delito;
  condiciones: Condicion[];
};
