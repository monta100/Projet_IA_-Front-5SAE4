// Utilitaires liés aux dates pour synchroniser format backend (Date -> ISO String YYYY-MM-DD)
export function toIsoDateOnly(d: Date | string | null | undefined): string | undefined {
  if (!d) return undefined;
  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) return undefined;
  return date.toISOString().substring(0, 10); // YYYY-MM-DD
}

export function fromIsoDateOnly(iso: string | null | undefined): Date | undefined {
  if (!iso) return undefined;
  // Ajout milieu journée pour éviter décalages fuseau
  const date = new Date(`${iso}T12:00:00`);
  return isNaN(date.getTime()) ? undefined : date;
}
