import React, { useState } from 'react';
import { Building2, Plus, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { money } from '../utils/helpers';
import Modal from '../components/Modal';
import { PageHeader, StatCard } from '../components/UI';

export default function Departments(){
  const {departments,setDepartments,employees}=useApp(); const [open,setOpen]=useState(false); const [form,setForm]=useState({name:'',manager:'',location:'',budget:1000000});
  const submit=()=>{if(!form.name.trim())return alert('Department name is required.'); setDepartments(d=>[...d,{...form,budget:Number(form.budget),id:`D-${String(d.length+1).padStart(2,'0')}`}]); setOpen(false);};
  return <>
    <PageHeader title="Departments" subtitle="View teams, managers, headcount and departmental budgets." actions={<button className="button primary" onClick={()=>setOpen(true)}><Plus size={16}/>Add Department</button>}/>
    <div className="stats-grid three"><StatCard icon={Building2} label="Departments" value={departments.length}/><StatCard icon={Users} label="Employees" value={employees.length} tone="green"/><StatCard icon={Building2} label="Largest Team" value={departments.map(d=>({name:d.name,count:employees.filter(e=>e.department===d.name).length})).sort((a,b)=>b.count-a.count)[0]?.name||'—'} tone="purple"/></div>
    <div className="department-grid">{departments.map(d=>{const team=employees.filter(e=>e.department===d.name);return <section className="department-card panel" key={d.id}><div className="dept-icon"><Building2 size={20}/></div><div className="dept-top"><div><h3>{d.name}</h3><p>{d.id} · {d.location}</p></div><span className="count-pill">{team.length} people</span></div><div className="dept-info"><span><small>Manager</small><strong>{d.manager||'Not assigned'}</strong></span><span><small>Annual Budget</small><strong>{money(d.budget)}</strong></span></div><div className="avatar-stack">{team.slice(0,5).map(e=><span key={e.id} title={e.name}>{e.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span>)}{team.length>5&&<span>+{team.length-5}</span>}</div></section>})}</div>
    <Modal open={open} onClose={()=>setOpen(false)} title="Add Department" footer={<><button className="button secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="button primary" onClick={submit}>Add Department</button></>}><div className="form-grid"><label className="field full"><span>Department name</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label className="field"><span>Manager</span><input value={form.manager} onChange={e=>setForm({...form,manager:e.target.value})}/></label><label className="field"><span>Location</span><input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label><label className="field full"><span>Annual budget (PKR)</span><input type="number" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/></label></div></Modal>
  </>;
}
