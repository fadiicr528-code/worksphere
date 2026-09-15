export const seedDepartments = [
  { id: 'D-01', name: 'Engineering', manager: 'Hamza Ali', location: 'Floor 2', budget: 3200000 },
  { id: 'D-02', name: 'Human Resources', manager: 'Ayesha Khan', location: 'Floor 1', budget: 1400000 },
  { id: 'D-03', name: 'Finance', manager: 'Sara Ahmed', location: 'Floor 1', budget: 1800000 },
  { id: 'D-04', name: 'Marketing', manager: 'Bilal Shah', location: 'Floor 3', budget: 2100000 },
  { id: 'D-05', name: 'Operations', manager: 'Usman Tariq', location: 'Ground Floor', budget: 2500000 },
  { id: 'D-06', name: 'Sales', manager: 'Zain Raza', location: 'Floor 3', budget: 2600000 },
];

export const seedEmployees = [
  { id:'EMP-1001', name:'Ayesha Khan', email:'ayesha.khan@worksphere.com', phone:'+92 300 1112233', department:'Human Resources', designation:'HR Manager', joinDate:'2023-01-12', salary:185000, status:'Active', employment:'Full Time', location:'Abbottabad', performance:92, attendance:96, gender:'Female', dob:'1994-04-16', emergency:'Nadia Khan · +92 333 4411770', address:'Jinnahabad, Abbottabad' },
  { id:'EMP-1002', name:'Hamza Ali', email:'hamza.ali@worksphere.com', phone:'+92 301 2244668', department:'Engineering', designation:'Frontend Developer', joinDate:'2024-03-18', salary:155000, status:'Active', employment:'Full Time', location:'Remote', performance:88, attendance:94, gender:'Male', dob:'1998-09-22', emergency:'Ali Raza · +92 333 5577990', address:'Mandian, Abbottabad' },
  { id:'EMP-1003', name:'Sara Ahmed', email:'sara.ahmed@worksphere.com', phone:'+92 302 3377991', department:'Finance', designation:'Accounts Officer', joinDate:'2022-08-08', salary:140000, status:'Active', employment:'Full Time', location:'Abbottabad', performance:90, attendance:97, gender:'Female', dob:'1996-02-11', emergency:'Ahmed Raza · +92 331 1119090', address:'Supply, Abbottabad' },
  { id:'EMP-1004', name:'Bilal Shah', email:'bilal.shah@worksphere.com', phone:'+92 303 4088122', department:'Marketing', designation:'Marketing Executive', joinDate:'2024-06-10', salary:120000, status:'Active', employment:'Full Time', location:'Islamabad', performance:81, attendance:91, gender:'Male', dob:'1999-12-05', emergency:'Zara Shah · +92 332 8800112', address:'F-10, Islamabad' },
  { id:'EMP-1005', name:'Noor Fatima', email:'noor.fatima@worksphere.com', phone:'+92 304 5588990', department:'Engineering', designation:'UI/UX Designer', joinDate:'2023-11-02', salary:145000, status:'Active', employment:'Full Time', location:'Remote', performance:95, attendance:98, gender:'Female', dob:'1997-06-17', emergency:'Fahad Malik · +92 334 8811881', address:'Mirpur, Abbottabad' },
  { id:'EMP-1006', name:'Usman Tariq', email:'usman.tariq@worksphere.com', phone:'+92 305 6112233', department:'Operations', designation:'Operations Coordinator', joinDate:'2021-04-20', salary:135000, status:'On Leave', employment:'Full Time', location:'Abbottabad', performance:84, attendance:89, gender:'Male', dob:'1993-10-09', emergency:'Tariq Khan · +92 335 2200110', address:'Kakul Road, Abbottabad' },
  { id:'EMP-1007', name:'Hina Malik', email:'hina.malik@worksphere.com', phone:'+92 306 7744110', department:'Engineering', designation:'QA Engineer', joinDate:'2024-01-15', salary:130000, status:'Active', employment:'Full Time', location:'Abbottabad', performance:87, attendance:93, gender:'Female', dob:'1998-03-28', emergency:'Amna Malik · +92 334 3355771', address:'Jhangi, Abbottabad' },
  { id:'EMP-1008', name:'Zain Raza', email:'zain.raza@worksphere.com', phone:'+92 307 8124422', department:'Sales', designation:'Sales Executive', joinDate:'2023-09-06', salary:115000, status:'Active', employment:'Full Time', location:'Islamabad', performance:79, attendance:90, gender:'Male', dob:'1999-08-30', emergency:'Raza Ali · +92 330 4499110', address:'G-11, Islamabad' },
  { id:'EMP-1009', name:'Mariam Noor', email:'mariam.noor@worksphere.com', phone:'+92 308 1012233', department:'Human Resources', designation:'HR Officer', joinDate:'2025-02-03', salary:105000, status:'Active', employment:'Full Time', location:'Abbottabad', performance:86, attendance:95, gender:'Female', dob:'2000-05-14', emergency:'Noor Hassan · +92 333 2266880', address:'PMA Road, Abbottabad' },
  { id:'EMP-1010', name:'Danish Iqbal', email:'danish.iqbal@worksphere.com', phone:'+92 309 7712211', department:'Engineering', designation:'React Intern', joinDate:'2026-08-01', salary:45000, status:'Active', employment:'Intern', location:'Abbottabad', performance:83, attendance:97, gender:'Male', dob:'2003-11-21', emergency:'Iqbal Khan · +92 332 1100765', address:'Nawanshehr, Abbottabad' },
];

