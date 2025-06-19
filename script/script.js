/*
    =================================================
    Script Unificado del Portafolio - VERSIÓN CORREGIDA
    =================================================
*/

// PARTE 1: LÓGICA DE TEMA INMEDIATA (Previene el parpadeo o FOUC)
(function() {
    // Función para aplicar el tema al elemento <html>
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // 1. Revisa si el usuario ya ha guardado una preferencia en localStorage.
    let storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
        return; 
    }

    // 2. Si no, usa la preferencia del sistema operativo.
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');

})();


// PARTE 2: MANEJADORES DE EVENTOS Y ANIMACIONES (Se ejecuta después de cargar el DOM)
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL BOTÓN DE TEMA ---
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    if (themeToggleButton) {
        const themeIcon = themeToggleButton.querySelector('i');

        // Función para actualizar el ícono del botón (sol/luna)
        function updateIcon() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        // Actualiza el ícono al cargar la página.
        updateIcon();

        // Agrega el evento de clic para cambiar el tema.
        themeToggleButton.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon();
        });

        // Escucha cambios en el tema del sistema operativo.
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateIcon();
            }
        });
    }

    // --- LÓGICA DE ANIMACIONES DE SCROLL ---
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
});