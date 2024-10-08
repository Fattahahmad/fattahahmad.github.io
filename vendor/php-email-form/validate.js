fetch(action, {
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
  thisForm.querySelector('.loading').classList.remove('d-block');
  if (data.success) {
    thisForm.querySelector('.sent-message').classList.add('d-block');
    thisForm.reset(); // Reset form setelah sukses
  } else {
    throw new Error(data.message || 'Form submission failed');
  }
})
.catch((error) => {
  console.error('Error during form submission:', error); // Logging ke console
  displayError(thisForm, error);
});
