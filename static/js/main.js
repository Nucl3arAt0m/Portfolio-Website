/**
 * Main JavaScript file for Manav Thakkar's portfolio
 * This file contains global functionality used across the site
 */

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-links");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Toggle clicked");

      if (navMenu.style.right === "0px") {
        navMenu.style.right = "-100%";
      } else {
        navMenu.style.right = "0px";
      }
    });
  }

  //  if(navMenu.style.display === "block"){
  //     navMenu.style.display = "none";
  //  }else{
  //     navMenu.style.display = "block";
  //  }

  // Initialize matrix background effect
  initMatrixEffect();

  // Add scan line effect to terminal content
  addScanLineEffect();

  // Initialize logo hover effects
  initLogoEffects();

  // Theme toggle functionality (if implemented)
  // initThemeToggle();
});

/**
 * Initialize Matrix-style background effect on terminal content
 */
function initMatrixEffect() {
  const terminalContents = document.querySelectorAll(".terminal-content");

  terminalContents.forEach((container) => {
    // Create matrix effect container if it doesn't exist
    if (!container.querySelector(".matrix-effect")) {
      const matrixEffect = document.createElement("div");
      matrixEffect.className = "matrix-effect";
      container.appendChild(matrixEffect);

      // Generate matrix characters
      for (let i = 0; i < 50; i++) {
        createMatrixRain(matrixEffect);
      }
    }
  });
}

/**
 * Create a single matrix rain column
 * @param {HTMLElement} container - The container element for the effect
 */
function createMatrixRain(container) {
  const rain = document.createElement("div");
  rain.className = "matrix-rain";
  rain.style.left = `${Math.random() * 100}%`;
  rain.style.animationDuration = `${Math.random() * 10 + 5}s`;
  rain.style.opacity = Math.random() * 0.3 + 0.1;

  // Generate random binary/characters
  const chars = "01";
  let text = "";
  for (let i = 0; i < Math.random() * 20 + 5; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  rain.textContent = text;

  container.appendChild(rain);

  // Remove after animation completes
  setTimeout(() => {
    rain.remove();
    createMatrixRain(container);
  }, parseFloat(rain.style.animationDuration) * 1000);
}

/**
 * Add scan line effect to terminal content
 */
function addScanLineEffect() {
  const terminalContents = document.querySelectorAll(".terminal-content");

  terminalContents.forEach((container) => {
    // Create scan line if it doesn't exist
    if (!container.querySelector(".scan-line")) {
      const scanLine = document.createElement("div");
      scanLine.className = "scan-line";
      container.appendChild(scanLine);
    }
  });
}

/**
 * Initialize logo hover effects
 */
function initLogoEffects() {
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("mouseover", function () {
      this.style.filter = "drop-shadow(0 0 10px var(--accent-color))";
      this.style.transform = "scale(1.1)";
    });

    logo.addEventListener("mouseout", function () {
      this.style.filter = "";
      this.style.transform = "";
    });
  }
}

/**
 * Helper function to format date and time
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date/time string
 */
function formatDateTime(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Create a terminal typing effect
 * @param {string} elementSelector - CSS selector for the target element
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 * @param {Function} callback - Callback function to run after typing completes
 */
function terminalTypingEffect(
  elementSelector,
  text,
  speed = 50,
  callback = null
) {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  let i = 0;
  element.textContent = "";

  function typeCharacter() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeCharacter, speed);
    } else if (callback && typeof callback === "function") {
      callback();
    }
  }

  typeCharacter();
}

/**
 * Add a glitch effect to an element
 * @param {string} elementSelector - CSS selector for the target element
 * @param {number} duration - Duration of the effect in milliseconds
 */
function glitchEffect(elementSelector, duration = 1000) {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  element.classList.add("glitch-effect");

  setTimeout(() => {
    element.classList.remove("glitch-effect");
  }, duration);
}

/**
 * Simulate a terminal command and response
 * @param {string} containerSelector - CSS selector for the container
 * @param {string} command - Command text
 * @param {string} response - Response text
 * @param {number} delay - Delay before showing the response
 */
function simulateTerminalCommand(
  containerSelector,
  command,
  response,
  delay = 300
) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const commandEl = document.createElement("div");
  commandEl.className = "terminal-command";
  commandEl.innerHTML = `<span class="prompt">$</span> ${command}`;
  container.appendChild(commandEl);

  setTimeout(() => {
    const responseEl = document.createElement("div");
    responseEl.className = "terminal-response";
    responseEl.textContent = response;
    container.appendChild(responseEl);
  }, delay);
}
