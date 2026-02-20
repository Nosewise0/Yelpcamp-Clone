(function () {
    const toggle = document.getElementById('togglePassword');
    const pwd = document.getElementById('password');
    toggle?.addEventListener('click', () => {
      const icon = toggle.querySelector('i');
      if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        toggle.title = 'Hide password';
      } else {
        pwd.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        toggle.title = 'Show password';
      }
    });
  })();