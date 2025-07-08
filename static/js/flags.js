// /**
//  * Flags JavaScript
//  * This file handles the progress tracking and flag capture system
//  *
//  * The system now properly maintains flag state across all pages including the homepage
//  */

// // Make updateFlagsDisplay available globally
// window.updateFlagsDisplay = updateFlagsDisplay;

// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize flags display
//   initializeFlagsDisplay();

//   // Check if progress already exists in the DOM
//   const progressElement = document.getElementById("progress");
//   const flagsCountElement = document.getElementById("flags-count");

//   if (progressElement && flagsCountElement) {
//     // Update the progress display
//     updateFlagsDisplay();
//   }

//   // Add visual effects when capturing a flag
//   document.addEventListener("flagCaptured", function (e) {
//     showFlagCaptureNotification(e.detail.flagName);
//     updateFlagsDisplay();
//   });

//   // Add listener for resume download
//   const resumeDownload = document.getElementById("download-resume");
//   if (resumeDownload) {
//     resumeDownload.addEventListener("click", function (e) {
//       // Capture flag via AJAX
//       fetch("/capture_resume_flag")
//         .then((response) => response.json())
//         .then((data) => {
//           // Update progress display
//           updateProgressBar(data.percentage);
//           updateFlagsCount(data.captured_flags, data.total_flags);

//           // Store flag data in localStorage as backup
//           localStorage.setItem("flagsProgress", JSON.stringify(data));

//           // Update flags display
//           updateFlagsDisplay();

//           // Show notification
//           showFlagCaptureNotification("resume");
//         })
//         .catch((error) => {
//           console.error("Error capturing resume flag:", error);
//         });
//     });
//   }

//   // Check if current page should trigger a flag capture
//   checkCurrentPageFlag();
// });

// /**
//  * Check if the current page should trigger a flag capture
//  */
// function checkCurrentPageFlag() {
//   // Get the current path
//   const path = window.location.pathname;

//   // Map paths to flag names
//   const pathToFlag = {
//     "/about.html": "about",
//     "/experience.html": "experience",
//     "/projects.html": "projects",
//     "/certifications.html": "certifications",
//     "/contact.html": "contact",
//   };

//   // If path is in the map, this page should already have its flag captured
//   // We don't need to do anything since the server should have captured it
//   // This function could be expanded if needed for client-side only flag tracking
// }

// /**
//  * Initialize the flags display in the progress bar
//  */
// function initializeFlagsDisplay() {
//   const progressContainer = document.getElementById("progress-container");
//   if (!progressContainer) return;

//   // Check if flags display already exists
//   if (document.getElementById("flags-display")) return;

//   // Create flags display container
//   const flagsDisplay = document.createElement("div");
//   flagsDisplay.id = "flags-display";

//   // Define all available flags with icons and labels
//   const flags = [
//     { name: "about.html", icon: "fas fa-user-secret", tooltip: "Intel File" },
//     { name: "experience.html", icon: "fas fa-briefcase", tooltip: "Mission Logs" },
//     { name: "projects.html", icon: "fas fa-code-branch", tooltip: "Operations" },
//     {
//       name: "certifications.html",
//       icon: "fas fa-certificate",
//       tooltip: "Clearances",
//     },
//     {
//       name: "contact.html",
//       icon: "fas fa-satellite-dish",
//       tooltip: "Comms Channel",
//     },
//     {
//       name: "resume",
//       icon: "fas fa-file-download",
//       tooltip: "Resume Download",
//     },
//   ];

//   // Create flag icons
//   flags.forEach((flag) => {
//     const flagIcon = document.createElement("div");
//     flagIcon.className = "flag-icon";
//     flagIcon.dataset.flag = flag.name;
//     flagIcon.dataset.tooltip = flag.tooltip;
//     flagIcon.innerHTML = `<i class="${flag.icon}"></i>`;
//     flagsDisplay.appendChild(flagIcon);
//   });

//   // Add to DOM
//   progressContainer.appendChild(flagsDisplay);
// }

// /**
//  * Update the flags display based on captured flags
//  */
// function updateFlagsDisplay() {
//   const flagIcons = document.querySelectorAll(".flag-icon");
//   if (!flagIcons.length) return;

//   // Get progress element and extract flags data
//   const progressElement = document.getElementById("progress");
//   if (!progressElement) return;

//   // Try to get data from data attribute if available
//   let flagsData = null;

//   if (progressElement.dataset.flags) {
//     try {
//       flagsData = JSON.parse(progressElement.dataset.flags);
//     } catch (e) {
//       console.error("Error parsing flags data:", e);
//     }
//   }

