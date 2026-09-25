import fs from "fs/promises";
import path from "path";
import { ProductoFinanciero } from "@/types/product";
import { ConfiguracionTasas } from "@/types/simulation";
import { InfoInstitucional } from "@/types/institution";
import { MensajeContacto } from "@/types/contact";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Lee un archivo JSON de forma segura.
 */
async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error leyendo archivo ${filename}:`, error);
    return defaultValue;
  }
}

/**
 * Escribe datos en un archivo JSON de forma atómica y formateada.
 */
async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error escribiendo en archivo ${filename}:`, error);
    return false;
  }
}

// ================= Métodos de Productos =================
export async function getProducts(): Promise<ProductoFinanciero[]> {
  return await readJsonFile<ProductoFinanciero[]>("products.json", []);
}

export async function getProductById(id: string): Promise<ProductoFinanciero | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function saveProducts(products: ProductoFinanciero[]): Promise<boolean> {
  return await writeJsonFile("products.json", products);
}

export async function updateProduct(updated: ProductoFinanciero): Promise<boolean> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === updated.id);
  if (index === -1) return false;
  products[index] = updated;
  return await saveProducts(products);
}

// ================= Métodos de Tasas y Parámetros =================
export async function getRates(): Promise<ConfiguracionTasas> {
  return await readJsonFile<ConfiguracionTasas>("rates.json", {
    creditos: {},
    cdt: { montoSugerido: 10000000, plazoSugeridoMeses: 12, montoMinimo: 500000, plazos: [] },
    ultimaActualizacion: new Date().toISOString(),
  });
}

export async function saveRates(rates: ConfiguracionTasas): Promise<boolean> {
  rates.ultimaActualizacion = new Date().toISOString();
  return await writeJsonFile("rates.json", rates);
}

// ================= Métodos Institucionales =================
export async function getInstitutionInfo(): Promise<InfoInstitucional> {
  return await readJsonFile<InfoInstitucional>("institution.json", {
    nombreEntidad: "Finanzas Contigo",
    eslogan: "",
    subtitulo: "",
    mision: "",
    vision: "",
    valores: [],
    contacto: {
      direccion: "",
      ciudad: "",
      telefono: "",
      lineaNacional: "",
      correo: "",
      horarios: { lunesViernes: "", sabados: "" },
    },
    datosAcademicos: {
      institucion: "",
      programa: "",
      competencia: "",
      ficha: "",
      aprendiz: "",
      instructor: "",
      sede: "",
    },
  });
}

export async function saveInstitutionInfo(info: InfoInstitucional): Promise<boolean> {
  return await writeJsonFile("institution.json", info);
}

// ================= Métodos de Mensajes de Contacto =================
export async function getMessages(): Promise<MensajeContacto[]> {
  return await readJsonFile<MensajeContacto[]>("messages.json", []);
}

export async function addMessage(msg: Omit<MensajeContacto, "id" | "fecha">): Promise<MensajeContacto | null> {
  const messages = await getMessages();
  const newMessage: MensajeContacto = {
    ...msg,
    id: `msg-${Date.now()}`,
    fecha: new Date().toISOString(),
    leido: false,
  };
  messages.unshift(newMessage);
  const ok = await writeJsonFile("messages.json", messages);
  return ok ? newMessage : null;
}
