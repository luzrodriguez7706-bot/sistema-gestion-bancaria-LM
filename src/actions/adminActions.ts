"use server";

import { getRates, saveRates, getProducts, saveProducts, getMessages, updateProduct } from "@/lib/storage";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export interface AdminActionResult {
  success: boolean;
  message: string;
}

export async function updateCreditRate(
  creditoId: string,
  tasaEA: number,
  montoMinimo: number,
  montoMaximo: number,
  plazoMinMeses: number,
  plazoMaxMeses: number
): Promise<AdminActionResult> {
  try {
    const rates = await getRates();
    if (!rates.creditos[creditoId]) {
      return { success: false, message: "El producto de crédito no fue encontrado." };
    }

    rates.creditos[creditoId].tasaEA = tasaEA;
    rates.creditos[creditoId].montoMinimo = montoMinimo;
    rates.creditos[creditoId].montoMaximo = montoMaximo;
    rates.creditos[creditoId].plazoMinimoMeses = plazoMinMeses;
    rates.creditos[creditoId].plazoMaximoMeses = plazoMaxMeses;

    // Actualizar también en el catálogo de productos
    const products = await getProducts();
    const prod = products.find((p) => p.id === creditoId);
    if (prod) {
      prod.tasaReferencialEA = tasaEA;
      prod.montoMinimo = montoMinimo;
      prod.montoMaximo = montoMaximo;
      prod.plazoMinMeses = plazoMinMeses;
      prod.plazoMaxMeses = plazoMaxMeses;
      await saveProducts(products);
    }

    const saved = await saveRates(rates);
    if (!saved) return { success: false, message: "Error al guardar tasas en el disco local." };

    revalidatePath("/admin");
    revalidatePath("/simuladores/credito");
    revalidatePath("/productos");

    return { success: true, message: "Tasas y parámetros de crédito actualizados correctamente." };
  } catch (error) {
    return { success: false, message: `Error en la operación: ${error}` };
  }
}

export async function updateCdtTermRate(
  meses: number,
  nuevaTasaEA: number
): Promise<AdminActionResult> {
  try {
    const rates = await getRates();
    const plazoItem = rates.cdt.plazos.find((p) => p.meses === meses);
    if (!plazoItem) {
      return { success: false, message: "El plazo de CDT especificado no existe." };
    }

    plazoItem.tasaEA = nuevaTasaEA;

    // Actualizar también tasa referencial del producto CDT si es el plazo sugerido (12 meses)
    if (meses === 12) {
      const products = await getProducts();
      const cdtProduct = products.find((p) => p.id === "cdt");
      if (cdtProduct) {
        cdtProduct.tasaReferencialEA = nuevaTasaEA;
        await saveProducts(products);
      }
    }

    const saved = await saveRates(rates);
    if (!saved) return { success: false, message: "Error al guardar tasas de CDT." };

    revalidatePath("/admin");
    revalidatePath("/simuladores/cdt");
    revalidatePath("/productos");

    return { success: true, message: `Tasa de CDT para ${meses} meses actualizada a ${nuevaTasaEA}% EA.` };
  } catch (error) {
    return { success: false, message: `Error en la operación: ${error}` };
  }
}

export async function markMessageRead(messageId: string): Promise<AdminActionResult> {
  try {
    const messages = await getMessages();
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      msg.leido = true;
      const DATA_DIR = path.join(process.cwd(), "data");
      await fs.writeFile(path.join(DATA_DIR, "messages.json"), JSON.stringify(messages, null, 2), "utf-8");
      revalidatePath("/admin");
      return { success: true, message: "Mensaje marcado como leído." };
    }
    return { success: false, message: "Mensaje no encontrado." };
  } catch (error) {
    return { success: false, message: "Error al actualizar mensaje." };
  }
}