//   // If we couldn't get flags data from data attribute, try alternative methods
//   if (!flagsData) {
//     // Try to get from localStorage as backup
//     const storedProgress = localStorage.getItem("flagsProgress");
//     if (storedProgress) {
//       try {
//         const progressData = JSON.parse(storedProgress);
//         if (progressData.flags) {
//           flagsData = progressData.flags;
//         }
//       } catch (e) {
//         console.error("Error parsing stored progress:", e);
//       }
//     }

//     // If still no data, make an educated guess based on the current URL
//     if (!flagsData) {
//       const flagsCountElement = document.getElementById("flags-count");
//       if (flagsCountElement) {
//         const capturedCount = parseInt(flagsCountElement.textContent);
//         flagsData = guessFlagsFromURL(capturedCount);
//       }
//     }
//   }

//   // Update flag icons based on data
//   if (flagsData) {
//     flagIcons.forEach((icon) => {
//       const flagName = icon.dataset.flag;
//       if (flagsData[flagName]) {
//         icon.classList.add("captured");
//       } else {
//         icon.classList.remove("captured");
//       }
//     });
//   }
// }

// /**
//  * Make an educated guess about which flags are captured based on URL
//  * @param {number} capturedCount - Number of flags captured
//  * @returns {Object} Estimated flags object
//  */
// function guessFlagsFromURL(capturedCount) {
//   const path = window.location.pathname;
//   const flags = {
//     about: false,
//     experience: false,
//     projects: false,
//     certifications: false,
//     contact: false,
//     resume: false,
//   };

//   // Mark current page's flag as captured
//   if (path === "/about.html") flags.about = true;
//   else if (path === "/experience.html") flags.experience = true;
//   else if (path === "/projects.html") flags.projects = true;
//   else if (path === "/certifications.html") flags.certifications = true;
//   else if (path === "/contact.html") flags.contact = true;

//   // If resume was downloaded, we might have a flag for that too
//   const resumeClicked = localStorage.getItem("resumeDownloaded");
//   if (resumeClicked === "true") {
//     flags.resume = true;
//   }

//   return flags;
// }

// /**
//  * Update the progress bar
//  * @param {number} percentage - Progress percentage
//  */
// function updateProgressBar(percentage) {
//   const progressElement = document.getElementById("progress");
//   if (progressElement) {
//     progressElement.style.width = `${percentage}%`;
//   }
// }

// /**
//  * Update the flags count display
//  * @param {number} captured - Number of captured flags
//  * @param {number} total - Total number of flags
//  */
// function updateFlagsCount(captured, total) {
//   const flagsCountElement = document.getElementById("flags-count");
//   if (flagsCountElement) {
//     flagsCountElement.textContent = captured;

//     // Update the text to be more friendly
//     const flagsTextElement = document.getElementById("flags-captured");
//     if (flagsTextElement) {
//       const percentage = Math.round((captured / total) * 100);
//       flagsTextElement.innerHTML = `You've learned <span id="flags-count">${captured}</span>/${total} about Manav (${percentage}%)`;
//     }
//   }
// }

// /**
//  * Show a notification when a flag is captured
//  * @param {string} flagName - Name of the captured flag
//  */
// function showFlagCaptureNotification(flagName) {
//   // Map flag names to descriptive titles
//   const flagTitles = {
//     about: "Personal Background",
//     experience: "Professional Experience",
//     projects: "Project Portfolio",
//     certifications: "Professional Certifications",
//     contact: "Contact Information",
//     resume: "Full Resume",
//   };

//   // Create notification element
//   const notification = document.createElement("div");
//   notification.className = "flag-notification";

//   // Format the flag name for display
//   const formattedName =
//     flagTitles[flagName] ||
//     flagName.charAt(0).toUpperCase() + flagName.slice(1);

//   // Set content
//   notification.innerHTML = `
//         <div class="flag-icon-notify"><i class="fas fa-lightbulb"></i></div>
//         <div class="flag-message">
//             <div class="flag-title">New Knowledge Acquired!</div>
//             <div class="flag-details">You've learned about ${formattedName}</div>
//         </div>
//     `;

//   // Add to DOM
//   document.body.appendChild(notification);

//   // Display with animation
//   setTimeout(() => {
//     notification.classList.add("show");
//   }, 100);

//   // Remove after animation
//   setTimeout(() => {
//     notification.classList.remove("show");
//     setTimeout(() => {
//       notification.remove();
//     }, 500);
//   }, 5000);

//   // If this is a resume download, mark it in localStorage
//   if (flagName === "resume") {
//     localStorage.setItem("resumeDownloaded", "true");
//   }
// }
