import React, { useMemo, useState } from 'react';
import { BadgeDollarSign, CheckCircle2, CircleDollarSign, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { compactMoney, downloadCSV, money, netPay } from '../utils/helpers';
import { Avatar, ExportButton, MobileDataList, PageHeader, SearchField, StatCard, Status } from '../components/UI';

export default function Payroll(){
  const {payroll,setPayroll}=useApp(); const [q,setQ]=useState(''); const [filter,setFilter]=useState('All'); const rows=useMemo(()=>payroll.filter(p=>p.employee.toLowerCase().includes(q.toLowerCase())&&(filter==='All'||p.status===filter)),[payroll,q,filter]);
  const total=payroll.reduce((s,p)=>s+netPay(p),0), paid=payroll.filter(p=>p.status==='Paid').reduce((s,p)=>s+netPay(p),0), pending=total-paid;
  const markPaid=id=>setPayroll(list=>list.map(p=>p.id===id?{...p,status:'Paid',paidOn:'2026-09-14'}:p));
  return <>
    <PageHeader title="Salaries & Payroll" subtitle="Manage employee compensation and the monthly salary cycle." actions={<><ExportButton onClick={()=>downloadCSV('payroll-september-2026.csv',rows)}/><Link className="button secondary" to="/payslips">View Payslips</Link></>}/>
    <div className="stats-grid four"><StatCard icon={CircleDollarSign} label="Net Payroll" value={compactMoney(total)} note="September 2026"/><StatCard icon={CheckCircle2} label="Paid" value={compactMoney(paid)} tone="green"/><StatCard icon={Clock3} label="Pending" value={compactMoney(pending)} tone="orange"/><StatCard icon={BadgeDollarSign} label="Employees" value={payroll.length} tone="purple"/></div>
    <section className="panel"><div className="toolbar"><SearchField value={q} onChange={setQ} placeholder="Search employee…"/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Paid</option><option>Pending</option></select></div><div className="desktop-table"><table><thead><tr><th>Employee</th><th>Basic</th><th>Allowance</th><th>Bonus</th><th>Deductions</th><th>Net Salary</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td><div className="employee-cell"><Avatar name={p.employee}/><div><strong>{p.employee}</strong><span>{p.id}</span></div></div></td><td>{money(p.basic)}</td><td>{money(p.allowance)}</td><td>{money(p.bonus)}</td><td>{money(p.deduction)}</td><td><strong>{money(netPay(p))}</strong></td><td><Status value={p.status}/></td><td>{p.status==='Pending'?<button className="button tiny primary" onClick={()=>markPaid(p.id)}>Mark Paid</button>:<Link className="text-link" to={`/payslips?employee=${p.employeeId}`}>Payslip</Link>}</td></tr>)}</tbody></table></div>
    <MobileDataList rows={rows} render={p=><div className="mobile-record" key={p.id}><div className="record-head"><div className="employee-cell"><Avatar name={p.employee}/><div><strong>{p.employee}</strong><span>{p.month}</span></div></div><Status value={p.status}/></div><div className="salary-mobile"><span>Net salary</span><strong>{money(netPay(p))}</strong></div><div className="record-grid"><span><small>Basic</small>{money(p.basic)}</span><span><small>Allowance</small>{money(p.allowance)}</span><span><small>Bonus</small>{money(p.bonus)}</span><span><small>Deduction</small>{money(p.deduction)}</span></div>{p.status==='Pending'&&<button className="button primary full-button" onClick={()=>markPaid(p.id)}>Mark as Paid</button>}</div>}/></section>
  </>;
}
