import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Mail, MapPin, Pencil, Phone, Star, WalletCards } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dateLabel, money, netPay } from '../utils/helpers';
import { Avatar, InfoRow, Panel, Status } from '../components/UI';

export default function EmployeeDetails(){
  const {id}=useParams(); const {employees,attendance,leaves,payroll,reviews}=useApp(); const e=employees.find(x=>x.id===id); if(!e) return <Navigate to="/employees" replace/>;
  const pay=payroll.find(p=>p.employeeId===id); const review=reviews.find(r=>r.employeeId===id); const att=attendance.find(a=>a.employeeId===id); const empLeaves=leaves.filter(l=>l.employeeId===id);
  return <>
    <div className="detail-toolbar"><Link className="button ghost" to="/employees"><ArrowLeft size={16}/>Employees</Link><Link className="button primary" to={`/employees/${id}/edit`}><Pencil size={16}/>Edit Profile</Link></div>
    <section className="profile-hero panel"><div className="profile-main"><Avatar name={e.name}/><div><div className="title-line"><h1>{e.name}</h1><Status value={e.status}/></div><p>{e.designation} · {e.department}</p><div className="profile-contact"><span><Mail size={14}/>{e.email}</span><span><Phone size={14}/>{e.phone}</span><span><MapPin size={14}/>{e.location}</span></div></div></div><div className="profile-scores"><div><strong>{e.performance}%</strong><span>Performance</span></div><div><strong>{e.attendance}%</strong><span>Attendance</span></div><div><strong>{dateLabel(e.joinDate)}</strong><span>Joined</span></div></div></section>
    <div className="details-grid">
      <Panel title="Personal Information"><div className="info-list"><InfoRow label="Employee ID" value={e.id}/><InfoRow label="Gender" value={e.gender}/><InfoRow label="Date of birth" value={dateLabel(e.dob)}/><InfoRow label="Phone" value={e.phone}/><InfoRow label="Emergency contact" value={e.emergency}/><InfoRow label="Address" value={e.address}/></div></Panel>
      <Panel title="Employment Details"><div className="info-list"><InfoRow label="Department" value={e.department}/><InfoRow label="Designation" value={e.designation}/><InfoRow label="Employment" value={e.employment}/><InfoRow label="Location" value={e.location}/><InfoRow label="Joining date" value={dateLabel(e.joinDate)}/><InfoRow label="Status" value={e.status}/></div></Panel>
      <Panel title="Salary Overview" action={<WalletCards size={18}/>}><div className="salary-highlight"><span>Monthly net salary</span><strong>{pay?money(netPay(pay)):money(e.salary)}</strong></div>{pay&&<div className="info-list"><InfoRow label="Basic" value={money(pay.basic)}/><InfoRow label="Allowance" value={money(pay.allowance)}/><InfoRow label="Bonus" value={money(pay.bonus)}/><InfoRow label="Deduction" value={money(pay.deduction)}/></div>}</Panel>
      <Panel title="Performance" action={<Star size={18}/>}><div className="score-ring"><strong>{review?.score||e.performance}</strong><span>/ 100</span></div><p className="note-text">{review?.note||'No review note recorded.'}</p></Panel>
      <Panel title="Today’s Attendance" action={<CalendarDays size={18}/>}><div className="info-list"><InfoRow label="Status" value={att?.status}/><InfoRow label="Check in" value={att?.checkIn}/><InfoRow label="Check out" value={att?.checkOut}/><InfoRow label="Attendance rate" value={`${e.attendance}%`}/></div></Panel>
      <Panel title="Leave History"><div className="mini-list">{empLeaves.length?empLeaves.map(l=><div key={l.id}><div><strong>{l.type}</strong><span>{dateLabel(l.from)} – {dateLabel(l.to)}</span></div><Status value={l.status}/></div>):<p className="muted">No leave requests yet.</p>}</div></Panel>
    </div>
  </>;
}
