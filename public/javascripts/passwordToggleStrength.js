 (function(){
    const pwd = document.getElementById('password');
    const toggle = document.getElementById('togglePwd');
    const strengthText = document.getElementById('pwdStrength');

    toggle?.addEventListener('click', () => {
      const icon = toggle.querySelector('i');
      if (pwd.type === 'password') { pwd.type = 'text'; icon.classList.replace('bi-eye','bi-eye-slash'); }
      else { pwd.type = 'password'; icon.classList.replace('bi-eye-slash','bi-eye'); }
    });

    function scorePassword(p){
      let score=0;
      if (!p) return score;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      return score;
    }

    pwd?.addEventListener('input', () => {
      const s = scorePassword(pwd.value);
      const labels = ['Very weak','Weak','Ok','Strong','Very strong'];
      strengthText.textContent = labels[s];
      strengthText.style.color = ['#dc3545','#ff8800','#f0ad4e','#28a745','#0f9d58'][s] || '#666';
    });
  })();