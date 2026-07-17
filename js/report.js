/* ============================================================
   JS/REPORT.JS (Reports page charts)
   ============================================================ */
(function() {
  function renderChart(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    const root = Recharts.createRoot(el);
    root.render(fn());
  }

  // Line chart
  const lineData = [{ month: 'Jan', value: 3200 }, { month: 'Feb', value: 4500 }, { month: 'Mar', value: 3800 }, { month: 'Apr', value: 5200 }, { month: 'May', value: 4800 }, { month: 'Jun', value: 6100 }];
  const lineChart = () => Recharts.createElement(Recharts.LineChart, { width: '100%', height: 260, data: lineData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
    Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
    Recharts.createElement(Recharts.XAxis, { dataKey: 'month' }),
    Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$'+v }),
    Recharts.createElement(Recharts.Tooltip, { formatter: v => '$'+v }),
    Recharts.createElement(Recharts.Line, { type: 'monotone', dataKey: 'value', stroke: '#4f46e5', strokeWidth: 3, dot: { r: 4 } })
  );
  renderChart('repLineChart', lineChart);

  // Pie chart
  const pieData = [{ name: 'Materials', value: 25 }, { name: 'Food', value: 35 }, { name: 'Transport', value: 15 }, { name: 'Maintenance', value: 15 }, { name: 'Technology', value: 10 }];
  const pieChart = () => Recharts.createElement(Recharts.PieChart, { width: '100%', height: 260 },
    Recharts.createElement(Recharts.Pie, { data: pieData, cx: '50%', cy: '50%', innerRadius: 60, outerRadius: 90, fill: '#8884d8', paddingAngle: 2, dataKey: 'value', label: ({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%` }),
    Recharts.createElement(Recharts.Tooltip, { formatter: v => v+'%' })
  );
  renderChart('repPieChart', pieChart);

  // Attendance bar chart
  const attData = [{ day: 'Mon', rate: 92 }, { day: 'Tue', rate: 95 }, { day: 'Wed', rate: 94 }, { day: 'Thu', rate: 96 }, { day: 'Fri', rate: 91 }];
  const attChart = () => Recharts.createElement(Recharts.BarChart, { width: '100%', height: 260, data: attData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
    Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
    Recharts.createElement(Recharts.XAxis, { dataKey: 'day' }),
    Recharts.createElement(Recharts.YAxis, { domain: [80, 100] }),
    Recharts.createElement(Recharts.Tooltip, { formatter: v => v+'%' }),
    Recharts.createElement(Recharts.Bar, { dataKey: 'rate', fill: '#10b981', radius: [4,4,0,0] })
  );
  renderChart('repAttendanceChart', attChart);

  // Budget vs Actual bar chart
  const barData = [{ name: 'Materials', budget: 1000, actual: 650 }, { name: 'Food', budget: 2500, actual: 2100 }, { name: 'Transport', budget: 1800, actual: 950 }, { name: 'Maintenance', budget: 3000, actual: 1520 }];
  const barChart = () => Recharts.createElement(Recharts.BarChart, { width: '100%', height: 260, data: barData, margin: { top: 5, right: 20, left: 0, bottom: 5 } },
    Recharts.createElement(Recharts.CartesianGrid, { strokeDasharray: '3 3' }),
    Recharts.createElement(Recharts.XAxis, { dataKey: 'name' }),
    Recharts.createElement(Recharts.YAxis, { tickFormatter: v => '$'+v }),
    Recharts.createElement(Recharts.Tooltip, { formatter: v => '$'+v }),
    Recharts.createElement(Recharts.Bar, { dataKey: 'budget', fill: '#c7d2fe', radius: [4,4,0,0] }),
    Recharts.createElement(Recharts.Bar, { dataKey: 'actual', fill: '#4f46e5', radius: [4,4,0,0] })
  );
  renderChart('repBarChart', barChart);
})();