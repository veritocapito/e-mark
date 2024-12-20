import products from './assets/products.js';

document.addEventListener('DOMContentLoaded', function () {

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    const menuLinks = mobileMenu.getElementsByTagName('a');
    for (let link of menuLinks) {
        link.addEventListener('click', function () {
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

    // Save form values to localStorage and submit to Formspree
    form.addEventListener('submit', function (e) {

        // Save form values to localStorage
        localStorage.setItem('contactName', nameInput.value);
        localStorage.setItem('contactEmail', emailInput.value);
        localStorage.setItem('contactMessage', messageInput.value);

        console.log('Form submitted to Formspree and data saved in LocalStorage!');
        form.reset();
    });

    // Product slider functionality
    function createProductItem(product) {
        return `
            <div class="slick-track mb-30" style="width: 293px;">
                <div class="single-product-items">
                    <div class="product-item-image">
                        <a href="${product.link}" tabindex="-1"><img src="${product.image}" alt="Product"></a>
                        <div class="product-discount-tag">
                            <p>${product.discount}</p>
                        </div>
                    </div>
                    <div class="product-item-content text-center mt-30">
                        <h5 class="product-title"><a href="${product.link}" tabindex="-1">${product.name}</a></h5>
                        <ul class="rating">
                            ${Array.from({ length: 5 }, (_, i) => `
                                <li><img src="./assets/img/${i < product.rating ? 'starF' : 'star'}.svg" alt="star" class="${i < product.rating ? 'starF' : 'star'}"></li>
                            `).join('')}
                        </ul>
                        <span class="regular-price">${product.regularPrice}</span>
                        <span class="discount-price">${product.discountPrice}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Load products for a specific category
    function loadProducts(category) {
        console.log('Loading products for category:', category); 
        console.log('Available categories:', Object.keys(products)); 
        const container = document.getElementById('product-container');
        if (products[category]) {
            container.innerHTML = products[category].map(createProductItem).join('');
        } else {
            console.error('Category not found:', category); 
            container.innerHTML = '<p>No products found for this category.</p>';
        }
    }
    
    // Add event listeners to category tabs
    document.querySelectorAll('#v-pills-tab a').forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const category = event.target.id.replace('v-pills-', '').replace('-tab', '');
            loadProducts(category);
            document.querySelectorAll('#v-pills-tab a').forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
    
    // Load default category
    loadProducts('electronics');

});