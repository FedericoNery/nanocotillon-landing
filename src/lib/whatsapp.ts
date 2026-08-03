export const WHATSAPP_NUMBER = "5491121879513";
export const MENSAJE_GENERICO = "Hola, quiero hacer una consulta sobre sus productos";

export function getWhatsappHref(mensaje: string = MENSAJE_GENERICO) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
