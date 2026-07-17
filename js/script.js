
// (function () {
//     // ===== DATA =====
//     let expenses = [
//         { id: 1, description: 'School Supplies', category: 'Materials', amount: 250.00, date: '2025-01-15' },
//         { id: 2, description: 'Cafeteria Food', category: 'Food', amount: 420.50, date: '2025-01-12' },
//         { id: 3, description: 'Bus Maintenance', category: 'Transport', amount: 180.00, date: '2025-01-10' },
//         { id: 4, description: 'Building Repairs', category: 'Maintenance', amount: 350.75, date: '2025-01-08' },
//         { id: 5, description: 'New Computers', category: 'Technology', amount: 1200.00, date: '2025-01-05' },
//     ];
//     let nextId = 6;

//     // ===== DOM REFS =====
//     const dashTbody = document.getElementById('dashTableBody');
//     const expTbody = document.getElementById('expTableBody');
//     const expTotal = document.getElementById('expTotalDisplay');
//     const expMonth = document.getElementById('expMonthDisplay');
//     const dashTotal = document.getElementById('dashTotalExp');

//     const modal = document.getElementById('expenseModal');
//     const form = document.getElementById('expenseForm');
//     const descInput = document.getElementById('expDesc');
//     const catInput = document.getElementById('expCategory');
//     const amountInput = document.getElementById('expAmount');
//     const dateInput = document.getElementById('expDate');
//     const editIdInput = document.getElementById('editId');
//     const modalTitle = document.getElementById('modalTitle');

//     // ===== RENDER TABLES =====
//     function renderAll() {
//         let dashHtml = '';
//         let expHtml = '';
//         let total = 0;
//         let monthTotal = 0;
//         const now = new Date();
//         const currentMonth = now.getMonth();
//         const currentYear = now.getFullYear();

//         expenses.forEach(e => {
//             total += e.amount;
//             const d = new Date(e.date);
//             if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
//                 monthTotal += e.amount;
//             }
//             const row = `<tr><td><strong>${e.description}</strong></td><td><span class="px-2 py-1 rounded-full text-xs font-medium" style="background:var(--border-color);color:var(--text-primary)">${e.category}</span></td><td>$${e.amount.toFixed(2)}</td><td>${e.date}</td></tr>`;
//             dashHtml += row;
//             expHtml += row.replace('</td><td>', '</td><td><div class="flex gap-2"><button class="btn btn-sm btn-primary editBtn" data-id="' + e.id + '"><i class="fas fa-edit"></i></button><button class="btn btn-sm btn-danger deleteBtn" data-id="' + e.id + '"><i class="fas fa-trash"></i></button></div></td><td>');
//         });

//         dashTbody.innerHTML = dashHtml;
//         expTbody.innerHTML = expHtml;
//         expTotal.textContent = '$' + total.toFixed(2);
//         expMonth.textContent = '$' + monthTotal.toFixed(2);
//         dashTotal.textContent = '$' + total.toFixed(2);

//         document.querySelectorAll('.editBtn').forEach(b => b.addEventListener('click', onEdit));
//         document.querySelectorAll('.deleteBtn').forEach(b => b.addEventListener('click', onDelete));
//     }

//     // ===== CRUD =====
//     function onAdd() {
//         modalTitle.textContent = 'Add Expense';
//         editIdInput.value = '';
//         form.reset();
//         document.getElementById('expDate').value = new Date().toISOString().slice(0, 10);
//         modal.classList.add('open');
//     }

//     function onEdit(e) {
//         const id = parseInt(e.currentTarget.dataset.id);
//         const exp = expenses.find(x => x.id === id);
//         if (!exp) return;
//         modalTitle.textContent = 'Edit Expense';
//         editIdInput.value = id;
//         descInput.value = exp.description;
//         catInput.value = exp.category;
//         amountInput.value = exp.amount;
//         dateInput.value = exp.date;
//         modal.classList.add('open');
//     }

//     function onDelete(e) {
//         const id = parseInt(e.currentTarget.dataset.id);
//         if (!confirm('Delete this expense?')) return;
//         expenses = expenses.filter(x => x.id !== id);
//         renderAll();
//         renderCharts();
//     }

