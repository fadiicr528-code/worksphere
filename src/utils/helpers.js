export const money = (value) => new Intl.NumberFormat('en-PK', { style:'currency', currency:'PKR', maximumFractionDigits:0 }).format(Number(value || 0));
export const compactMoney = (value) => `PKR ${(Number(value || 0) / 1_000_000).toFixed(2)}M`;
export const dateLabel = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-PK', { day:'2-digit', month:'short', year:'numeric' }) : '—';
export const initials = (name='') => name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
export const netPay = (p) => Number(p.basic||0) + Number(p.allowance||0) + Number(p.bonus||0) - Number(p.deduction||0);

export function downloadCSV(filename, rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const escape = (v) => `"${String(v ?? '').replaceAll('"','""')}"`;
  const csv = [keys.map(escape).join(','), ...rows.map(r => keys.map(k => escape(r[k])).join(','))].join('\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
}
