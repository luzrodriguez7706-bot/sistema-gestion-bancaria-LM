export interface MensajeContacto {
  id: string;
  fecha: string;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  leido?: boolean;
}
