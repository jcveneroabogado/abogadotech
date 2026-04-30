'use client';

import { useMemo, useState } from 'react';
import { useCalculatePenalty as calculatePenaltyUseCase } from '@/modules/calculoPena/application/useCalculatePenalty';
import { condiciones, delitos } from '@/modules/calculoPena/domain/constants';
import type { Condicion, Delito, ResultadoCalculo } from '@/modules/calculoPena/domain/types';

function getInitialDelito(): string {
  return delitos[0]?.id ?? '';
}

function getSelectedDelito(delitoId: string): Delito | null {
  return delitos.find((delito) => delito.id === delitoId) ?? null;
}

function getSelectedCondiciones(selectedConditionIds: string[]): Condicion[] {
  return condiciones.filter((condicion) => selectedConditionIds.includes(condicion.id));
}

function getResultLabel(resultado: ResultadoCalculo | null): string {
  if (!resultado) {
    return '';
  }

  return `Pena estimada: ${resultado.pena_min} - ${resultado.pena_max} anos`;
}

export function PenaltyCalculatorForm() {
  const [selectedDelitoId, setSelectedDelitoId] = useState<string>(getInitialDelito);
  const [selectedConditionIds, setSelectedConditionIds] = useState<string[]>([]);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const selectedDelito = useMemo(
    () => getSelectedDelito(selectedDelitoId),
    [selectedDelitoId],
  );

  const resultLabel = useMemo(() => getResultLabel(resultado), [resultado]);

  function handleDelitoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDelitoId(event.target.value);
    setResultado(null);
  }

  function handleConditionChange(conditionId: string) {
    setSelectedConditionIds((currentIds) => {
      const hasCondition = currentIds.includes(conditionId);

      if (hasCondition) {
        return currentIds.filter((id) => id !== conditionId);
      }

      return [...currentIds, conditionId];
    });

    setResultado(null);
  }

  function handleCalculate() {
    if (!selectedDelito) {
      return;
    }

    const selectedCondiciones = getSelectedCondiciones(selectedConditionIds);
    const nextResultado = calculatePenaltyUseCase({
      delito: selectedDelito,
      condiciones: selectedCondiciones,
    });

    setResultado(nextResultado);
  }

  return (
    <section
      style={{
        maxWidth: 640,
        display: 'grid',
        gap: 24,
      }}
    >
      <div style={{ display: 'grid', gap: 8 }}>
        <label htmlFor="delito-select">Delito</label>
        <select
          id="delito-select"
          value={selectedDelitoId}
          onChange={handleDelitoChange}
          style={{
            padding: '10px 12px',
            borderRadius: 6,
            border: '1px solid #9ca3af',
            background: '#ffffff',
          }}
        >
          {delitos.map((delito) => (
            <option key={delito.id} value={delito.id}>
              {delito.nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <span>Condiciones</span>
        {condiciones.map((condicion) => {
          const isChecked = selectedConditionIds.includes(condicion.id);
          const description = `${condicion.nombre} (${condicion.tipo})`;

          return (
            <label
              key={condicion.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleConditionChange(condicion.id)}
              />
              <span>{description}</span>
            </label>
          );
        })}
      </div>

      <div>
        <button
          type="button"
          onClick={handleCalculate}
          disabled={!selectedDelito}
          style={{
            padding: '12px 18px',
            borderRadius: 6,
            border: '1px solid #111827',
            background: '#111827',
            color: '#ffffff',
            cursor: !selectedDelito ? 'not-allowed' : 'pointer',
          }}
        >
          Calcular
        </button>
      </div>

      {resultado ? (
        <div
          style={{
            padding: 16,
            borderRadius: 6,
            border: '1px solid #d1d5db',
            background: '#ffffff',
            display: 'grid',
            gap: 8,
          }}
        >
          <strong>Resultado</strong>
          <span>{resultLabel}</span>
          <span>Pena minima: {resultado.pena_min} anos</span>
          <span>Pena maxima: {resultado.pena_max} anos</span>
        </div>
      ) : null}
    </section>
  );
}
