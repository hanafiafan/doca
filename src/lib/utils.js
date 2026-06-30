export function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
