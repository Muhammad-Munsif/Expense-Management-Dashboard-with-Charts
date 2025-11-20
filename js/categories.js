// Simple script for interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to table rows
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f9fafb";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
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
});
