 // Form validation for file input
  const form = document.querySelector('.needs-validation');
  const fileInput = document.getElementById('image');

  form.addEventListener('submit', function(event) {
    // Check if at least one file is selected
    if (!fileInput.files || fileInput.files.length === 0) {
      fileInput.classList.add('is-invalid');
      fileInput.classList.remove('is-valid');
      event.preventDefault();
      event.stopPropagation();
    } else {
      fileInput.classList.remove('is-invalid');
      fileInput.classList.add('is-valid');
    }
    
    form.classList.add('was-validated');
  }, false);

  // Mark as valid when files are selected
  fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      this.classList.add('is-valid');
      this.classList.remove('is-invalid');
    } else {
      this.classList.remove('is-valid');
      this.classList.add('is-invalid');
    }
  });