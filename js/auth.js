/* Authentication JavaScript - Stackly Growth Solutions */

document.addEventListener('DOMContentLoaded', () => {
  initEyeToggles();
  initRegistrationValidation();
  initLoginValidation();
});

/* ==========================================
   1. Eye Toggle Functionality
   ========================================== */
function initEyeToggles() {
  const eyeToggles = document.querySelectorAll('.eye-toggle');
  
  eyeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const wrapper = toggle.closest('.input-wrapper');
      if (!wrapper) return;
      const input = wrapper.querySelector('input');
      const eyeIcon = toggle.querySelector('.eye-icon');
      if (!input || !eyeIcon) return;
      
      if (input.type === 'password') {
        input.type = 'text';
        // Eye Open Icon SVG
        eyeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      } else {
        input.type = 'password';
        // Eye Closed Icon SVG
        eyeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      }
    });
  });
}

/* ==========================================
   2. Helper functions for Validation
   ========================================== */
function showError(input, message) {
  const group = input.closest('.form-group');
  const errorMsg = group.querySelector('.error-msg');
  
  input.classList.remove('input-valid');
  input.classList.add('input-invalid');
  
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
  }
}

function showSuccess(input) {
  const group = input.closest('.form-group');
  const errorMsg = group.querySelector('.error-msg');
  
  input.classList.remove('input-invalid');
  input.classList.add('input-valid');
  
  if (errorMsg) {
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');
  }
}

function shakeElement(element) {
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 400);
}

/* ==========================================
   3. Create Account (Registration) Page Validation
   ========================================== */
function initRegistrationValidation() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;
  
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const mobileInput = document.getElementById('reg-mobile');
  const passwordInput = document.getElementById('reg-password');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const termsCheckbox = document.getElementById('reg-terms');
  
  // Real-time validations
  nameInput.addEventListener('input', () => {
    const value = nameInput.value;
    const alphabetRegex = /^[A-Za-z\s]+$/;
    
    if (value.trim() === '') {
      showError(nameInput, 'Name is required.');
    } else if (!alphabetRegex.test(value)) {
      showError(nameInput, 'Name should accept only alphabets.');
    } else if (value.length > 16) {
      showError(nameInput, 'Name must be maximum 16 characters.');
    } else {
      showSuccess(nameInput);
    }
  });

  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (value === '') {
      showError(emailInput, 'Email is required.');
    } else if (!emailRegex.test(value)) {
      showError(emailInput, 'Include a valid email format (e.g. name@domain.com).');
    } else {
      showSuccess(emailInput);
    }
  });

  mobileInput.addEventListener('input', () => {
    const value = mobileInput.value.trim();
    const numberRegex = /^[0-9]+$/;
    
    if (value === '') {
      showError(mobileInput, 'Mobile number is required.');
    } else if (!numberRegex.test(value)) {
      showError(mobileInput, 'Mobile number must contain digits only.');
    } else if (value.length !== 10) {
      showError(mobileInput, 'Mobile number must be exactly 10 digits.');
    } else {
      showSuccess(mobileInput);
    }
  });

  // Password Strength and Validation
  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    const strengthMeter = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-label');
    
    let score = 0;
    
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    
    // Update Strength UI
    const bars = strengthMeter.querySelectorAll('.strength-bar');
    bars.forEach(bar => {
      bar.style.backgroundColor = 'transparent';
    });
    
    if (value === '') {
      strengthText.textContent = '';
      showError(passwordInput, 'Password is required.');
    } else {
      let color = '#ef4444'; // Red
      let text = 'Very Weak';
      
      if (score === 1 || score === 2) {
        color = '#ef4444';
        text = 'Weak';
        bars[0].style.backgroundColor = color;
      } else if (score === 3) {
        color = '#f59e0b'; // Amber
        text = 'Moderate';
        bars[0].style.backgroundColor = color;
        bars[1].style.backgroundColor = color;
        bars[2].style.backgroundColor = color;
      } else if (score >= 4) {
        color = '#10b981'; // Green
        text = 'Strong';
        bars.forEach(bar => bar.style.backgroundColor = color);
      }
      
      strengthText.textContent = `Strength: ${text}`;
      strengthText.style.color = color;
      
      // Strict constraints check
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[^A-Za-z0-9]/.test(value);
      
      if (value.length < 8) {
        showError(passwordInput, 'Password must be minimum 8 characters.');
      } else if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
        showError(passwordInput, 'Must contain uppercase, lowercase, number, and special character.');
      } else {
        showSuccess(passwordInput);
      }
    }
  });

  confirmPasswordInput.addEventListener('input', () => {
    const confirmVal = confirmPasswordInput.value;
    const passwordVal = passwordInput.value;
    
    if (confirmVal === '') {
      showError(confirmPasswordInput, 'Confirm password is required.');
    } else if (confirmVal !== passwordVal) {
      showError(confirmPasswordInput, 'Confirm Password should match Password.');
    } else {
      showSuccess(confirmPasswordInput);
    }
  });

  // Submit validation
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Trigger input validation on all
    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    mobileInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    
    let isTermsValid = true;
    if (!termsCheckbox.checked) {
      isTermsValid = false;
      const termsWrapper = termsCheckbox.closest('.checkbox-label');
      shakeElement(termsWrapper);
      alert('You must accept the Terms & Conditions.');
    }
    
    const invalidInputs = registerForm.querySelectorAll('.input-invalid');
    
    if (invalidInputs.length > 0 || !isTermsValid) {
      shakeElement(registerForm.closest('.auth-card'));
    } else {
      // Simulate account creation success
      alert('Registration Successful! Redirecting to login...');
      window.location.href = 'login.html';
    }
  });
}

