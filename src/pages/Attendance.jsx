import React, { useMemo, useState } from 'react';
import { CalendarCheck, Clock3, UserCheck, UserX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCSV } from '../utils/helpers';
import { Avatar, ExportButton, MobileDataList, PageHeader, SearchField, StatCard, Status } from '../components/UI';

export default function Attendance(){
  const { attendance,setAttendance }=useApp(); const [q,setQ]=useState(''); const [status,setStatus]=useState('All');
  const rows=useMemo(()=>attendance.filter(a=>(`${a.employee} ${a.department}`).toLowerCase().includes(q.toLowerCase())&&(status==='All'||a.status===status)),[attendance,q,status]);
  const count=s=>attendance.filter(a=>a.status===s).length;
  const change=(id,value)=>setAttendance(list=>list.map(a=>a.id===id?{...a,status:value,checkIn:value==='Present'?'09:00 AM':a.checkIn,checkOut:value==='Present'?'05:00 PM':a.checkOut}:a));
  return <>
    <PageHeader title="Attendance" subtitle="Track today’s attendance, check-in and work status." actions={<ExportButton onClick={()=>downloadCSV('attendance.csv',rows)}/>}/>
    <div className="stats-grid four"><StatCard icon={UserCheck} label="Present" value={count('Present')} tone="green"/><StatCard icon={Clock3} label="Late" value={count('Late')} tone="orange"/><StatCard icon={UserX} label="Absent" value={count('Absent')} tone="red"/><StatCard icon={CalendarCheck} label="On Leave" value={count('On Leave')} tone="purple"/></div>
    <section className="panel"><div className="toolbar"><SearchField value={q} onChange={setQ} placeholder="Search employee or department…"/><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Present</option><option>Late</option><option>Absent</option><option>On Leave</option><option>Work From Home</option></select></div>
      <div className="desktop-table"><table><thead><tr><th>Employee</th><th>Department</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Update</th></tr></thead><tbody>{rows.map(a=><tr key={a.id}><td><div className="employee-cell"><Avatar name={a.employee}/><strong>{a.employee}</strong></div></td><td>{a.department}</td><td>{a.checkIn}</td><td>{a.checkOut}</td><td><Status value={a.status}/></td><td><select className="compact-select" value={a.status} onChange={e=>change(a.id,e.target.value)}><option>Present</option><option>Late</option><option>Absent</option><option>On Leave</option><option>Work From Home</option></select></td></tr>)}</tbody></table></div>
      <MobileDataList rows={rows} render={a=><div className="mobile-record" key={a.id}><div className="record-head"><div className="employee-cell"><Avatar name={a.employee}/><div><strong>{a.employee}</strong><span>{a.department}</span></div></div><Status value={a.status}/></div><div className="record-grid"><span><small>Check in</small>{a.checkIn}</span><span><small>Check out</small>{a.checkOut}</span></div><select className="full-select" value={a.status} onChange={e=>change(a.id,e.target.value)}><option>Present</option><option>Late</option><option>Absent</option><option>On Leave</option><option>Work From Home</option></select></div>}/>
    </section>
  </>;
}
