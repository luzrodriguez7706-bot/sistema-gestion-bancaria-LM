"use server";

import { addMessage } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export interface ContactActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function submitContactMessage(formData: FormData): Promise<ContactActionResult> {
  const nombreCompleto = (formData.get("nombreCompleto") as string)?.trim();
  const correo = (formData.get("correo") as string)?.trim();
  const telefono = (formData.get("telefono") as string)?.trim();
  const asunto = (formData.get("asunto") as string)?.trim();
  const mensaje = (formData.get("mensaje") as string)?.trim();

  // Validaciones
  if (!nombreCompleto || !correo || !telefono || !asunto || !mensaje) {
    return {
      success: false,
      message: "Todos los campos del formulario son obligatorios.",
    };
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return {
      success: false,
      message: "Por favor ingresa un correo electrónico válido.",
    };
  }

  const nuevoMensaje = await addMessage({
    nombreCompleto,
    correo,
    telefono,
    asunto,
    mensaje,
  });

  if (!nuevoMensaje) {
    return {
      success: false,
      message: "No fue posible almacenar el mensaje en el sistema local. Intente nuevamente.",
    };
  }

  revalidatePath("/contacto");
  revalidatePath("/admin");

  return {
    success: true,
    message: "¡Tu mensaje ha sido enviado exitosamente! Un asesor se pondrá en contacto pronto.",
    data: nuevoMensaje,
  };
}
