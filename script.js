const cart = [];

//----------------------------------ROUTING-------------------------------------------//

function renderContent(page) {
    const homeSection = document.getElementById('home');
    const supportSection = document.getElementById('support');
    const productSection = document.getElementById('product-page')

    if (page.startsWith('support')) {
        homeSection.style.display = 'none';
        productSection.style.display = 'none';
        supportSection.style.display = 'block';
        
        const id = page.split('-')[1]; // Get the specific section ID
        const targetElement = document.getElementById(`support-${id}`);
        if (targetElement) {
            targetElement.scrollIntoView(); // Scroll to the specific section
        }
    }

    else if (page == 'product-page'){
        homeSection.style.display = 'none';
        supportSection.style.display = 'none';
        productSection.style.display = 'block';
    }
    
    else {
        homeSection.style.display = 'block';
        supportSection.style.display = 'none';
        productSection.style.display = 'none';
    }
}

// Function to handle navigation
function navigateTo(page) {
    history.pushState({ page: page }, '', `#${page}`);
    renderContent(page);
}

function fetchProducts(jsonFileName, elementId) {
    fetch(jsonFileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {

            const productContainer = document.getElementById(elementId);

            productContainer.innerHTML = '';

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-cards');

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <h4>Price: $${product.price}</h4>
                    <button class='addCart' id='addtocart' data-id='${product.id}'>ADD TO CART</button>
                `;

                productContainer.appendChild(productDiv);
            });
            window.currentProducts = products; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function addToCart(productId) {

    const product = window.currentProducts.find(p => p.id === productId);

    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            alert(`Product ${product.name} is already in the cart.`);
        } else {
            cart.push(product);
        }
    } else {
        console.log('Product not found!');
    }
}

document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
});

document.getElementById('sign-in-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Sign in functionality coming soon!");
});

document.getElementById('cart-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Cart functionality coming soon!");
});

document.querySelectorAll('#support-link li').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.id; // Get the ID of the clicked item
        navigateTo(`support-${targetId}`); // Navigate to the specific section
    });
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'category-foods' || e.target.id === 'food-btn') {
        e.preventDefault();
        navigateTo('product-page')
        fetchProducts('foods.json', 'active-products');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'category-treats' || e.target.id === 'treats-btn') {
        e.preventDefault();
        navigateTo('product-page')
        fetchProducts('treats.json', 'active-products');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'category-hygiene' || e.target.id === 'hygiene-btn') {
        e.preventDefault();
        navigateTo('product-page')
        fetchProducts('hygiene.json', 'active-products');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'category-supplies' || e.target.id === 'supplies-btn') {
        e.preventDefault();
        navigateTo('product-page')
        fetchProducts('supplies.json', 'active-products');
    }
});

document.getElementById('active-products').addEventListener('click', (e) => {
    if (e.target.classList.contains('addCart')) {
        e.preventDefault();
        const id_product = parseInt(e.target.getAttribute('data-id'));
        addToCart(id_product);
    }
});


// Handle back/forward navigation
window.onpopstate = (event) => {
    if (event.state) {
        renderContent(event.state.page);
    } else {
        renderContent('home'); // Default to home if no state
    }
};


const initialPage = window.location.hash.replace('#', '') || 'home';
renderContent(initialPage);

//----------------------------------PRODUCT LISTING-------------------------------------------//

fetch('treats.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        // Function to get 5 random items from the products array
        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };

        const randomProducts = getRandomItems(products, 5);
        
        const productContainer = document.getElementById('discounted');

        randomProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cards');

            productDiv.innerHTML = `
                <a href="#shop">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <h4>Price: $${product.price}</h4>
                </a>
            `;

            productContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch('foods.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        // Function to get 5 random items from the products array
        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };

        const randomProducts = getRandomItems(products, 5);
        
        const productContainer = document.getElementById('popular');

        randomProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cards');

            productDiv.innerHTML = `
                <a href="#shop">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <h4>Price: $${product.price}</h4></a>
            `;

            productContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });