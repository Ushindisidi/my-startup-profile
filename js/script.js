document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggleBtn.innerHTML = (savedTheme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>');
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-theme');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-theme');
        }
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
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

    const chatbotLog = document.getElementById('chatbot-log');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotForm = document.getElementById('chatbot-form');

    const systemPrompt = `You are a helpful AI chatbot for JiraniExchange, a startup based in Nairobi,
     Nairobi County, Kenya. Answer questions accurately based on the following context:

    Who founded the startup? Joyce Kadzo.
    What problems does it solve? JiraniExchange connects untapped local skills, talents, and resources with specific community needs, fostering sharing, collaboration, and mutual support. It addresses gaps in local resources and helps individuals showcase their skills.
    What services or products does it offer? JiraniExchange offers Resource Exchange (sharing tools and materials), a Waste-to-Value Hub (transforming unused materials), and Skill Match (connecting residents with expertise).
    How can someone support or contact the team?* You can join the platform, explore resources, join the Waste-to-Value Hub, or connect for skill sharing. For direct contact, you can reach them via email at jiraniexchange@gmail.com, phone at +254748920063, or visit their office at 643 Mfangano street, Nairobi, Kenya.
    What’s the startup’s vision or long-term goal?* JiraniExchange's vision is to empower local communities, enhance social cohesion, and drive collective growth by transforming neighborhoods into thriving centers of collaboration and support, ultimately creating a brighter future for Nairobi.

    Answer concisely and professionally. If a question is outside of this context,
     politely state that you can only answer questions about JiraniExchange and its services. Remember the current location is Nairobi, Nairobi County, Kenya.`;

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', sender);
        messageDiv.textContent = message;
        chatbotLog.appendChild(messageDiv);
        chatbotLog.scrollTop = chatbotLog.scrollHeight;
    }

    addMessage('Welcome to JiraniExchange! Ask me anything about our startup.', 'system');

    chatbotForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatbotInput.value = '';

            try {
                addMessage('Thinking...', 'assistant-thinking');
                chatbotInput.disabled = true;

                const messagesToSend = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage },
                ];

                const response = await puter.ai.chat({
                    messages: messagesToSend,
                });
                console.log('Full AI Response:',response;

                chatbotLog.querySelector('.assistant-thinking')?.remove();
                chatbotInput.disabled = false;

                if (response && response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
                    addMessage(response.choices[0].message.content, 'assistant');
                } else {
                    addMessage('Sorry, I received an unexpected response from the AI. Please try again or rephrase.', 'assistant');
                }

            } catch (error) {
                chatbotLog.querySelector('.assistant-thinking')?.remove();
                chatbotInput.disabled = false;
                addMessage('An error occurred while processing your request. Please check your internet connection or try again later.', 'assistant');
            }
        }
    });
});
