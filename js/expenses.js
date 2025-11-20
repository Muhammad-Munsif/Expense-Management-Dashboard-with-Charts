// Interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add expense button
  const addExpenseBtn = document.getElementById("addExpenseBtn");
  addExpenseBtn.addEventListener("click", function () {
    alert("Add Expense form would open here");
    // In a real application, this would open a modal or form
  });

  // Simulate progress bar animation
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });

  // Table row interactions
  const tableRows = document.querySelectorAll(".expense-row");
  tableRows.forEach((row) => {
    row.addEventListener("click", function (e) {
      if (!e.target.closest("button")) {
        // In a real app, this would open a detail view
        console.log(
          "Expense details for:",
          this.querySelector(".font-medium").textContent
        );
      }
    });
  });
});
