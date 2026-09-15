import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/UI';

const blank={name:'',email:'',phone:'',department:'Engineering',designation:'',joinDate:'2026-09-14',salary:50000,status:'Active',employment:'Full Time',location:'Abbottabad',performance:80,attendance:100,gender:'Male',dob:'',emergency:'',address:''};
export default function EmployeeForm(){
  const { id }=useParams(); const navigate=useNavigate(); const { employees,setEmployees,departments }=useApp();
  const existing=useMemo(()=>employees.find(e=>e.id===id),[employees,id]); const [form,setForm]=useState(existing||blank);
  const edit=Boolean(existing); const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=e=>{e.preventDefault(); if(!form.name.trim()||!form.email.trim()||!form.designation.trim()) return alert('Please complete the required fields.');
    const record={...form,id:edit?existing.id:`EMP-${1000+employees.length+1}`,salary:Number(form.salary),performance:Number(form.performance),attendance:Number(form.attendance)};
    setEmployees(list=>edit?list.map(x=>x.id===record.id?record:x):[...list,record]); navigate(`/employees/${record.id}`);
  };
  return <>
    <PageHeader title={edit?'Edit Employee':'Add Employee'} subtitle={edit?'Update employee personal and job information.':'Create a complete employee record for your organization.'}/>
    <form className="form-page" onSubmit={submit}>
      <section className="panel form-section"><div className="section-title"><h3>Personal Information</h3><p>Basic identity and contact information.</p></div><div className="form-grid">
        <Field label="Full name *"><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Ali Khan"/></Field>
        <Field label="Email address *"><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="employee@company.com"/></Field>
        <Field label="Phone"><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+92 300 0000000"/></Field>
        <Field label="Gender"><select value={form.gender} onChange={e=>set('gender',e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></Field>
        <Field label="Date of birth"><input type="date" value={form.dob} onChange={e=>set('dob',e.target.value)}/></Field>
        <Field label="Emergency contact"><input value={form.emergency} onChange={e=>set('emergency',e.target.value)} placeholder="Name · phone"/></Field>
        <Field label="Address" full><textarea rows="3" value={form.address} onChange={e=>set('address',e.target.value)} placeholder="Employee address"/></Field>
      </div></section>
      <section className="panel form-section"><div className="section-title"><h3>Employment Information</h3><p>Position, department, location and employment type.</p></div><div className="form-grid">
        <Field label="Department"><select value={form.department} onChange={e=>set('department',e.target.value)}>{departments.map(d=><option key={d.id}>{d.name}</option>)}</select></Field>
        <Field label="Designation *"><input value={form.designation} onChange={e=>set('designation',e.target.value)} placeholder="e.g. React Developer"/></Field>
        <Field label="Joining date"><input type="date" value={form.joinDate} onChange={e=>set('joinDate',e.target.value)}/></Field>
        <Field label="Employment type"><select value={form.employment} onChange={e=>set('employment',e.target.value)}><option>Full Time</option><option>Part Time</option><option>Contract</option><option>Intern</option></select></Field>
        <Field label="Work location"><input value={form.location} onChange={e=>set('location',e.target.value)}/></Field>
        <Field label="Status"><select value={form.status} onChange={e=>set('status',e.target.value)}><option>Active</option><option>On Leave</option><option>Inactive</option></select></Field>
      </div></section>
      <section className="panel form-section"><div className="section-title"><h3>Salary & Performance</h3><p>Basic payroll and performance information for the demo.</p></div><div className="form-grid">
        <Field label="Basic salary (PKR)"><input type="number" min="0" value={form.salary} onChange={e=>set('salary',e.target.value)}/></Field>
        <Field label="Performance score"><input type="number" min="0" max="100" value={form.performance} onChange={e=>set('performance',e.target.value)}/></Field>
        <Field label="Attendance %"><input type="number" min="0" max="100" value={form.attendance} onChange={e=>set('attendance',e.target.value)}/></Field>
      </div></section>
      <div className="form-actions"><button type="button" className="button secondary" onClick={()=>navigate(-1)}>Cancel</button><button className="button primary"><Save size={16}/>{edit?'Save Changes':'Create Employee'}</button></div>
    </form>
  </>;
}
function Field({label,children,full=false}){return <label className={`field ${full?'full':''}`}><span>{label}</span>{children}</label>}
