/**
 * Visitor Information JavaScript
 * This file handles the visitor information display functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Fetch visitor information with a slight delay for dramatic effect
  setTimeout(fetchVisitorInfo, 1500);

  // Update the time every second
  setInterval(updateVisitorTime, 1000);

  // Add animation to visitor info display
  animateVisitorInfo();
});

/**
 * Fetch visitor information from the server
 */
function fetchVisitorInfo() {
  fetch('/get_visitor_info')
    .then((response) => response.json())
    .then((data) => {
      // Update the visitor info display with typing effect
      typewriterEffect("visitor-ip", data.ip, 100);
      setTimeout(
        () => typewriterEffect("visitor-location", data.location, 100),
        300
      );
      setTimeout(
        () => typewriterEffect("visitor-browser", data.browser, 100),
        600
      );
      setTimeout(() => typewriterEffect("visitor-os", data.os, 100), 900);
      setTimeout(() => updateVisitorTime(), 1200);

      // Play a "scan complete" sound if enabled
      // playSound('scan-complete');

      // Display notification
      displayNotification(
        "Visitor scan complete",
        "All visitor data successfully captured."
      );
    })
    .catch((error) => {
      console.error("Error fetching visitor info:", error);
      document.getElementById("visitor-ip").textContent = "Connection error";
      document.getElementById("visitor-location").textContent =
        "Data unavailable";
      document.getElementById("visitor-browser").textContent = "Unknown";
      document.getElementById("visitor-os").textContent = "Unknown";
    });
}

/**
 * Update the visitor time display
 */
function updateVisitorTime() {
  const timeElement = document.getElementById("visitor-time");
  if (timeElement) {
    timeElement.textContent = formatDateTime(new Date());
  }
}

/**
 * Create a typewriter effect on an element
 * @param {string} elementId - ID of the target element
 * @param {string} text - Text to display
 * @param {number} speed - Speed of typing in milliseconds
 */
function typewriterEffect(elementId, text, speed) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let i = 0;
  element.textContent = "";
  element.style.borderRight = "0.15em solid var(--accent-color)";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = "none";
    }
  }

  type();
}

/**
 * Add animations to visitor info panel
 */
function animateVisitorInfo() {
  const infoHeader = document.querySelector(".info-header");
  const infoItems = document.querySelectorAll(".info-item");

  if (infoHeader) {
    // Add pulse effect to header
    setInterval(() => {
      infoHeader.classList.add("pulse");
      setTimeout(() => {
        infoHeader.classList.remove("pulse");
      }, 1000);
    }, 5000);
  }

  // Add hover effect to info items
  infoItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(0, 119, 255, 0.1)";
      this.style.transform = "translateX(5px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
      this.style.transform = "";
    });
  });
}

/**
 * Display a notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
function displayNotification(title, message) {
  // Check if notifications container exists, create if not
  let container = document.querySelector(".notifications-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "notifications-container";
    document.body.appendChild(container);

    // Add style if not already in CSS
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                .notifications-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    max-width: 300px;
                }
                .notification {
                    background-color: rgba(20, 20, 20, 0.9);
                    color: var(--text-color);
                    border-left: 4px solid var(--accent-color);
                    padding: 15px;
                    margin-top: 10px;
                    border-radius: 4px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    transform: translateX(120%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-title {
                    font-weight: bold;
                    color: var(--accent-color);
                    margin-bottom: 5px;
                }
                .notification-message {
                    font-size: 0.9rem;
                }
                .notification-close {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    cursor: pointer;
                    color: var(--text-color);
                    opacity: 0.7;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";

  notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <span class="notification-close">&times;</span>
    `;

  container.appendChild(notification);

  // Show notification with delay for animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", function () {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}
