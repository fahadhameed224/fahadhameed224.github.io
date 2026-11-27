/* Mobile Navigation Menu */
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
menuBtn.addEventListener("click", function () {
    navbar.classList.toggle("show");
});
// Menu link par click karne se menu band ho jayega
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("show");
    });
});
/* Dark Mode and Light Mode */
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});
/* Calculator */
const display = document.getElementById("display");
const calcButtons = document.querySelectorAll(".calc-btn");
let expression = "";
calcButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        // Clear button
        if (value === "C") {
            expression = "";
            display.value = "";
            return;
        }
        // Delete button
        if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }
        // Equal button
        if (value === "=") {
            if (expression === "") {
                return;
            }
            try {
                // Calculator ke allowed characters check karo
                if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
                    throw new Error("Invalid expression");
                }
                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();
                if (!Number.isFinite(result)) {
                    display.value = "Error";
                    expression = "";
                    return;
                }
                expression = String(result);
                display.value = expression;
            } catch (error) {
                display.value = "Error";
                expression = "";
            }
            return;
        }
        // Number ya operator display mein add karo
        expression += value;
        display.value = expression;
    });
});
/* Typing Animation */
const typingText = document.querySelector(".home-content h2");
const words = [
    "Web Developer",
    "Frontend Developer",
    "Web Designer"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    typingText.textContent = currentWord.substring(0, charIndex);
    let speed = isDeleting ? 60 : 120;
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        speed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        if (wordIndex >= words.length) {
            wordIndex = 0;
        }
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}
typeEffect();
/* Skills Progress Bar Animation */
const progressBars = document.querySelectorAll(".progress");
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            progressBars.forEach(function (bar) {
                bar.style.width = bar.dataset.width;
            });
            skillsObserver.unobserve(skillsSection);
        }
    });
}, {
    threshold: 0.3
});
skillsObserver.observe(skillsSection);
/* Project Information */
const projectsData = {
    portfolio: {
        title: "Portfolio Website",
        description: "This is my personal portfolio website created using HTML, CSS and JavaScript."
    },
    calculator: {
        title: "JavaScript Calculator",
        description: "This calculator performs basic mathematical operations like addition, subtraction, multiplication and division."
    },
    landing: {
        title: "Landing Page",
        description: "This is a modern responsive landing page designed using HTML and CSS."
    }
};
/* Project Details Buttons */
const detailsButtons = document.querySelectorAll(".details-btn");
const projectDetails = document.getElementById("projectDetails");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");
const closeDetails = document.getElementById("closeDetails");
detailsButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const projectName = button.dataset.project;
        const project = projectsData[projectName];
        detailTitle.textContent = project.title;
        detailText.textContent = project.description;
        projectDetails.classList.add("show");
        projectDetails.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});
// Close project details box
closeDetails.addEventListener("click", function () {
    projectDetails.classList.remove("show");
});
/* Project Live Demo Buttons */
const projectButtons = document.querySelectorAll(".project-btn");
projectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const projectName = button.dataset.project;
        if (projectName === "calculator") {
            document.getElementById("calculator").scrollIntoView({
                behavior: "smooth"
            });
        } else if (projectName === "portfolio") {
            document.getElementById("home").scrollIntoView({
                behavior: "smooth"
            });
        } else if (projectName === "landing") {
            // Landing page abhi tayyar nahi hai.
            // Is liye uski details dikhayi jayengi, popup nahi.
            const project = projectsData.landing;
            detailTitle.textContent = project.title;
            detailText.textContent = project.description;
            projectDetails.classList.add("show");
            projectDetails.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
});
/* Contact Form Validation */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();
    // Empty fields check karo
    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill all fields!";
        formMessage.style.color = "red";
        return;
    }
    // Email format check karo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email!";
        formMessage.style.color = "red";
        return;
    }
    // Form submit hone ka message
    formMessage.textContent = "Thank you! Your message is ready.";
    formMessage.style.color = "green";
    contactForm.reset();
});
/* Active Navbar Link Highlight */
const allSections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll('.navbar a[href^="#"]');
function updateActiveLink() {
    let currentId = "home";
    allSections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 180) {
            currentId = section.id;
        }
    });
    allNavLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);
/* Scroll To Top Button */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
/* Website Loading Animation */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    loader.classList.add("hide-loader");
});