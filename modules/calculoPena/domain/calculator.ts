import type {
  CalculatePenaltyInput,
  Condicion,
  Delito,
  ResultadoCalculo,
} from '@/modules/calculoPena/domain/types';

function applyConditionDelta(baseValue: number, condition: Condicion, impactKey: 'impacto_min' | 'impacto_max') {
  const delta = condition[impactKey];

  return condition.tipo === 'agravante' ? baseValue + delta : baseValue - delta;
}

function normalizePenaltyRange(penaMinima: number, penaMaxima: number) {
  const normalizedMin = Math.max(0, penaMinima);
  const normalizedMax = Math.max(normalizedMin, penaMaxima);

  return {
    pena_min: normalizedMin,
    pena_max: normalizedMax,
  };
}

function mapAppliedConditions(condiciones: Condicion[]): ResultadoCalculo['condicionesAplicadas'] {
  return condiciones.map((condicion) => ({
    id: condicion.id,
    nombre: condicion.nombre,
    tipo: condicion.tipo,
  }));
}

function calculateBaseRange(delito: Delito) {
  return {
    pena_min: delito.pena_min_base,
    pena_max: delito.pena_max_base,
  };
}

export function calculatePenalty(input: CalculatePenaltyInput): ResultadoCalculo {
  const baseRange = calculateBaseRange(input.delito);

  const accumulatedRange = input.condiciones.reduce(
    (currentRange, condicion) => ({
      pena_min: applyConditionDelta(currentRange.pena_min, condicion, 'impacto_min'),
      pena_max: applyConditionDelta(currentRange.pena_max, condicion, 'impacto_max'),
    }),
    baseRange,
  );

  const normalizedRange = normalizePenaltyRange(
    accumulatedRange.pena_min,
    accumulatedRange.pena_max,
  );

  return {
    delitoId: input.delito.id,
    delitoNombre: input.delito.nombre,
    condicionesAplicadas: mapAppliedConditions(input.condiciones),
    pena_min: normalizedRange.pena_min,
    pena_max: normalizedRange.pena_max,
  };
}
