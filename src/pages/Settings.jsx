import React, { useState } from 'react';
import { Building2, Clock3, Database, Save, WalletCards } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/UI';

export default function SettingsPage(){
  const {settings,setSettings,resetDemo}=useApp(); const [form,setForm]=useState({...settings}); const [saved,setSaved]=useState(false); const set=(k,v)=>setForm(f=>({...f,[k]:v})); const save=()=>{setSettings(form);setSaved(true);setTimeout(()=>setSaved(false),1800)};
  return <>
    <PageHeader title="Settings" subtitle="Configure company, work schedule, payroll and demo data."/>
    <div className="settings-stack">
      <section className="panel settings-section"><div className="settings-heading"><Building2/><div><h3>Company Profile</h3><p>Basic information shown across the application.</p></div></div><div className="form-grid"><Field label="Company name"><input value={form.company} onChange={e=>set('company',e.target.value)}/></Field><Field label="HR email"><input value={form.email} onChange={e=>set('email',e.target.value)}/></Field><Field label="Phone"><input value={form.phone} onChange={e=>set('phone',e.target.value)}/></Field><Field label="Address" full><input value={form.address} onChange={e=>set('address',e.target.value)}/></Field></div></section>
      <section className="panel settings-section"><div className="settings-heading"><Clock3/><div><h3>Work Schedule & Leave</h3><p>Demo attendance and leave policy values.</p></div></div><div className="form-grid"><Field label="Work starts"><input type="time" value={form.workStart} onChange={e=>set('workStart',e.target.value)}/></Field><Field label="Work ends"><input type="time" value={form.workEnd} onChange={e=>set('workEnd',e.target.value)}/></Field><Field label="Weekend"><input value={form.weekend} onChange={e=>set('weekend',e.target.value)}/></Field><Field label="Annual leave days"><input type="number" value={form.leaveAnnual} onChange={e=>set('leaveAnnual',e.target.value)}/></Field><Field label="Sick leave days"><input type="number" value={form.leaveSick} onChange={e=>set('leaveSick',e.target.value)}/></Field></div></section>
      <section className="panel settings-section"><div className="settings-heading"><WalletCards/><div><h3>Payroll Settings</h3><p>Basic salary cycle configuration.</p></div></div><div className="form-grid"><Field label="Currency"><select value={form.currency} onChange={e=>set('currency',e.target.value)}><option>PKR</option><option>USD</option><option>AFN</option></select></Field><Field label="Payroll day"><input type="number" min="1" max="28" value={form.payrollDay} onChange={e=>set('payrollDay',e.target.value)}/></Field></div></section>
      <section className="panel settings-section danger-zone"><div className="settings-heading"><Database/><div><h3>Demo Data</h3><p>Restore the original sample records if you want to restart the project demonstration.</p></div></div><button className="button danger-button" onClick={()=>confirm('Reset all WorkSphere local demo data?')&&resetDemo()}>Reset Demo Data</button></section>
      <div className="settings-save"><span className={saved?'saved show':'saved'}>Settings saved successfully.</span><button className="button primary" onClick={save}><Save size={16}/>Save Settings</button></div>
    </div>
  </>;
}
function Field({label,children,full=false}){return <label className={`field ${full?'full':''}`}><span>{label}</span>{children}</label>}
