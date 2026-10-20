(function () {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('bribetrace-theme');
    const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        const button = document.querySelector('.theme-toggle');
        if (button) {
            const dark = theme === 'dark';
            button.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (dark ? '☀' : '☾') + '</span><span>' + (dark ? 'Light mode' : 'Dark mode') + '</span>';
            button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
            button.setAttribute('aria-pressed', String(dark));
        }
    }

    function addToggle() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.addEventListener('click', function () {
            const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('bribetrace-theme', nextTheme);
            applyTheme(nextTheme);
        });

        const nav = document.querySelector('.navbar') || document.querySelector('header nav') || document.querySelector('header');
        if (nav) {
            nav.appendChild(button);
        } else {
            document.body.appendChild(button);
            button.style.position = 'fixed';
            button.style.top = '12px';
            button.style.right = '12px';
            button.style.zIndex = '2000';
        }
        applyTheme(root.getAttribute('data-theme') || initialTheme);
    }

    root.setAttribute('data-theme', initialTheme);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addToggle, { once: true });
    } else {
        addToggle();
    }
})();
