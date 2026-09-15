import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3, Bell, Building2, CalendarDays, ClipboardCheck, FileText, Gauge, Menu,
  Search, Settings, UserRoundPlus, Users, WalletCards, X, Star, CalendarClock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const nav = [
  ['/', 'Dashboard', Gauge], ['/employees','Employees',Users], ['/employees/new','Add Employee',UserRoundPlus],
  ['/attendance','Attendance',ClipboardCheck], ['/leave','Leave',CalendarDays], ['/payroll','Salaries & Payroll',WalletCards],
  ['/payslips','Payslips',FileText], ['/departments','Departments',Building2], ['/performance','Performance',Star],
  ['/calendar','Calendar',CalendarClock], ['/reports','Reports',BarChart3], ['/settings','Settings',Settings],
];

export default function Layout({ children }) {
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState('');
  const navigate = useNavigate();
  const { employees } = useApp();
  const matches = query.trim().length > 1 ? employees.filter(e => `${e.name} ${e.id} ${e.department}`.toLowerCase().includes(query.toLowerCase())).slice(0,5) : [];
  const goEmployee = (id) => { setQuery(''); navigate(`/employees/${id}`); };
  return <div className="app-shell">
    {open && <button className="screen-overlay" aria-label="Close menu" onClick={()=>setOpen(false)} />}
    <aside className={`sidebar ${open?'open':''}`}>
      <div className="brand"><div className="brand-logo">W</div><div><strong>WorkSphere</strong><span>HR Management</span></div><button className="mobile-close" onClick={()=>setOpen(false)}><X size={18}/></button></div>
      <div className="sidebar-label">WORKSPACE</div>
      <nav>{nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`nav-item ${isActive?'active':''}`} onClick={()=>setOpen(false)}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-card"><div className="online-dot"/><div><strong>Demo mode</strong><span>Data saves in browser</span></div></div>
    </aside>
    <div className="main-shell">
      <header className="topbar">
        <button className="icon-button menu-button" onClick={()=>setOpen(true)}><Menu size={20}/></button>
        <div className="top-search">
          <Search size={17}/><input placeholder="Search employee, ID or department…" value={query} onChange={e=>setQuery(e.target.value)}/>
          {matches.length>0 && <div className="search-results">{matches.map(e=><button key={e.id} onClick={()=>goEmployee(e.id)}><span className="avatar tiny">{e.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><span><strong>{e.name}</strong><small>{e.id} · {e.department}</small></span></button>)}</div>}
        </div>
        <div className="top-actions"><button className="icon-button notification"><Bell size={18}/><i/></button><div className="top-profile"><span className="avatar">AD</span><div><strong>Admin User</strong><small>HR Administrator</small></div></div></div>
      </header>
      <main className="page-content">{children}</main>
    </div>
    <nav className="mobile-bottom">
      {[nav[0],nav[1],nav[3],nav[5],nav[10]].map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'}><Icon size={19}/><span>{label.replace('Salaries & ','')}</span></NavLink>)}
    </nav>
  </div>;
}
