import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import Payslips from './pages/Payslips';
import Departments from './pages/Departments';
import Performance from './pages/Performance';
import CalendarPage from './pages/Calendar';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App(){return <Layout><Routes>
  <Route path="/" element={<Dashboard/>}/>
  <Route path="/employees" element={<Employees/>}/>
  <Route path="/employees/new" element={<EmployeeForm/>}/>
  <Route path="/employees/:id" element={<EmployeeDetails/>}/>
  <Route path="/employees/:id/edit" element={<EmployeeForm/>}/>
  <Route path="/attendance" element={<Attendance/>}/>
  <Route path="/leave" element={<Leave/>}/>
  <Route path="/payroll" element={<Payroll/>}/>
  <Route path="/payslips" element={<Payslips/>}/>
  <Route path="/departments" element={<Departments/>}/>
  <Route path="/performance" element={<Performance/>}/>
  <Route path="/calendar" element={<CalendarPage/>}/>
  <Route path="/reports" element={<Reports/>}/>
  <Route path="/settings" element={<SettingsPage/>}/>
  <Route path="*" element={<NotFound/>}/>
</Routes></Layout>}
