const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function scramble(element, finalText, duration = 1500, delay = 0, glitchCount = 2, glitchSpeed = 80) {
    setTimeout(() => {
        let start = null;
        const totalChars = finalText.length;

        // Pick random non-space indices to stay glitchy
        const validIndices = [];
        for (let i = 0; i < totalChars; i++) {
            if (finalText[i] !== ' ') validIndices.push(i);
        }

        const glitchIndices = new Set(
            validIndices
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.min(glitchCount, validIndices.length))
        );

        function getDisplay(lockedCount, resolved) {
            let display = '';
            for (let i = 0; i < totalChars; i++) {
                if (finalText[i] === ' ') {
                    display += ' ';
                } else if (resolved && glitchIndices.has(i)) {
                    // Occasionally flash the real char to feel unstable, not fully broken
                    display += Math.random() < 0.75
                        ? finalText[i]
                        : chars[Math.floor(Math.random() * chars.length)];
                } else if (!resolved && i < lockedCount) {
                    display += finalText[i];
                } else if (!resolved) {
                    display += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    display += finalText[i];
                }
            }
            return display;
        }

        // Phase 1: scramble resolving
        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const lockedCount = Math.floor(progress * totalChars);

            element.textContent = getDisplay(lockedCount, false);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Phase 2: unstable glitch loop at irregular intervals
                function glitchLoop() {
                    element.textContent = getDisplay(totalChars, true);
                    // Random delay makes it feel organic and unstable
                    const nextDelay = glitchSpeed + Math.random() * 120;
                    setTimeout(glitchLoop, nextDelay);
                }
                glitchLoop();
            }
        }

        requestAnimationFrame(step);
    }, delay);
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('[data-scramble]');
    targets.forEach((el, i) => {
        const finalText = el.dataset.scramble;
        const duration = parseInt(el.dataset.scrambleDuration) || 1500;
        const delay = parseInt(el.dataset.scrambleDelay) || i * 400;
        const glitchCount = parseInt(el.dataset.scrambleGlitch) || 2;
        const glitchSpeed = parseInt(el.dataset.scrambleSpeed) || 80;
        el.textContent = '';
        scramble(el, finalText, duration, delay, glitchCount, glitchSpeed);
    });
});