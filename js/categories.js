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

  // Add category button functionality
  const addCategoryBtn = document.querySelector(".add-category-btn");
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener("click", function () {
      alert("Add Category functionality would open a modal or form here");
      // In a real application, this would open a modal or form
    });
  }

  // Category action buttons
  const editButtons = document.querySelectorAll(".action-btn.edit");
  const deleteButtons = document.querySelectorAll(".action-btn.delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const categoryName =
        this.closest(".category-card").querySelector("h3").textContent;
      alert(`Edit category: ${categoryName}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const categoryName =
        this.closest(".category-card").querySelector("h3").textContent;
      if (
        confirm(
          `Are you sure you want to delete the category "${categoryName}"?`
        )
      ) {
        alert(`Category "${categoryName}" would be deleted`);
      }
    });
  });

  // Category card click for details
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".action-btn")) {
        const categoryName = this.querySelector("h3").textContent;
        alert(`View details for: ${categoryName}`);
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
