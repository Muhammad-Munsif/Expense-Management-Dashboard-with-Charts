// document.addEventListener("DOMContentLoaded", function () {
//   // Sidebar toggle for mobile
//   const sidebarToggle = document.getElementById("sidebarToggle");
//   const sidebar = document.querySelector("aside");

//   if (sidebarToggle && sidebar) {
//     sidebarToggle.addEventListener("click", function () {
//       sidebar.classList.toggle("active");
//     });
//   }

//   // Initialize Expense Chart
//   const expenseCtx = document.getElementById("expenseChart").getContext("2d");
//   const expenseChart = new Chart(expenseCtx, {
//     type: "line",
//     data: {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//       datasets: [
//         {
//           label: "Income",
//           data: [3500, 4200, 3800, 4100, 4500, 4700, 4900],
//           borderColor: "#4CAF50",
//           backgroundColor: "rgba(76, 175, 80, 0.1)",
//           tension: 0.3,
//           fill: true,
//         },
//         {
//           label: "Expense",
//           data: [2800, 3100, 2950, 3200, 3400, 3210, 3500],
//           borderColor: "#F44336",
//           backgroundColor: "rgba(244, 67, 54, 0.1)",
//           tension: 0.3,
//           fill: true,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         tooltip: {
//           mode: "index",
//           intersect: false,
//         },
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           grid: {
//             drawBorder: false,
//           },
//         },
//         x: {
//           grid: {
//             display: false,
//           },
//         },
//       },
//     },
//   });

//   // Initialize Category Chart
//   const categoryCtx = document.getElementById("categoryChart").getContext("2d");
//   const categoryChart = new Chart(categoryCtx, {
//     type: "doughnut",
//     data: {
//       labels: [
//         "Housing",
//         "Food",
//         "Transport",
//         "Entertainment",
//         "Utilities",
//         "Others",
//       ],
//       datasets: [
//         {
//           data: [1200, 800, 400, 300, 350, 160],
//           backgroundColor: [
//             "#3B82F6",
//             "#10B981",
//             "#F59E0B",
//             "#8B5CF6",
//             "#EF4444",
//             "#64748B",
//           ],
//           borderWidth: 0,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "bottom",
//           labels: {
//             boxWidth: 12,
//             padding: 20,
//           },
//         },
//       },
//       cutout: "70%",
//     },
//   });

//   // Handle window resize for charts
//   window.addEventListener("resize", function () {
//     expenseChart.resize();
//     categoryChart.resize();
//   });

//   // Sample data for adding new expenses (would be replaced with actual form handling)
//   document
//     .querySelector("button.bg-indigo-600")
//     .addEventListener("click", function () {
//       alert("Add Expense form would open here in a real application");
//     });
// });

// Mobile sidebar functionality
document.addEventListener("DOMContentLoaded", function () {
    initializeSidebar();
    initializeActivePage();
    initializeCharts();
});

function initializeSidebar() {
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
}

function initializeActivePage() {
    // Set active state for current page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeCharts() {
    // Initialize charts if they exist on the page
    const expenseChart = document.getElementById('expenseChart');
    const categoryChart = document.getElementById('categoryChart');
    
    if (expenseChart) {
        const expenseCtx = expenseChart.getContext('2d');
        new Chart(expenseCtx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{
                    label: "Expenses",
                    data: [3200, 4500, 3800, 5200, 4800, 6100],
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79, 70, 229, 0.1)",
                    tension: 0.4,
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { grid: { display: false } }
                },
            },
        });
    }
    
    if (categoryChart) {
        const categoryCtx = categoryChart.getContext('2d');
        new Chart(categoryCtx, {
            type: "doughnut",
            data: {
                labels: ["Materials", "Food", "Transport", "Maintenance", "Technology"],
                datasets: [{
                    data: [25, 35, 15, 15, 10],
                    backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"],
                    borderWidth: 0,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
            },
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize charts or adjust layout if needed
    if (window.innerWidth >= 1024) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});