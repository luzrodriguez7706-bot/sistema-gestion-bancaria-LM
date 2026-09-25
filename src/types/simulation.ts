export interface ParametrosCredito {
  nombre: string;
  tasaEA: number;
  montoSugerido: number;
  plazoSugeridoMeses: number;
  plazoMinimoMeses: number;
  plazoMaximoMeses: number;
  montoMinimo: number;
  montoMaximo: number;
}

export interface PlazoCDT {
  meses: number;
  tasaEA: number;
}

export interface ConfiguracionTasas {
  creditos: Record<string, ParametrosCredito>;
  cdt: {
    montoSugerido: number;
    plazoSugeridoMeses: number;
    montoMinimo: number;
    plazos: PlazoCDT[];
  };
  ultimaActualizacion: string;
}

export interface SolicitudSimulacionCredito {
  tipoCreditoId: string;
  monto: number;
  plazoMeses: number;
  tasaEA: number;
}

export interface ResultadoSimulacionCredito {
  monto: number;
  plazoMeses: number;
  tasaEA: number;
  tasaMensualVencida: number;
  cuotaMensualEstimada: number;
  totalPagar: number;
  totalIntereses: number;
  tipoCreditoNombre: string;
}

export interface SolicitudSimulacionCDT {
  montoInversion: number;
  plazoMeses: number;
  tasaEA: number;
}

export interface ResultadoSimulacionCDT {
  montoInversion: number;
  plazoMeses: number;
  tasaEA: number;
  tasaPeriodo: number;
  rendimientoEstimado: number;
  valorTotalVencimiento: number;
}
