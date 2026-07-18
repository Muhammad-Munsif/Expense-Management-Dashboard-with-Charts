/* ============================================================
   JS/SETTINGS.JS (Settings page - full interactive)
   ============================================================ */
(function () {
  // School Info
  const schoolName = document.querySelector('.bg-card input[value="Greenwood High School"]');
  const schoolAddress = document.querySelector('.bg-card input[value="123 Education Ave"]');
  const updateSchoolBtn = document.querySelector('.bg-card .btn-primary');

  updateSchoolBtn?.addEventListener('click', function () {
    const name = schoolName?.value || 'Greenwood High School';
    const address = schoolAddress?.value || '123 Education Ave';
    alert(`School info updated:\nName: ${name}\nAddress: ${address}`);
  });

  // Security - Change Password
  const currentPass = document.querySelector('.bg-card input[type="password"][value="••••••••"]');
  const newPass = document.querySelector('.bg-card input[type="password"][placeholder="Enter new password"]');
  const changePassBtn = document.querySelectorAll('.bg-card .btn-primary')[1];

  changePassBtn?.addEventListener('click', function () {
    if (!newPass || newPass.value.length < 6) {
      alert('New password must be at least 6 characters.');
      return;
    }
    alert('Password changed successfully!');
    if (currentPass) currentPass.value = '••••••••';
    if (newPass) newPass.value = '';
  });

  // Notifications - Save Preferences
  const notifCheckboxes = document.querySelectorAll('.bg-card input[type="checkbox"]');
  const savePrefBtn = document.querySelector('.bg-card .btn-primary.mt-4');

  savePrefBtn?.addEventListener('click', function () {
    const prefs = [];
    notifCheckboxes.forEach((cb, i) => {
      prefs.push(`${cb.parentElement.textContent.trim()}: ${cb.checked ? 'ON' : 'OFF'}`);
    });
    alert(`Preferences saved:\n${prefs.join('\n')}`);
  });

  // System Status - refresh indicator (demo)
  const statusItems = document.querySelectorAll('.bg-card .grid .font-semibold');
  setInterval(() => {
    // Simulate live update for storage
    const storage = statusItems[0];
    if (storage) {
      const val = 60 + Math.floor(Math.random() * 10);
      storage.textContent = val + '%';
    }
  }, 3000);

  console.log('Settings page fully interactive');
})();