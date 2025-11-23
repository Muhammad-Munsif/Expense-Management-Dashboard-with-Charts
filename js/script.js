// // Mobile sidebar functionality
// document.addEventListener("DOMContentLoaded", function () {
//     initializeSidebar();
//     initializeActivePage();
//     initializeCharts();
// });

// function initializeSidebar() {
//     const mobileToggle = document.getElementById("mobileToggle");
//     const closeSidebar = document.getElementById("closeSidebar");
//     const sidebar = document.querySelector(".sidebar");
//     const overlay = document.getElementById("overlay");

//     function openSidebar() {
//         sidebar.classList.add("active");
//         overlay.classList.add("active");
//         document.body.style.overflow = "hidden";
//     }

//     function closeSidebarFunc() {
//         sidebar.classList.remove("active");
//         overlay.classList.remove("active");
//         document.body.style.overflow = "auto";
//     }

//     if (mobileToggle) {
//         mobileToggle.addEventListener("click", openSidebar);
//     }
//     if (closeSidebar) {
//         closeSidebar.addEventListener("click", closeSidebarFunc);
//     }
//     if (overlay) {
//         overlay.addEventListener("click", closeSidebarFunc);
//     }

//     // Close sidebar when clicking on a link (mobile)
//     const sidebarLinks = document.querySelectorAll(".sidebar-link");
//     sidebarLinks.forEach((link) => {
//         link.addEventListener("click", () => {
//             if (window.innerWidth < 1024) {
//                 closeSidebarFunc();
//             }
//         });
//     });
// }

// function initializeActivePage() {
//     // Set active state for current page in sidebar
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
//     sidebarLinks.forEach(link => {
//         const linkHref = link.getAttribute('href');
//         if (linkHref === currentPage) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
// }

// function initializeCharts() {
//     // Initialize charts if they exist on the page
//     const expenseChart = document.getElementById('expenseChart');
//     const categoryChart = document.getElementById('categoryChart');
    
//     if (expenseChart) {
//         const expenseCtx = expenseChart.getContext('2d');
//         new Chart(expenseCtx, {
//             type: "line",
//             data: {
//                 labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//                 datasets: [{
//                     label: "Expenses",
//                     data: [3200, 4500, 3800, 5200, 4800, 6100],
//                     borderColor: "#4f46e5",
//                     backgroundColor: "rgba(79, 70, 229, 0.1)",
//                     tension: 0.4,
//                     fill: true,
//                 }],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//                 scales: {
//                     y: { beginAtZero: true },
//                     x: { grid: { display: false } }
//                 },
//             },
//         });
//     }
    
//     if (categoryChart) {
//         const categoryCtx = categoryChart.getContext('2d');
//         new Chart(categoryCtx, {
//             type: "doughnut",
//             data: {
//                 labels: ["Materials", "Food", "Transport", "Maintenance", "Technology"],
//                 datasets: [{
//                     data: [25, 35, 15, 15, 10],
//                     backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"],
//                     borderWidth: 0,
//                 }],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { position: "bottom" } },
//             },
//         });
//     }
// }

// // Handle window resize
// window.addEventListener('resize', function() {
//     // Reinitialize charts or adjust layout if needed
//     if (window.innerWidth >= 1024) {
//         const sidebar = document.querySelector('.sidebar');
//         const overlay = document.getElementById('overlay');
//         if (sidebar) sidebar.classList.remove('active');
//         if (overlay) overlay.classList.remove('active');
//         document.body.style.overflow = 'auto';
//     }
// });
// Mobile sidebar functionality
document.addEventListener("DOMContentLoaded", function () {
    initializeSidebar();
    initializeActivePage();
    initializeCharts();
});

function initializeSidebar() {
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("overlay");

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", openSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });
    });

    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
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
                    y: { 
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                        },
                    },
                    x: { 
                        grid: { 
                            display: false 
                        } 
                    }
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
                plugins: { 
                    legend: { 
                        position: "bottom",
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                        }
                    } 
                },
                cutout: '60%',
            },
        });
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add click handlers for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Upgrade button
    const upgradeBtn = document.querySelector('.sidebar-upgrade button');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            alert('Upgrade functionality would be implemented here!');
        });
    }

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('You have 3 new notifications!');
        });
    }

    // View Details buttons
    const viewDetailsBtns = document.querySelectorAll('.text-indigo-600');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.chart-card').querySelector('h3').textContent;
            alert(`Viewing details for: ${section}`);
        });
    });
});