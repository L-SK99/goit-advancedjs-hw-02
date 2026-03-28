const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

let formData = { email: '', message: '' };

// On page load — restore from localStorage if data exists
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData !== null) {
  formData = JSON.parse(savedData);
  emailInput.value = formData.email ?? '';
  messageInput.value = formData.message ?? '';
}

// Event delegation on the form for the 'input' event
form.addEventListener('input', e => {
  const { name, value } = e.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Submit handler
form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Clear everything
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});