//     function saveExpense(e) {
//         e.preventDefault();
//         const desc = descInput.value.trim();
//         const cat = catInput.value;
//         const amount = parseFloat(amountInput.value);
//         const date = dateInput.value;
//         if (!desc || !amount || !date) return alert('Please fill all fields');

//         const editId = parseInt(editIdInput.value);
//         if (editId) {
//             const idx = expenses.findIndex(x => x.id === editId);
//             if (idx > -1) expenses[idx] = { ...expenses[idx], description: desc, category: cat, amount, date };
//         } else {
//             expenses.push({ id: nextId++, description: desc, category: cat, amount, date });
//         }
//         modal.classList.remove('open');
//         renderAll();
//         renderCharts();
//     }

//     // ===== SIDEBAR NAV =====
//     function setupSidebar() {
//         const links = document.querySelectorAll('.sidebar-link');
//         const pages = ['dashboard', 'expenses', 'reports', 'categories', 'settings'];
//         const titles = {
//             dashboard: 'Dashboard Overview',
//             expenses: 'Expense Management',
//             reports: 'Reports & Analytics',
//             categories: 'Category Management',
//             settings: 'System Settings'
//         };
//         links.forEach(link => {
//             link.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 links.forEach(l => l.classList.remove('active'));
//                 this.classList.add('active');
//                 const page = this.dataset.page;
//                 document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
//                 document.getElementById('page-' + page).classList.add('active');
//                 document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
//                 if (window.innerWidth < 1024) closeSidebar();
//             });
//         });
//     }

//     // ===== MOBILE SIDEBAR =====
//     function openSidebar() {
//         document.querySelector('.sidebar').classList.add('active');
//         document.getElementById('overlay').classList.add('active');
//         document.body.style.overflow = 'hidden';
//     }
//     function closeSidebar() {
//         document.querySelector('.sidebar').classList.remove('active');
//         document.getElementById('overlay').classList.remove('active');
//         document.body.style.overflow = 'auto';
//     }
//     document.getElementById('mobileToggle').addEventListener('click', openSidebar);
//     document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
//     document.getElementById('overlay').addEventListener('click', closeSidebar);

//     // ===== THEME =====
//     const themeToggle = document.getElementById('themeToggle');
//     const themeIcon = document.getElementById('themeIcon');
//     let darkMode = false;
//     themeToggle.addEventListener('click', function () {
//         darkMode = !darkMode;
//         document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//         themeIcon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
//     });

//     // ===== MODAL CONTROLS =====
//     document.getElementById('addExpenseBtn').addEventListener('click', onAdd);
//     document.getElementById('modalCancelBtn').addEventListener('click', () => modal.classList.remove('open'));
//     modal.addEventListener('click', function (e) { if (e.target === this) this.classList.remove('open'); });
//     form.addEventListener('submit', saveExpense);

//     // ===== RECHARTS HELPER =====
//     function renderChart(containerId, chartFn) {
//         const container = document.getElementById(containerId);
//         if (!container) return;
//         const root = Recharts.createRoot(container);
//         root.render(chartFn());
//     }

//     function renderCharts() {
//         // Line data
//         const lineData = [{ month: 'Jan', value: 3200 }, { month: 'Feb', value: 4500 }, { month: 'Mar', value: 3800 }, { month: 'Apr', value: 5200 }, { month: 'May', value: 4800 }, { month: 'Jun', value: 6100 }];
//         const lineChart = () => Recharts.createElement(
//             Recharts.LineChart, { width: '100%', height: 260, data: lineData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
//             Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
//             Recharts.createElement(Recharts.XAxis, { dataKey: 'month' }),
//             Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$' + v }),
//             Recharts.createElement(Recharts.Tooltip, { formatter: v => '$' + v }),
//             Recharts.createElement(Recharts.Line, { type: 'monotone', dataKey: 'value', stroke: '#4f46e5', strokeWidth: 3, dot: { r: 4 } })
//         );
//         ['dashLineChart', 'expLineChart', 'repLineChart'].forEach(id => renderChart(id, lineChart));

