document.addEventListener('DOMContentLoaded', () => {

    // --- Terminal Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const terminalOutput = document.getElementById('terminal-output');

    // The lines of code to "hack" into the profile
    const bootLines = [
        "Initializing secure connection...",
        "Bypassing mainframe firewall... [OK]",
        "Decrypting profile data...",
        "Loading dependencies... React, Python, Solidity",
        "Connection Established.",
        "Welcome, Daksh Parmar."
    ];

    let lineIndex = 0;

    function renderNextLine() {
        if (lineIndex < bootLines.length) {
            const newLine = document.createElement('div');
            newLine.textContent = `> ${bootLines[lineIndex]}`;
            // Add a slight color change to the final "Welcome" line
            if (lineIndex === bootLines.length - 1) {
                newLine.style.color = '#fff';
                newLine.style.textShadow = '0 0 10px #5e17eb';
            }
            terminalOutput.appendChild(newLine);
            lineIndex++;

            // Random delay between 200ms and 800ms for realistic typing feel
            const randomDelay = Math.floor(Math.random() * 600) + 200;
            setTimeout(renderNextLine, randomDelay);
        } else {
            // Sequence Finished, transition out
            setTimeout(() => {
                bootScreen.classList.add('hide-boot');
                // Kick off the typing animation on the main card now that it's visible
                typeEffect();

                // Fully remove from DOM later to free memory
                setTimeout(() => bootScreen.remove(), 1000);
            }, 800); // short pause before fading
        }
    }

    // Start boot sequence immediately
    renderNextLine();

    // --- Typewriter Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = [
        "Founder - Design Dynamics",
        "Freelance Graphic Designer",
        "AI Enthusiast",
        "UI/UX Learner",
        "Creator of Certichain"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        // If word is completely typed, pause before deleting
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        }
        // If word is completely deleted, switch to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect is called by renderNextLine() now


    // --- 3D Hover Tilt Effect for Glass Card ---
    const card = document.querySelector('.glass-card');
    const container = document.querySelector('.container');

    // Only apply hover effect on desktop
    if (window.matchMedia("(hover: hover)").matches) {
        container.addEventListener('mousemove', (e) => {
            if (!card) return;

            // Calculate mouse position relative to center of the screen
            const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
            const yAxis = (window.innerHeight / 2 - e.pageY) / -35;

            // Apply a slight tilt based on mouse position
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset transform smoothly when mouse leaves the container
        container.addEventListener('mouseleave', () => {
            if (!card) return;
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = 'transform 0.5s ease-out';

            // Remove the hardcoded transition so the mousemove event can be smooth again
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
            }, 500);
        });

        // When mouse enters again, make sure transition is fast enough for the mousemove
        container.addEventListener('mouseenter', () => {
            if (!card) return;
            card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
        });
    }

    // --- Interactive Terminal Easter Egg ---
    const termToggle = document.getElementById('terminal-toggle');
    const miniTerminal = document.getElementById('mini-terminal');
    const closeTermBtn = document.getElementById('close-terminal');
    const termInput = document.getElementById('term-input');
    const termBody = document.getElementById('term-body');

    if (termToggle && miniTerminal && closeTermBtn && termInput && termBody) {
        termToggle.addEventListener('click', () => {
            miniTerminal.classList.add('active');
            termInput.focus();
        });

        closeTermBtn.addEventListener('click', () => {
            miniTerminal.classList.remove('active');
        });

        function printToTerminal(text, isHTML = false) {
            const div = document.createElement('div');
            if (isHTML) {
                div.innerHTML = text;
            } else {
                div.textContent = text;
            }
            termBody.appendChild(div);
            termBody.scrollTop = termBody.scrollHeight;
        }

        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = termInput.value.trim().toLowerCase();
                if (command === '') return;

                printToTerminal(`$> ${command}`);
                termInput.value = '';

                switch (command) {
                    case 'help':
                        printToTerminal('Available commands:<br>- help<br>- about<br>- skills<br>- hello<br>- clear', true);
                        break;
                    case 'about':
                        printToTerminal('Daksh Parmar: Founder of Design Dynamics & Creator of Certichain. Innovating ideas with creative precision.');
                        break;
                    case 'skills':
                        printToTerminal('Graphic Design, UI/UX, AI, Web3, React, Python, Solidity');
                        break;
                    case 'hello':
                        printToTerminal("<pre style=\"color:#4CAF50; text-shadow:0 0 5px #4CAF50; font-size: 0.85rem; line-height: 1.2; overflow-x: auto;\">\n _    _      _ _         __  __       _         _ \n| |  | |    | | |       |  \\/  |     | |       | |\n| |__| | ___| | | ___   | \\  / | __ _| |_ ___  | |\n|  __  |/ _ \\ | |/ _ \\  | |\\/| |/ _` | __/ _ \\ | |\n| |  | |  __/ | | (_) | | |  | | (_| | ||  __/ |_|\n|_|  |_|\\___|_|_|\\___/  |_|  |_|\\__,_|\\__\\___| (_)\n</pre>", true);
                        break;
                    case 'clear':
                        termBody.innerHTML = '<div>Welcome to Daksh_OS. Type \'help\' to see available commands.</div>';
                        break;
                    case 'ls':
                        printToTerminal('index.html  style.css  script.js  secret_key.txt');
                        break;
                    case 'cat secret_key.txt':
                        printToTerminal('Nice try, hacker. You\'ll need more than that to get my keys.');
                        break;
                    case 'sudo':
                        printToTerminal('daksh is not in the sudoers file. This incident will be reported.');
                        break;
                    default:
                        printToTerminal(`Command not found: ${command}. Type 'help' for available commands.`);
                }
            }
        });
    }

});
