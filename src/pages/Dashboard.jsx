import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarDays, Clock3, UserCheck, Users, WalletCards } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { monthlyAttendance, payrollTrend } from '../data/seed';
import { compactMoney, money, netPay } from '../utils/helpers';
import { Avatar, PageHeader, Panel, StatCard, Status } from '../components/UI';

export default function Dashboard(){
  const { employees, attendance, leaves, payroll, events } = useApp();
  const stats = useMemo(()=>({
    total:employees.length,
    present:attendance.filter(a=>a.status==='Present').length,
    absent:attendance.filter(a=>a.status==='Absent').length,
    pending:leaves.filter(l=>l.status==='Pending').length,
    payroll:payroll.reduce((s,p)=>s+netPay(p),0)
  }),[employees,attendance,leaves,payroll]);
  const dept = useMemo(()=>Object.entries(employees.reduce((a,e)=>({...a,[e.department]:(a[e.department]||0)+1}),{})).map(([name,value])=>({name,value})),[employees]);
  const recent = [...employees].slice(-5).reverse();
  return <>
    <PageHeader title="Dashboard" subtitle="A clear overview of your people, attendance and payroll." actions={<Link className="button primary" to="/employees/new">+ Add Employee</Link>}/>
    <div className="stats-grid five">
      <StatCard icon={Users} label="Total Employees" value={stats.total} note="Across all departments"/>
      <StatCard icon={UserCheck} label="Present Today" value={stats.present} note={`${stats.absent} absent today`} tone="green"/>
      <StatCard icon={CalendarDays} label="Pending Leave" value={stats.pending} note="Needs HR review" tone="orange"/>
      <StatCard icon={WalletCards} label="Monthly Payroll" value={compactMoney(stats.payroll)} note="September 2026" tone="purple"/>
      <StatCard icon={Clock3} label="Avg Attendance" value={`${Math.round(employees.reduce((s,e)=>s+e.attendance,0)/employees.length)}%`} note="Company average" tone="teal"/>
    </div>
    <div className="dashboard-grid">
      <Panel title="Attendance Overview" subtitle="Six-month attendance trend">
        <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthlyAttendance}><defs><linearGradient id="att" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={.28}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false} domain={[80,100]}/><Tooltip/><Area type="monotone" dataKey="present" stroke="#2563eb" fill="url(#att)" strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div>
      </Panel>
      <Panel title="Employees by Department" subtitle="Current workforce distribution">
        <div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={dept}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:9}} interval={0}/><YAxis axisLine={false} tickLine={false} allowDecimals={false}/><Tooltip/><Bar dataKey="value" fill="#7c3aed" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div>
      </Panel>
      <Panel title="Payroll Trend" subtitle="Monthly payroll, PKR millions">
        <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={payrollTrend}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip formatter={v=>[`PKR ${v}M`,'Payroll']}/><Area type="monotone" dataKey="payroll" stroke="#0f766e" fill="#ccfbf1" strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div>
      </Panel>
    </div>
    <div className="dashboard-grid lower">
      <Panel title="Recent Employees" subtitle="Latest people added" action={<Link className="text-link" to="/employees">View all</Link>}>
        <div className="people-list">{recent.map(e=><Link to={`/employees/${e.id}`} className="person-row" key={e.id}><Avatar name={e.name}/><div className="grow"><strong>{e.name}</strong><span>{e.designation} · {e.department}</span></div><Status value={e.status}/></Link>)}</div>
      </Panel>
      <Panel title="Upcoming Events" subtitle="Important HR dates" action={<Link className="text-link" to="/calendar">Calendar</Link>}>
        <div className="event-list">{events.slice(0,4).map(ev=><div className="event-row" key={ev.id}><div className="date-box"><strong>{new Date(ev.date+'T00:00:00').getDate()}</strong><span>{new Date(ev.date+'T00:00:00').toLocaleDateString('en',{month:'short'})}</span></div><div><strong>{ev.title}</strong><span>{ev.time} · {ev.audience}</span></div></div>)}</div>
      </Panel>
      <Panel title="Payroll Summary" subtitle="Current salary cycle">
        <div className="summary-list"><div><span>Gross salary</span><strong>{money(payroll.reduce((s,p)=>s+p.basic+p.allowance+p.bonus,0))}</strong></div><div><span>Total deductions</span><strong>{money(payroll.reduce((s,p)=>s+p.deduction,0))}</strong></div><div><span>Net payroll</span><strong>{money(stats.payroll)}</strong></div><div><span>Pending salaries</span><strong>{payroll.filter(p=>p.status==='Pending').length}</strong></div></div>
      </Panel>
    </div>
  </>;
}
