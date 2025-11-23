// Mobile sidebar functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobileToggle");
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebarFunc() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", openSidebar);
  }

  if (closeSidebar) {
    closeSidebar.addEventListener("click", closeSidebarFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebarFunc);
  }

  // Close sidebar when clicking on a link (mobile)
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        closeSidebarFunc();
      }
    });
  });

  // Report control buttons
  const controlButtons = document.querySelectorAll(
    ".control-btn:not(.export-btn)"
  );
  controlButtons.forEach((button) => {
    button.addEventListener("click", function () {
      controlButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Export button functionality
  const exportBtn = document.querySelector(".export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      alert("Exporting report data...");
      // In a real application, this would trigger a download
    });
  }

  // Report card buttons
  const reportButtons = document.querySelectorAll(".report-btn");
  reportButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const reportTitle =
        this.closest(".report-card").querySelector("h3").textContent;
      const action = this.classList.contains("primary")
        ? "Download"
        : "Preview";
      alert(`${action} report: ${reportTitle}`);
    });
  });

  // Report card click for details
  const reportCards = document.querySelectorAll(".report-card");
  reportCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".report-btn")) {
        const reportTitle = this.querySelector("h3").textContent;
        alert(`View detailed report: ${reportTitle}`);
      }
    });
  });

  // Initialize Charts
  initializeCharts();
});

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth >= 1024) {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Chart initialization
function initializeCharts() {
  // Expense Trends Chart
  const expenseCtx = document.getElementById("expenseChart").getContext("2d");
  const expenseChart = new Chart(expenseCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Expenses",
          data: [3200, 4500, 3800, 5200, 4800, 6100],
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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

  // Category Distribution Chart
  const categoryCtx = document.getElementById("categoryChart").getContext("2d");
  const categoryChart = new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: ["Materials", "Food", "Transport", "Maintenance", "Technology"],
      datasets: [
        {
          data: [25, 35, 15, 15, 10],
          backgroundColor: [
            "#3b82f6",
            "#10b981",
            "#8b5cf6",
            "#ef4444",
            "#f59e0b",
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
        },
      },
    },
  });

  // Attendance Chart
  const attendanceCtx = document
    .getElementById("attendanceChart")
    .getContext("2d");
  const attendanceChart = new Chart(attendanceCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance %",
          data: [92, 95, 94, 96, 91],
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
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

  // Budget vs Actual Chart
  const budgetCtx = document.getElementById("budgetChart").getContext("2d");
  const budgetChart = new Chart(budgetCtx, {
    type: "bar",
    data: {
      labels: ["Materials", "Food", "Transport", "Maintenance"],
      datasets: [
        {
          label: "Budget",
          data: [1000, 2500, 1800, 3000],
          backgroundColor: "#c7d2fe",
          borderRadius: 4,
        },
        {
          label: "Actual",
          data: [650, 2100, 950, 1520],
          backgroundColor: "#4f46e5",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            drawBorder: false,
          },
        },
      },
    },
  });
}
