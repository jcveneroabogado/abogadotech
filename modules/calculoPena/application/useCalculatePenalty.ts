import { calculatePenalty } from '@/modules/calculoPena/domain/calculator';
import type { CalculatePenaltyInput, ResultadoCalculo } from '@/modules/calculoPena/domain/types';

export function useCalculatePenalty(input: CalculatePenaltyInput): ResultadoCalculo {
  return calculatePenalty(input);
}
