document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark and Light Theme Toggle
    const body = document.body;
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.classList.add('theme-toggle-btn');
    themeToggleBtn.setAttribute('aria-label', 'Toggle light and dark theme');

    const mainNav = document.querySelector('nav ul');
    if (mainNav) {
        const themeToggleListItem = document.createElement('li');
        themeToggleListItem.appendChild(themeToggleBtn);
        mainNav.appendChild(themeToggleListItem);
    } else {
        body.appendChild(themeToggleBtn);
    }

    body.classList.add('light-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';

    // Existing code...
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme); // Add the saved theme directly
    themeToggleBtn.innerHTML = (savedTheme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>');
} else {
    // No saved theme, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark-theme'); // Optionally save system preference
    } else {
        body.classList.add('light-theme'); // Default to light if no system preference or system prefers light
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light-theme'); // Optionally save default
    }
}


    // 2. FAQ Accordion with Smooth Animation
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;

        // Ensure answer sections are hidden initially
        answer.style.overflow = 'hidden';
        answer.style.maxHeight = '0';
        answer.style.transition = 'max-height 0.5s ease';

        question.addEventListener('click', () => {
            const isOpen = question.classList.contains('active');
            question.classList.toggle('active');

            if (isOpen) {
                answer.style.maxHeight = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 3. Button and Form Actions
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            alert('Welcome to JiraniExchange! Let\'s get you started.');
        });
    }

    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const missionSection = document.querySelector('.mission-section');
            if (missionSection) {
                missionSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            alert('Great to have you! You\'re one step closer to joining the community.');
        });
    }

    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Exploring resources!');
        });
    }

    const joinBtnWaste = document.getElementById('join-btn-waste');
    if (joinBtnWaste) {
        joinBtnWaste.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Joining the Waste-to-Value Hub!');
        });
    }

    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', (event) => {
            event.preventDefault();
            alert('Connecting with skills!');
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});