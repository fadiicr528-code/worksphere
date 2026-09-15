import React from 'react';
import { ChevronRight, Download, Search } from 'lucide-react';
import { initials } from '../utils/helpers';

export function PageHeader({ title, subtitle, actions }) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}
export function StatCard({ icon:Icon, label, value, note, tone='blue' }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong>{note&&<small>{note}</small>}</div></div>;
}
export function Status({ value }) { const k=String(value).toLowerCase().replaceAll(' ','-'); return <span className={`status status-${k}`}>{value}</span>; }
export function Avatar({ name, small=false }) { return <span className={`avatar ${small?'small':''}`}>{initials(name)}</span>; }
export function Empty({ title='Nothing here', text='No matching records were found.' }) { return <div className="empty"><strong>{title}</strong><p>{text}</p></div>; }
export function SearchField({ value,onChange,placeholder='Search…' }) { return <label className="search-field"><Search size={16}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>; }
export function ExportButton({ onClick, label='Export CSV' }) { return <button className="button secondary" onClick={onClick}><Download size={16}/>{label}</button>; }
export function Panel({ title, subtitle, action, children, className='' }) { return <section className={`panel ${className}`}><div className="panel-head"><div><h3>{title}</h3>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>{children}</section>; }
export function InfoRow({ label, value }) { return <div className="info-row"><span>{label}</span><strong>{value||'—'}</strong></div>; }
export function MobileDataList({ rows, render }) { return <div className="mobile-data-list">{rows.map(render)}</div>; }
export function Breadcrumb({ items=[] }) { return <div className="breadcrumb">{items.map((i,idx)=><React.Fragment key={`${i}-${idx}`}><span>{i}</span>{idx<items.length-1&&<ChevronRight size={13}/>}</React.Fragment>)}</div>; }
