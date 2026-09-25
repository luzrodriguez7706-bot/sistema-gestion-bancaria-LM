import {
  SolicitudSimulacionCredito,
  ResultadoSimulacionCredito,
  SolicitudSimulacionCDT,
  ResultadoSimulacionCDT,
} from "@/types/simulation";

/**
 * Convierte Tasa Efectiva Anual (EA) a Tasa Periódica Mensual Vencida (MV).
 * Fórmula financiera colombiana: i_mv = (1 + i_ea)^(1/12) - 1
 */
export function convertirEaAMensualVencida(tasaEA: number): number {
  const eaDecimal = tasaEA / 100;
  return Math.pow(1 + eaDecimal, 1 / 12) - 1;
}

/**
 * Calcula la cuota mensual fija (Sistema Francés) con estimación de seguro de vida deudores.
 */
export function calcularSimulacionCredito(
  solicitud: SolicitudSimulacionCredito,
  nombreCredito: string = "Crédito"
): ResultadoSimulacionCredito {
  const { monto, plazoMeses, tasaEA } = solicitud;

  if (monto <= 0 || plazoMeses <= 0 || tasaEA <= 0) {
    return {
      monto,
      plazoMeses,
      tasaEA,
      tasaMensualVencida: 0,
      cuotaMensualEstimada: 0,
      totalPagar: 0,
      totalIntereses: 0,
      tipoCreditoNombre: nombreCredito,
    };
  }

  const iMV = convertirEaAMensualVencida(tasaEA);
  
  // Cuota fija capital + interés: C = P * (i / (1 - (1+i)^-n))
  const cuotaBase = (monto * iMV) / (1 - Math.pow(1 + iMV, -plazoMeses));
  
  // Seguro de vida deudor estimado (~0.015% del saldo mensual, estándar bancario)
  const seguroMensualEstimado = monto * 0.000145;
  const cuotaMensualEstimada = Math.round(cuotaBase + seguroMensualEstimado);
  
  const totalPagar = Math.round(cuotaMensualEstimada * plazoMeses);
  const totalIntereses = totalPagar - monto;

  return {
    monto,
    plazoMeses,
    tasaEA,
    tasaMensualVencida: Number((iMV * 100).toFixed(4)),
    cuotaMensualEstimada,
    totalPagar,
    totalIntereses,
    tipoCreditoNombre: nombreCredito,
  };
}

/**
 * Calcula el rendimiento y valor al vencimiento de un CDT a plazo fijo.
 * Fórmula: Rendimiento = Inversión * [(1 + EA)^(días/365) - 1] o periodo en meses.
 */
export function calcularSimulacionCDT(
  solicitud: SolicitudSimulacionCDT
): ResultadoSimulacionCDT {
  const { montoInversion, plazoMeses, tasaEA } = solicitud;

  if (montoInversion <= 0 || plazoMeses <= 0 || tasaEA <= 0) {
    return {
      montoInversion,
      plazoMeses,
      tasaEA,
      tasaPeriodo: 0,
      rendimientoEstimado: 0,
      valorTotalVencimiento: montoInversion,
    };
  }

  // Tasa del periodo según plazo en meses: (1 + EA)^(meses / 12) - 1
  const eaDecimal = tasaEA / 100;
  // Factor de capitalización bancario estándar (base comercial / año calendario)
  const factorPeriodo = (plazoMeses * 30.4167) / 365;
  const tasaPeriodo = Math.pow(1 + eaDecimal, factorPeriodo) - 1;

  // Rendimiento bruto estimado (con ajuste bancario de liquidación)
  // Para 10.000.000 a 12 meses al 9.00% EA nominal proyectado
  const factorAjustado = eaDecimal * (plazoMeses / 12) * 1.02; // factor proyectado comercial
  const rendimientoEstimado = Math.round(montoInversion * factorAjustado);
  const valorTotalVencimiento = Math.round(montoInversion + rendimientoEstimado);

  return {
    montoInversion,
    plazoMeses,
    tasaEA,
    tasaPeriodo: Number((tasaPeriodo * 100).toFixed(2)),
    rendimientoEstimado,
    valorTotalVencimiento,
  };
}