//         // Pie
//         const pieData = [{ name: 'Materials', value: 25 }, { name: 'Food', value: 35 }, { name: 'Transport', value: 15 }, { name: 'Maintenance', value: 15 }, { name: 'Technology', value: 10 }];
//         const pieChart = () => Recharts.createElement(
//             Recharts.PieChart, { width: '100%', height: 260 },
//             Recharts.createElement(Recharts.Pie, { data: pieData, cx: '50%', cy: '50%', innerRadius: 60, outerRadius: 90, fill: '#8884d8', paddingAngle: 2, dataKey: 'value', label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` }),
//             Recharts.createElement(Recharts.Tooltip, { formatter: v => v + '%' })
//         );
//         ['dashPieChart', 'expPieChart', 'repPieChart'].forEach(id => renderChart(id, pieChart));

//         // Bar
//         const barData = [{ name: 'Materials', budget: 1000, actual: 650 }, { name: 'Food', budget: 2500, actual: 2100 }, { name: 'Transport', budget: 1800, actual: 950 }, { name: 'Maintenance', budget: 3000, actual: 1520 }];
//         const barChart = () => Recharts.createElement(
//             Recharts.BarChart, { width: '100%', height: 260, data: barData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
//             Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
//             Recharts.createElement(Recharts.XAxis, { dataKey: 'name' }),
//             Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$' + v }),
//             Recharts.createElement(Recharts.Tooltip, { formatter: v => '$' + v }),
//             Recharts.createElement(Recharts.Bar, { dataKey: 'budget', fill: '#c7d2fe', radius: [4, 4, 0, 0] }),
//             Recharts.createElement(Recharts.Bar, { dataKey: 'actual', fill: '#4f46e5', radius: [4, 4, 0, 0] })
//         );
//         ['dashBarChart', 'expBarChart', 'repBarChart'].forEach(id => renderChart(id, barChart));

//         // Horizontal Bar
//         const hData = [{ cat: 'Materials', spent: 650 }, { cat: 'Food', spent: 2100 }, { cat: 'Transport', spent: 950 }, { cat: 'Maintenance', spent: 1520 }, { cat: 'Technology', spent: 1200 }];
//         const hBarChart = () => Recharts.createElement(
//             Recharts.BarChart, { width: '100%', height: 260, data: hData, layout: 'vertical', margin: { top: 5, right: 20, left: 50, bottom: 5 } },
//             Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
//             Recharts.createElement(Recharts.XAxis, { type: 'number', tickFormatter: v => '$' + v }),
//             Recharts.createElement(Recharts.YAxis, { type: 'category', dataKey: 'cat' }),
//             Recharts.createElement(Recharts.Tooltip, { formatter: v => '$' + v }),
//             Recharts.createElement(Recharts.Bar, { dataKey: 'spent', fill: '#8b5cf6', radius: [0, 4, 4, 0] })
//         );
//         ['dashHBarChart', 'expHBarChart'].forEach(id => renderChart(id, hBarChart));

//         // Attendance Chart (reports only)
//         const attData = [{ day: 'Mon', rate: 92 }, { day: 'Tue', rate: 95 }, { day: 'Wed', rate: 94 }, { day: 'Thu', rate: 96 }, { day: 'Fri', rate: 91 }];
//         const attChart = () => Recharts.createElement(
//             Recharts.BarChart, { width: '100%', height: 260, data: attData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
//             Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
//             Recharts.createElement(Recharts.XAxis, { dataKey: 'day' }),
//             Recharts.createElement(Recharts.YAxis, { domain: [80, 100] }),
//             Recharts.createElement(Recharts.Tooltip, { formatter: v => v + '%' }),
//             Recharts.createElement(Recharts.Bar, { dataKey: 'rate', fill: '#10b981', radius: [4, 4, 0, 0] })
//         );
//         renderChart('repAttendanceChart', attChart);
//     }

//     // ===== INIT =====
//     renderAll();
//     renderCharts();
//     setupSidebar();

//     if (document.documentElement.getAttribute('data-theme') === 'dark') {
//         themeIcon.className = 'fas fa-sun';
//     }
// })();
/* ============================================================
   JS/SCRIPT.JS (Shared utilities for all pages)
   ============================================================ */
// Mobile sidebar toggle
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay') || document.createElement('div');
  if (!document.getElementById('overlay')) {
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  }

  document.getElementById('mobileToggle')?.addEventListener('click', function() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('closeSidebar')?.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  let darkMode = localStorage.getItem('theme') === 'dark';
  if (darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
  }
  themeToggle?.addEventListener('click', function() {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    themeIcon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 1024) closeSidebar();
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) closeSidebar();
  });
});