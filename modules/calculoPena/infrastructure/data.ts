export const delitoRecords = [
  {
    id: 'hurto-simple',
    nombre: 'Hurto simple',
    pena_min_base: 1,
    pena_max_base: 3,
  },
  {
    id: 'robo-agravado',
    nombre: 'Robo agravado',
    pena_min_base: 12,
    pena_max_base: 20,
  },
  {
    id: 'estafa-basica',
    nombre: 'Estafa basica',
    pena_min_base: 1,
    pena_max_base: 6,
  },
] as const;

export const condicionRecords = [
  {
    id: 'reincidencia',
    nombre: 'Reincidencia',
    tipo: 'agravante',
    impacto_min: 1,
    impacto_max: 2,
  },
  {
    id: 'pluralidad-agentes',
    nombre: 'Pluralidad de agentes',
    tipo: 'agravante',
    impacto_min: 2,
    impacto_max: 4,
  },
  {
    id: 'tentativa',
    nombre: 'Tentativa',
    tipo: 'atenuante',
    impacto_min: 1,
    impacto_max: 2,
  },
  {
    id: 'confesion-sincera',
    nombre: 'Confesion sincera',
    tipo: 'atenuante',
    impacto_min: 1,
    impacto_max: 1,
  },
] as const;

export const calculoPenaDataSource = {
  delitos: delitoRecords,
  condiciones: condicionRecords,
} as const;
