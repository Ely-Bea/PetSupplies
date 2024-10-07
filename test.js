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

        // Get 5 random products
        const randomProducts = getRandomItems(products, 5);
        
        const productContainer = document.getElementById('dsicounted');

        randomProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cards');

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <h4>Price: $${product.price}</h4>
            `;

            productContainer.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
