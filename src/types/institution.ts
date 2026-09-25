export interface ValorInstitucional {
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface InfoContacto {
  direccion: string;
  ciudad: string;
  telefono: string;
  lineaNacional: string;
  correo: string;
  horarios: {
    lunesViernes: string;
    sabados: string;
  };
}

export interface InfoInstitucional {
  nombreEntidad: string;
  eslogan: string;
  subtitulo: string;
  mision: string;
  vision: string;
  valores: ValorInstitucional[];
  contacto: InfoContacto;
  datosAcademicos: {
    institucion: string;
    programa: string;
    competencia: string;
    ficha: string;
    aprendiz: string;
    instructor: string;
    sede: string;
  };
}
