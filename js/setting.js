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

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to current button and content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Toggle switch functionality
  const toggleSwitches = document.querySelectorAll(".toggle-switch input");
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const label = this.parentElement;
      if (this.checked) {
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
    });
  });

  // Action card functionality
  const actionCards = document.querySelectorAll(".action-card");
  actionCards.forEach((card) => {
    card.addEventListener("click", function () {
      const actionTitle = this.querySelector("h4").textContent;
      alert(`Action: ${actionTitle}`);
    });
  });

  // Save buttons functionality
  const resetBtn = document.querySelector(".btn:not(.btn-primary)");
  const saveBtn = document.querySelector(".btn-primary");

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to reset all settings to default?")) {
        alert("Settings have been reset to default values");
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      alert("Settings have been saved successfully!");
    });
  }
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
