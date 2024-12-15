document.addEventListener('DOMContentLoaded', function() {
    form.reset();
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    const menuLinks = mobileMenu.getElementsByTagName('a');
    for (let link of menuLinks) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
        });
    }

    // Form functionality
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Load saved values
    nameInput.value = localStorage.getItem('contactName') || '';
    emailInput.value = localStorage.getItem('contactEmail') || '';
    messageInput.value = localStorage.getItem('contactMessage') || '';

    form.addEventListener('submit', function(e) {

        // Save form values to localStorage
        localStorage.setItem('contactName', nameInput.value);
        localStorage.setItem('contactEmail', emailInput.value);
        localStorage.setItem('contactMessage', messageInput.value);

        console.log('Form submitted to Formspree and data saved in LocalStorage!');
    });
});