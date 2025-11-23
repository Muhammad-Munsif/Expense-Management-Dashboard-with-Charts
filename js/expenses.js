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

  // Expense control buttons
  const controlButtons = document.querySelectorAll(
    ".control-btn:not(.add-expense-btn)"
  );
  controlButtons.forEach((button) => {
    button.addEventListener("click", function () {
      controlButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add expense button functionality
  const addExpenseBtn = document.querySelector(".add-expense-btn");
  if (addExpenseBtn) {
    addExpenseBtn.addEventListener("click", function () {
      alert("Add Expense form would open here");
      // In a real application, this would open a modal or form
    });
  }

  // Table action buttons
  const exportBtn = document.querySelector(".table-action-btn:nth-child(1)");
  const printBtn = document.querySelector(".table-action-btn:nth-child(2)");

  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      alert("Exporting expense data...");
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", function () {
      alert("Printing expense report...");
    });
  }

  // Expense action buttons
  const editButtons = document.querySelectorAll(".action-btn.edit");
  const deleteButtons = document.querySelectorAll(".action-btn.delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const expenseName = this.closest(
        ".expense-row, .mobile-expense-card"
      ).querySelector("h4").textContent;
      alert(`Edit expense: ${expenseName}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const expenseName = this.closest(
        ".expense-row, .mobile-expense-card"
      ).querySelector("h4").textContent;
      if (
        confirm(`Are you sure you want to delete the expense "${expenseName}"?`)
      ) {
        alert(`Expense "${expenseName}" would be deleted`);
      }
    });
  });

  // Expense row click for details
  const expenseRows = document.querySelectorAll(
    ".expense-row, .mobile-expense-card"
  );
  expenseRows.forEach((row) => {
    row.addEventListener("click", function (e) {
      if (!e.target.closest(".action-btn")) {
        const expenseName = this.querySelector("h4").textContent;
        alert(`View details for: ${expenseName}`);
      }
    });
  });
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