/* ==========================================
   4. Login Page Validation & Role Redirect
   ========================================== */
function initLoginValidation() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const roleSelect = document.getElementById('login-role');
  const rememberCheckbox = document.getElementById('login-remember');
  
  emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (value === '') {
      showError(emailInput, 'Email is required.');
    } else if (!emailRegex.test(value)) {
      showError(emailInput, 'Include a valid email format.');
    } else {
      showSuccess(emailInput);
    }
  });

  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);
    
    if (value === '') {
      showError(passwordInput, 'Password is required.');
    } else if (value.length <= 8) {
      showError(passwordInput, 'Password must be more than 8 letters.');
    } else if (!hasUppercase) {
      showError(passwordInput, 'Must contain at least 1 capital letter.');
    } else if (!hasLowercase) {
      showError(passwordInput, 'Must contain lowercase letters.');
    } else if (!hasNumber) {
      showError(passwordInput, 'Must contain at least 1 number.');
    } else if (!hasSpecial) {
      showError(passwordInput, 'Must contain at least 1 symbol.');
    } else {
      showSuccess(passwordInput);
    }
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    
    let isRememberValid = true;
    if (rememberCheckbox && !rememberCheckbox.checked) {
      isRememberValid = false;
      const checkboxLabel = rememberCheckbox.closest('.checkbox-label');
      if (checkboxLabel) {
        shakeElement(checkboxLabel);
      }
    }
    
    const invalidInputs = loginForm.querySelectorAll('.input-invalid');
    
    if (invalidInputs.length > 0 || !isRememberValid) {
      shakeElement(loginForm.closest('.auth-card'));
      if (!isRememberValid) {
        alert('Please check the "Remember Me" option to sign in.');
      }
    } else {
      // Check roles select dropdown and redirect
      const role = roleSelect.value;
      alert(`Login Successful! Redirecting to ${role} dashboard...`);
      
      if (role === 'Admin') {
        window.location.href = 'dashboard-admin.html';
      } else {
        window.location.href = 'dashboard-user.html';
      }
    }
  });
}
