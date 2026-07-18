/* ============================================================
   JS/CATEGORIES.JS (Categories page - basic CRUD)
   ============================================================ */
(function () {
  // Simple category management with static data
  let categories = [
    { id: 1, name: 'Materials', budget: 1000, spent: 650 },
    { id: 2, name: 'Food', budget: 2500, spent: 2100 },
    { id: 3, name: 'Transport', budget: 1800, spent: 950 },
  ];
  let nextId = 4;

  const tbody = document.getElementById('categoryTableBody');

  function renderTable() {
    let html = '';
    categories.forEach(c => {
      html += `<tr>
        <td><strong>${c.name}</strong></td>
        <td>$${c.budget.toFixed(2)}</td>
        <td>$${c.spent.toFixed(2)}</td>
        <td>$${(c.budget - c.spent).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-primary editCat" data-id="${c.id}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger deleteCat" data-id="${c.id}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    });
    tbody.innerHTML = html;
    document.querySelectorAll('.editCat').forEach(b => b.addEventListener('click', onEdit));
    document.querySelectorAll('.deleteCat').forEach(b => b.addEventListener('click', onDelete));
  }

  function onEdit(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    const name = prompt('Category name:', cat.name);
    if (name) cat.name = name;
    const budget = parseFloat(prompt('Budget:', cat.budget));
    if (!isNaN(budget) && budget >= 0) cat.budget = budget;
    renderTable();
  }

  function onDelete(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    if (!confirm('Delete this category?')) return;
    categories = categories.filter(c => c.id !== id);
    renderTable();
  }

  document.getElementById('addCategoryBtn')?.addEventListener('click', function () {
    const name = prompt('Category name:');
    if (!name) return;
    const budget = parseFloat(prompt('Budget:'));
    if (isNaN(budget) || budget < 0) return alert('Invalid budget');
    categories.push({ id: nextId++, name, budget, spent: 0 });
    renderTable();
  });

  renderTable();
})();