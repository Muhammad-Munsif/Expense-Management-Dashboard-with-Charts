/* ============================================================
   JS/EXPENSES.JS (Expenses page CRUD)
   ============================================================ */
(function() {
  let expenses = [
    { id: 1, description: 'School Supplies', category: 'Materials', amount: 250.00, date: '2025-01-15' },
    { id: 2, description: 'Cafeteria Food', category: 'Food', amount: 420.50, date: '2025-01-12' },
    { id: 3, description: 'Bus Maintenance', category: 'Transport', amount: 180.00, date: '2025-01-10' },
    { id: 4, description: 'Building Repairs', category: 'Maintenance', amount: 350.75, date: '2025-01-08' },
    { id: 5, description: 'New Computers', category: 'Technology', amount: 1200.00, date: '2025-01-05' },
  ];
  let nextId = 6;

  const tbody = document.getElementById('expTableBody');
  const totalDisplay = document.getElementById('expTotalDisplay');
  const monthDisplay = document.getElementById('expMonthDisplay');
  const modal = document.getElementById('expenseModal');
  const form = document.getElementById('expenseForm');
  const descInput = document.getElementById('expDesc');
  const catInput = document.getElementById('expCategory');
  const amountInput = document.getElementById('expAmount');
  const dateInput = document.getElementById('expDate');
  const editIdInput = document.getElementById('editId');
  const modalTitle = document.getElementById('modalTitle');

  function renderTable() {
    let html = '', total = 0, monthTotal = 0;
    const now = new Date(), cm = now.getMonth(), cy = now.getFullYear();
    expenses.forEach(e => {
      total += e.amount;
      const d = new Date(e.date);
      if (d.getMonth() === cm && d.getFullYear() === cy) monthTotal += e.amount;
      html += `<tr>
        <td><strong>${e.description}</strong></td>
        <td><span class="px-2 py-1 rounded-full text-xs font-medium" style="background:var(--border-color);color:var(--text-primary)">${e.category}</span></td>
        <td>$${e.amount.toFixed(2)}</td>
        <td>${e.date}</td>
        <td>
          <button class="btn btn-sm btn-primary editBtn" data-id="${e.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger deleteBtn" data-id="${e.id}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    });
    tbody.innerHTML = html;
    totalDisplay.textContent = '$' + total.toFixed(2);
    monthDisplay.textContent = '$' + monthTotal.toFixed(2);
    document.querySelectorAll('.editBtn').forEach(b => b.addEventListener('click', onEdit));
    document.querySelectorAll('.deleteBtn').forEach(b => b.addEventListener('click', onDelete));
  }

  function onAdd() {
    modalTitle.textContent = 'Add Expense';
    editIdInput.value = '';
    form.reset();
    dateInput.value = new Date().toISOString().slice(0,10);
    modal.classList.add('open');
  }

  function onEdit(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const exp = expenses.find(x => x.id === id);
    if (!exp) return;
    modalTitle.textContent = 'Edit Expense';
    editIdInput.value = id;
    descInput.value = exp.description;
    catInput.value = exp.category;
    amountInput.value = exp.amount;
    dateInput.value = exp.date;
    modal.classList.add('open');
  }

  function onDelete(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    if (!confirm('Delete this expense?')) return;
    expenses = expenses.filter(x => x.id !== id);
    renderTable();
    renderCharts();
  }

  function saveExpense(e) {
    e.preventDefault();
    const desc = descInput.value.trim();
    const cat = catInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    if (!desc || !amount || !date) return alert('Please fill all fields');
    const editId = parseInt(editIdInput.value);
    if (editId) {
      const idx = expenses.findIndex(x => x.id === editId);
      if (idx > -1) expenses[idx] = { ...expenses[idx], description: desc, category: cat, amount, date };
    } else {
      expenses.push({ id: nextId++, description: desc, category: cat, amount, date });
    }
    modal.classList.remove('open');
    renderTable();
    renderCharts();
  }

  document.getElementById('addExpenseBtn')?.addEventListener('click', onAdd);
  document.getElementById('modalCancelBtn')?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('open'); });
  form?.addEventListener('submit', saveExpense);

  // Charts (same as dashboard but with exp prefix)
  function renderCharts() {
    // Re-use chart rendering from dashboard
    const lineData = [{ month: 'Jan', value: 3200 }, { month: 'Feb', value: 4500 }, { month: 'Mar', value: 3800 }, { month: 'Apr', value: 5200 }, { month: 'May', value: 4800 }, { month: 'Jun', value: 6100 }];
    const pieData = [{ name: 'Materials', value: 25 }, { name: 'Food', value: 35 }, { name: 'Transport', value: 15 }, { name: 'Maintenance', value: 15 }, { name: 'Technology', value: 10 }];
    const barData = [{ name: 'Materials', budget: 1000, actual: 650 }, { name: 'Food', budget: 2500, actual: 2100 }, { name: 'Transport', budget: 1800, actual: 950 }, { name: 'Maintenance', budget: 3000, actual: 1520 }];
    const hData = [{ cat: 'Materials', spent: 650 }, { cat: 'Food', spent: 2100 }, { cat: 'Transport', spent: 950 }, { cat: 'Maintenance', spent: 1520 }, { cat: 'Technology', spent: 1200 }];

    function renderChart(id, fn) {
      const el = document.getElementById(id);
      if (!el) return;
      const root = Recharts.createRoot(el);
      root.render(fn());
    }

    const lineChart = () => Recharts.createElement(Recharts.LineChart, { width: '100%', height: 260, data: lineData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
      Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
      Recharts.createElement(Recharts.XAxis, { dataKey: 'month' }),
      Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$'+v }),
      Recharts.createElement(Recharts.Tooltip, { formatter: v => '$'+v }),
      Recharts.createElement(Recharts.Line, { type: 'monotone', dataKey: 'value', stroke: '#4f46e5', strokeWidth: 3, dot: { r: 4 } })
    );
    const pieChart = () => Recharts.createElement(Recharts.PieChart, { width: '100%', height: 260 },
      Recharts.createElement(Recharts.Pie, { data: pieData, cx: '50%', cy: '50%', innerRadius: 60, outerRadius: 90, fill: '#8884d8', paddingAngle: 2, dataKey: 'value', label: ({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%` }),
      Recharts.createElement(Recharts.Tooltip, { formatter: v => v+'%' })
    );
    const barChart = () => Recharts.createElement(Recharts.BarChart, { width: '100%', height: 260, data: barData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
      Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
      Recharts.createElement(Recharts.XAxis, { dataKey: 'name' }),
      Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$'+v }),
      Recharts.createElement(Recharts.Tooltip, { formatter: v => '$'+v }),
      Recharts.createElement(Recharts.Bar, { dataKey: 'budget', fill: '#c7d2fe', radius: [4,4,0,0] }),
      Recharts.createElement(Recharts.Bar, { dataKey: 'actual', fill: '#4f46e5', radius: [4,4,0,0] })
    );
    const hBarChart = () => Recharts.createElement(Recharts.BarChart, { width: '100%', height: 260, data: hData, layout: 'vertical', margin: { top: 5, right: 20, left: 50, bottom: 5 } },
      Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
      Recharts.createElement(Recharts.XAxis, { type: 'number', tickFormatter: v => '$'+v }),
      Recharts.createElement(Recharts.YAxis, { type: 'category', dataKey: 'cat' }),
      Recharts.createElement(Recharts.Tooltip, { formatter: v => '$'+v }),
      Recharts.createElement(Recharts.Bar, { dataKey: 'spent', fill: '#8b5cf6', radius: [0,4,4,0] })
    );
    renderChart('expLineChart', lineChart);
    renderChart('expPieChart', pieChart);
    renderChart('expBarChart', barChart);
    renderChart('expHBarChart', hBarChart);
  }

  renderTable();
  renderCharts();
})();