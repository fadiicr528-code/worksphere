import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dateLabel, downloadCSV, money } from '../utils/helpers';
import { Avatar, Empty, ExportButton, MobileDataList, PageHeader, SearchField, Status } from '../components/UI';

export default function Employees(){
  const { employees,setEmployees,departments } = useApp();
  const [q,setQ]=useState(''); const [dept,setDept]=useState('All'); const [status,setStatus]=useState('All');
  const rows=useMemo(()=>employees.filter(e=>{
    const text=`${e.name} ${e.id} ${e.email} ${e.designation}`.toLowerCase();
    return text.includes(q.toLowerCase())&&(dept==='All'||e.department===dept)&&(status==='All'||e.status===status);
  }),[employees,q,dept,status]);
  const remove=(id)=>{if(confirm('Delete this employee from the demo?')) setEmployees(x=>x.filter(e=>e.id!==id));};
  return <>
    <PageHeader title="Employees" subtitle="Manage employee records, roles, salary and employment status." actions={<><ExportButton onClick={()=>downloadCSV('employees.csv',rows)}/><Link className="button primary" to="/employees/new"><UserPlus size={16}/>Add Employee</Link></>}/>
    <section className="panel">
      <div className="toolbar"><SearchField value={q} onChange={setQ} placeholder="Search name, ID, email or role…"/><div className="filters"><select value={dept} onChange={e=>setDept(e.target.value)}><option>All</option>{departments.map(d=><option key={d.id}>{d.name}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Active</option><option>On Leave</option><option>Inactive</option></select></div></div>
      {rows.length===0?<Empty/>:<>
        <div className="desktop-table"><table><thead><tr><th>Employee</th><th>Department</th><th>Designation</th><th>Joining</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map(e=><tr key={e.id}><td><div className="employee-cell"><Avatar name={e.name}/><div><strong>{e.name}</strong><span>{e.id} · {e.email}</span></div></div></td><td>{e.department}</td><td>{e.designation}</td><td>{dateLabel(e.joinDate)}</td><td>{money(e.salary)}</td><td><Status value={e.status}/></td><td><div className="row-actions"><Link className="icon-button" title="View" to={`/employees/${e.id}`}><Eye size={16}/></Link><Link className="icon-button" title="Edit" to={`/employees/${e.id}/edit`}><Pencil size={16}/></Link><button className="icon-button danger" title="Delete" onClick={()=>remove(e.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
        <MobileDataList rows={rows} render={e=><div className="mobile-record" key={e.id}><div className="record-head"><div className="employee-cell"><Avatar name={e.name}/><div><strong>{e.name}</strong><span>{e.id} · {e.designation}</span></div></div><Status value={e.status}/></div><div className="record-grid"><span><small>Department</small>{e.department}</span><span><small>Salary</small>{money(e.salary)}</span><span><small>Location</small>{e.location}</span><span><small>Attendance</small>{e.attendance}%</span></div><div className="record-actions"><Link className="button secondary" to={`/employees/${e.id}`}>View Profile</Link><Link className="button ghost" to={`/employees/${e.id}/edit`}>Edit</Link></div></div>}/>
      </>}
      <div className="table-footer"><span>Showing {rows.length} of {employees.length} employees</span></div>
    </section>
  </>;
}
