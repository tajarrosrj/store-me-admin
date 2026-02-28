/**
 * Format number as Philippine Peso (e.g. ₱1,234.56)
 */
export function formatPeso(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '₱0.00';
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
