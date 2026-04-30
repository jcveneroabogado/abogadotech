import type { Condicion, Delito } from '@/modules/calculoPena/domain/types';
import {
  calculoPenaDataSource,
  condicionRecords,
  delitoRecords,
} from '@/modules/calculoPena/infrastructure/data';

export const delitos: Delito[] = delitoRecords.map((delito) => ({
  id: delito.id,
  nombre: delito.nombre,
  pena_min_base: delito.pena_min_base,
  pena_max_base: delito.pena_max_base,
}));

export const condiciones: Condicion[] = condicionRecords.map((condicion) => ({
  id: condicion.id,
  nombre: condicion.nombre,
  tipo: condicion.tipo,
  impacto_min: condicion.impacto_min,
  impacto_max: condicion.impacto_max,
}));

export const calculoPenaConstants = {
  delitos,
  condiciones,
  dataSource: calculoPenaDataSource,
} as const;
