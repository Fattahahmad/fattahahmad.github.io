(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;
      let action = "https://getform.io/f/YOUR_FORM_ID"; // Ubah dengan URL form action
      let formData = new FormData(thisForm);

      // Reset pesan error dan tampilkan loading
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())  // Mengambil respons JSON
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      
      // Cek apakah 'success' dari JSON true
      if (data.success) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();  // Reset form setelah sukses
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
