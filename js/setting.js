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

  mobileToggle.addEventListener("click", openSidebar);
  closeSidebar.addEventListener("click", closeSidebarFunc);
  overlay.addEventListener("click", closeSidebarFunc);

  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Settings card interactions
  const settingsCards = document.querySelectorAll(".settings-card");
  settingsCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
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
});
