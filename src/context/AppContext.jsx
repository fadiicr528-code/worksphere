import React, { createContext, useContext, useMemo, useState } from 'react';
import { seedAttendance, seedDepartments, seedEmployees, seedEvents, seedLeaves, seedPayroll, seedReviews, seedSettings } from '../data/seed';

const AppContext = createContext(null);
const store = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
};

export function AppProvider({ children }) {
  const [employees, setEmployeesState] = useState(() => store('ws-employees-v2', seedEmployees));
  const [attendance, setAttendanceState] = useState(() => store('ws-attendance-v2', seedAttendance));
  const [leaves, setLeavesState] = useState(() => store('ws-leaves-v2', seedLeaves));
  const [payroll, setPayrollState] = useState(() => store('ws-payroll-v2', seedPayroll));
  const [departments, setDepartmentsState] = useState(() => store('ws-departments-v2', seedDepartments));
  const [reviews, setReviewsState] = useState(() => store('ws-reviews-v2', seedReviews));
  const [events, setEventsState] = useState(() => store('ws-events-v2', seedEvents));
  const [settings, setSettingsState] = useState(() => store('ws-settings-v2', seedSettings));

  const persist = (setter, key) => (updater) => setter(current => {
    const next = typeof updater === 'function' ? updater(current) : updater;
    localStorage.setItem(key, JSON.stringify(next)); return next;
  });

  const setEmployees = persist(setEmployeesState,'ws-employees-v2');
  const setAttendance = persist(setAttendanceState,'ws-attendance-v2');
  const setLeaves = persist(setLeavesState,'ws-leaves-v2');
  const setPayroll = persist(setPayrollState,'ws-payroll-v2');
  const setDepartments = persist(setDepartmentsState,'ws-departments-v2');
  const setReviews = persist(setReviewsState,'ws-reviews-v2');
  const setEvents = persist(setEventsState,'ws-events-v2');
  const setSettings = persist(setSettingsState,'ws-settings-v2');

  const resetDemo = () => {
    ['ws-employees-v2','ws-attendance-v2','ws-leaves-v2','ws-payroll-v2','ws-departments-v2','ws-reviews-v2','ws-events-v2','ws-settings-v2'].forEach(k=>localStorage.removeItem(k));
    setEmployeesState(seedEmployees); setAttendanceState(seedAttendance); setLeavesState(seedLeaves); setPayrollState(seedPayroll);
    setDepartmentsState(seedDepartments); setReviewsState(seedReviews); setEventsState(seedEvents); setSettingsState(seedSettings);
  };

  const value = useMemo(() => ({ employees,setEmployees,attendance,setAttendance,leaves,setLeaves,payroll,setPayroll,departments,setDepartments,reviews,setReviews,events,setEvents,settings,setSettings,resetDemo }), [employees,attendance,leaves,payroll,departments,reviews,events,settings]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
