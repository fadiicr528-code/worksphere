import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart3, Download, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadCSV, netPay } from '../utils/helpers';
import { PageHeader, Panel, StatCard } from '../components/UI';

const colors=['#2563eb','#7c3aed','#059669','#ea580c','#0891b2','#be123c'];
export default function Reports(){
  const {employees,attendance,leaves,payroll}=useApp();
  const dept=useMemo(()=>Object.entries(employees.reduce((a,e)=>({...a,[e.department]:(a[e.department]||0)+1}),{})).map(([name,value])=>({name,value})),[employees]);
  const status=useMemo(()=>['Present','Late','Absent','On Leave'].map(name=>({name,value:attendance.filter(a=>a.status===name).length})),[attendance]);
  const salary=useMemo(()=>dept.map(d=>({name:d.name,salary:Math.round(employees.filter(e=>e.department===d.name).reduce((s,e)=>s+e.salary,0)/1000)})),[dept,employees]);
  const exports=[['Employee Master Report',()=>downloadCSV('employee-master-report.csv',employees)],['Attendance Report',()=>downloadCSV('attendance-report.csv',attendance)],['Leave Report',()=>downloadCSV('leave-report.csv',leaves)],['Payroll Report',()=>downloadCSV('payroll-report.csv',payroll.map(p=>({...p,net:netPay(p)})))]];
  return <>
    <PageHeader title="Reports & Analytics" subtitle="Workforce insights with downloadable HR reports."/>
    <div className="stats-grid three"><StatCard icon={TrendingUp} label="Average Performance" value={`${Math.round(employees.reduce((s,e)=>s+e.performance,0)/employees.length)}%`} tone="green"/><StatCard icon={PieIcon} label="Attendance Rate" value={`${Math.round(employees.reduce((s,e)=>s+e.attendance,0)/employees.length)}%`} tone="purple"/><StatCard icon={BarChart3} label="Total Reports" value={exports.length}/></div>
    <div className="report-grid"><Panel title="Headcount by Department" subtitle="Employee distribution"><div className="chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={dept} dataKey="value" nameKey="name" innerRadius={58} outerRadius={90} paddingAngle={3}>{dept.map((x,i)=><Cell key={x.name} fill={colors[i%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="legend-grid">{dept.map((d,i)=><span key={d.name}><i style={{background:colors[i%colors.length]}}/>{d.name}<strong>{d.value}</strong></span>)}</div></Panel>
    <Panel title="Department Salary Cost" subtitle="Basic monthly salary · PKR thousands"><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={salary}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{fontSize:9}} axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip formatter={v=>[`PKR ${v}K`,'Salary']}/><Bar dataKey="salary" fill="#2563eb" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></Panel>
    <Panel title="Today’s Attendance" subtitle="Status distribution"><div className="chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={status} dataKey="value" nameKey="name" outerRadius={90}>{status.map((x,i)=><Cell key={x.name} fill={colors[(i+2)%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div></Panel></div>
    <section className="panel report-downloads"><div className="panel-head"><div><h3>Download Reports</h3><p>CSV files can be opened directly in Excel.</p></div></div><div className="download-grid">{exports.map(([name,fn])=><button key={name} onClick={fn}><span className="download-icon"><Download size={18}/></span><span><strong>{name}</strong><small>CSV · generated from current demo data</small></span><Download size={16}/></button>)}</div></section>
  </>;
}
