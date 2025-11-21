document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector("aside");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Initialize Expense Chart
  const expenseCtx = document.getElementById("expenseChart").getContext("2d");
  const expenseChart = new Chart(expenseCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Income",
          data: [3500, 4200, 3800, 4100, 4500, 4700, 4900],
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Expense",
          data: [2800, 3100, 2950, 3200, 3400, 3210, 3500],
          borderColor: "#F44336",
          backgroundColor: "rgba(244, 67, 54, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  // Initialize Category Chart
  const categoryCtx = document.getElementById("categoryChart").getContext("2d");
  const categoryChart = new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: [
        "Housing",
        "Food",
        "Transport",
        "Entertainment",
        "Utilities",
        "Others",
      ],
      datasets: [
        {
          data: [1200, 800, 400, 300, 350, 160],
          backgroundColor: [
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#8B5CF6",
            "#EF4444",
            "#64748B",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            padding: 20,
          },
        },
      },
      cutout: "70%",
    },
  });

  // Handle window resize for charts
  window.addEventListener("resize", function () {
    expenseChart.resize();
    categoryChart.resize();
  });

  // Sample data for adding new expenses (would be replaced with actual form handling)
  document
    .querySelector("button.bg-indigo-600")
    .addEventListener("click", function () {
      alert("Add Expense form would open here in a real application");
    });
});

