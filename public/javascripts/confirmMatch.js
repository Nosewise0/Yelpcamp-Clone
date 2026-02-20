(function () {
  const form = document.getElementById("registerForm");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");

  // 🛡️ Prevent crash on pages without the form
  if (!form || !password || !confirm) return;

  form.addEventListener(
    "submit",
    function (e) {
      // Check password match
      if (password.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match");
      } else {
        confirm.setCustomValidity("");
      }

      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );

  confirm.addEventListener("input", () => {
    if (password.value !== confirm.value) {
      confirm.setCustomValidity("Passwords do not match");
    } else {
      confirm.setCustomValidity("");
    }
  });
})();
