// Basic interactivity: theme toggle, mailto fallback, dynamic year
(function () {
    const btn = document.getElementById('theme-toggle');
    const year = document.getElementById('year');
    year.textContent = new Date().getFullYear();

    // Theme toggle: persist in localStorage
    const root = document.documentElement;
    const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (current === 'dark') {
        document.documentElement.classList.add('dark');
    }

    btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        btn.textContent = isDark ? '☀️' : '🌙';
    });

    // Mailto fallback for contact form
    const mailBtn = document.getElementById('mailto-btn');
    const form = document.getElementById('contact-form');

    mailBtn.addEventListener('click', () => {
        const formData = new FormData(form);
        const name = formData.get('name') || '';
        const email = formData.get('_replyto') || '';
        const message = formData.get('message') || '';
        const subject = encodeURIComponent('Portfolio contact from website');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    });

    // Progressive enhancement: intercept submit to show success message (Formspree still handles POST)
    form.addEventListener('submit', (e) => {
        // Let it submit normally to Formspree if action is set; show quick UI feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
            // optionally show a toast or redirect; keep simple here
            alert('Thanks! If the form action is configured, you will receive a response shortly.');
        }, 900);
    });
})();
