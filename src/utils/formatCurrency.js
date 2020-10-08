export default function formatCurrency(num = 0) {
  return Intl.NumberFormat('th-TH').format(num);
}