export const seedAttendance = seedEmployees.map((e, i) => ({
  id:`AT-${100+i}`,
  employeeId:e.id,
  employee:e.name,
  department:e.department,
  date:'2026-09-14',
  checkIn: i === 5 || i === 7 ? '—' : ['08:48 AM','09:14 AM','08:51 AM','09:03 AM','08:42 AM'][i%5],
  checkOut: i === 5 || i === 7 ? '—' : ['05:10 PM','05:37 PM','05:04 PM','05:16 PM','05:28 PM'][i%5],
  status: i === 5 ? 'On Leave' : i === 7 ? 'Absent' : i === 1 ? 'Late' : 'Present',
}));

export const seedLeaves = [
  { id:'LV-1001', employeeId:'EMP-1006', employee:'Usman Tariq', type:'Annual Leave', from:'2026-09-14', to:'2026-09-18', days:5, reason:'Family event', status:'Approved' },
  { id:'LV-1002', employeeId:'EMP-1002', employee:'Hamza Ali', type:'Casual Leave', from:'2026-09-17', to:'2026-09-17', days:1, reason:'Personal work', status:'Pending' },
  { id:'LV-1003', employeeId:'EMP-1003', employee:'Sara Ahmed', type:'Sick Leave', from:'2026-09-11', to:'2026-09-12', days:2, reason:'Medical rest', status:'Approved' },
  { id:'LV-1004', employeeId:'EMP-1004', employee:'Bilal Shah', type:'Casual Leave', from:'2026-09-20', to:'2026-09-21', days:2, reason:'Travel', status:'Pending' },
  { id:'LV-1005', employeeId:'EMP-1009', employee:'Mariam Noor', type:'Sick Leave', from:'2026-09-22', to:'2026-09-23', days:2, reason:'Medical appointment', status:'Pending' },
];

export const seedPayroll = seedEmployees.map((e, i) => ({
  id:`PAY-${1001+i}`, employeeId:e.id, employee:e.name, month:'September 2026',
  basic:e.salary, allowance: Math.round(e.salary * .12), bonus: i % 3 === 0 ? 10000 : i % 3 === 1 ? 6000 : 0,
  deduction: Math.round(e.salary * .025), status: i < 7 ? 'Paid' : 'Pending', paidOn: i < 7 ? '2026-09-05' : '—'
}));

export const seedReviews = seedEmployees.map((e, i) => ({
  id:`RV-${100+i}`, employeeId:e.id, employee:e.name, department:e.department,
  period:'Q3 2026', score:e.performance, goals: i%2 ? 4 : 5, completed: i%3 ? 4 : 3,
  rating: e.performance >= 90 ? 'Excellent' : e.performance >= 80 ? 'Good' : 'Needs Improvement',
  note: e.performance >= 90 ? 'Strong ownership and consistent quality.' : 'Good contribution; continue improving delivery consistency.'
}));

export const seedEvents = [
  { id:'EV-1', title:'Monthly Town Hall', date:'2026-09-16', time:'03:00 PM', type:'Meeting', audience:'All Employees' },
  { id:'EV-2', title:'Payroll Processing', date:'2026-09-25', time:'10:00 AM', type:'Payroll', audience:'Finance & HR' },
  { id:'EV-3', title:'Performance Review Deadline', date:'2026-09-28', time:'05:00 PM', type:'Deadline', audience:'Managers' },
  { id:'EV-4', title:'Company Holiday', date:'2026-10-01', time:'All Day', type:'Holiday', audience:'All Employees' },
];

export const monthlyAttendance = [
  {month:'Apr',present:92,late:5,absent:3},{month:'May',present:94,late:4,absent:2},{month:'Jun',present:91,late:6,absent:3},
  {month:'Jul',present:95,late:3,absent:2},{month:'Aug',present:93,late:4,absent:3},{month:'Sep',present:96,late:2,absent:2}
];

export const payrollTrend = [
  {month:'Apr',payroll:1.19},{month:'May',payroll:1.22},{month:'Jun',payroll:1.24},{month:'Jul',payroll:1.27},{month:'Aug',payroll:1.31},{month:'Sep',payroll:1.34}
];

export const seedSettings = {
  company:'WorkSphere Technologies', email:'hr@worksphere.com', phone:'+92 992 555 0190', address:'Supply, Abbottabad, Khyber Pakhtunkhwa',
  workStart:'09:00', workEnd:'17:00', weekend:'Saturday, Sunday', currency:'PKR', payrollDay:'5', leaveAnnual:'20', leaveSick:'10'
};
