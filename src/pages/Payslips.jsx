import React, { useEffect, useMemo, useState } from 'react';
import { Printer } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dateLabel, money, netPay } from '../utils/helpers';
import { PageHeader, Status } from '../components/UI';

export default function Payslips(){
  const {employees,payroll,settings}=useApp(); const [params]=useSearchParams(); const initial=params.get('employee')||payroll[0]?.employeeId; const [employeeId,setEmployeeId]=useState(initial);
  useEffect(()=>{if(initial)setEmployeeId(initial)},[initial]);
  const pay=useMemo(()=>payroll.find(p=>p.employeeId===employeeId),[payroll,employeeId]); const emp=employees.find(e=>e.id===employeeId);
  return <>
    <PageHeader title="Payslips" subtitle="Generate and print professional employee salary slips." actions={<button className="button primary" onClick={()=>window.print()}><Printer size={16}/>Print Payslip</button>}/>
    <div className="payslip-controls panel"><label className="field"><span>Select employee</span><select value={employeeId} onChange={e=>setEmployeeId(e.target.value)}>{payroll.map(p=><option key={p.id} value={p.employeeId}>{p.employee} · {p.employeeId}</option>)}</select></label><div><span className="muted">Salary month</span><strong>{pay?.month||'—'}</strong></div></div>
    {pay&&emp&&<article className="payslip panel" id="print-payslip"><div className="payslip-top"><div><div className="brand-inline"><span>W</span><div><strong>{settings.company}</strong><small>EMPLOYEE PAYSLIP</small></div></div><p>{settings.address}</p></div><div className="payslip-meta"><Status value={pay.status}/><strong>{pay.month}</strong><span>Payslip #{pay.id}</span></div></div>
      <div className="payslip-employee"><div><span>Employee</span><strong>{emp.name}</strong><small>{emp.id} · {emp.designation}</small></div><div><span>Department</span><strong>{emp.department}</strong><small>{emp.employment}</small></div><div><span>Joining Date</span><strong>{dateLabel(emp.joinDate)}</strong><small>{emp.location}</small></div></div>
      <div className="payslip-columns"><div><h3>Earnings</h3><div className="pay-line"><span>Basic salary</span><strong>{money(pay.basic)}</strong></div><div className="pay-line"><span>Allowance</span><strong>{money(pay.allowance)}</strong></div><div className="pay-line"><span>Bonus</span><strong>{money(pay.bonus)}</strong></div><div className="pay-line total"><span>Gross earnings</span><strong>{money(pay.basic+pay.allowance+pay.bonus)}</strong></div></div><div><h3>Deductions</h3><div className="pay-line"><span>Tax / deductions</span><strong>{money(pay.deduction)}</strong></div><div className="pay-line"><span>Other deductions</span><strong>{money(0)}</strong></div><div className="pay-line total"><span>Total deductions</span><strong>{money(pay.deduction)}</strong></div></div></div>
      <div className="net-pay"><span>NET SALARY</span><strong>{money(netPay(pay))}</strong><small>{pay.status==='Paid'?`Paid on ${dateLabel(pay.paidOn)}`:'Payment pending'}</small></div><footer>This is a computer-generated payslip for internship demonstration purposes.</footer>
    </article>}
  </>;
}
