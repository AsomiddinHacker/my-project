// ==================== Password Show/Hide Toggle ====================
class PasswordToggle {
  constructor() {
    this.passwordInput = document.getElementById("password");
    this.toggleButton = document.getElementById("passwordToggle");
    this.isPasswordVisible = false;

    if (this.passwordInput && this.toggleButton) {
      this.init();
    }
  }

  init() {
    this.toggleButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.togglePasswordVisibility();
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;

    // Toggle input type
    this.passwordInput.type = this.isPasswordVisible ? "text" : "password";

    // Update button icon with animation
    this.toggleButton.classList.toggle("visible");

    if (this.isPasswordVisible) {
      this.toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      this.toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }

    // Add animation
    this.toggleButton.style.animation = "none";
    setTimeout(() => {
      this.toggleButton.style.animation = "premium-bounce 0.4s ease-out";
    }, 10);

    // Focus back on input
    this.passwordInput.focus();
  }
}

// Initialize password toggle when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new PasswordToggle();
});
