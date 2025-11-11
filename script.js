document.addEventListener('DOMContentLoaded', () => {

      // --- 1. Get Element References ---
      const form = document.getElementById('contactForm');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      const successMessage = document.getElementById('successMessage');

      // --- 2. Functions to Show/Hide Errors ---

      function showError(inputEl, errorEl, message) {
            inputEl.classList.add('input-error');
            errorEl.textContent = message;
            errorEl.classList.add('show');
      }

      function hideError(inputEl, errorEl) {
            inputEl.classList.remove('input-error');
            errorEl.textContent = '';
            errorEl.classList.remove('show');
      }


      function clearAllFeedback() {
            hideError(nameInput, nameError);
            hideError(emailInput, emailError);
            hideError(messageInput, messageError);
            successMessage.classList.add('hidden');
      }

      // --- 3. Validation Logic Functions ---

      function validateName() {
            const value = nameInput.value.trim();
            if (value === '') {
                  showError(nameInput, nameError, 'Name is required.');
                  return false;
            }
            hideError(nameInput, nameError);
            return true;
      }

      function validateEmail() {
            const value = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value === '') {
                  showError(emailInput, emailError, 'Email is required.');
                  return false;
            }
            if (!emailRegex.test(value)) {
                  showError(emailInput, emailError, 'Please enter a valid email address.');
                  return false;
            }
            hideError(emailInput, emailError);
            return true;
      }

      function validateMessage() {
            const value = messageInput.value.trim();
            if (value === '') {
                  showError(messageInput, messageError, 'Message cannot be empty.');
                  return false;
            }
            hideError(messageInput, messageError);
            return true;
      }

      // --- 4. Event Listeners ---

      // Add 'input' event listeners for real-time validation
      nameInput.addEventListener('input', validateName);
      emailInput.addEventListener('input', validateEmail);
      messageInput.addEventListener('input', validateMessage);

      // Add 'submit' event listener to validate all fields before submission
      form.addEventListener('submit', (event) => {
            // Prevent the form from submitting by default
            event.preventDefault();

            // Run all validations
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            // Check if the entire form is valid
            if (isNameValid && isEmailValid && isMessageValid) {

                  // --- Form is valid! ---
                  console.log('Form submitted successfully with data:', {
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        subject: document.getElementById('subject').value.trim(),
                        message: messageInput.value.trim()
                  });

                  // Show success message
                  successMessage.classList.remove('hidden');

                  // Reset the form
                  form.reset();

                  // Manually clear any lingering error styles (though reset should handle inputs)
                  clearAllFeedback();

                  // Hide success message after 5 seconds
                  setTimeout(() => {
                        successMessage.classList.add('hidden');
                  }, 5000);

            } else {
                  // --- Form is invalid! ---
                  console.log('Form validation failed.');
                  // Errors are already displayed by the validation functions
            }
      });
});