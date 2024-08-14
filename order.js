// Select elements from the DOM to manipulate later
let openShopping = document.querySelector('.shopping'); // Button to open the shopping cart
let closeShopping = document.querySelector('.closeShopping'); // Button to close the shopping cart
let list = document.querySelector('.list'); // Container to display product items
let list2 = document.querySelector('.list2'); // Container to display Thai Mains items
let list3 = document.querySelector('.list3'); // Container to display International Mains items
let list4 = document.querySelector('.list4'); // Container to display additional International Mains items
let list5 = document.querySelector('.list5'); // Container to display Desserts items
let listCard = document.querySelector('.listCard'); // Container to display items in the shopping cart
let body = document.querySelector('body'); // The body element of the document
let total = document.querySelector('.total'); // Element to display the total price of items in the cart
let quantity = document.querySelector('.quantity'); // Element to display the total quantity of items in the cart

// Add event listeners to open and close the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active'); // Add 'active' class to the body to open the shopping cart
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active'); // Remove 'active' class from the body to close the shopping cart
});

// Define an array of product objects
let products = [
    { id: 1, name: 'Tom yum goong', images: 'tomyum.PNG', price: 1200 },
    { id: 2, name: 'Spring rolls', images: 'spring.PNG', price: 800 },
    { id: 3, name: 'Papaya salad', images: 'papaya.PNG', price: 700 },
    { id: 4, name: 'Thai fishcake', images: 'fishc.PNG', price: 900 },
    { id: 5, name: 'Fried tofu', images: 'tofu.PNG', price: 850 },
    { id: 6, name: 'Chicken lettuce wrap', images: 'wrap.PNG', price: 950 },
    { id: 7, name: 'Chicken satay', images: 'satay.PNG', price: 950 },
    { id: 8, name: 'Coconut shrimp', images: 'coco.PNG', price: 900 },
    { id: 9, name: 'Pad Thai', images: 'pad.PNG', price: 1200 },
    { id: 10, name: 'Green Curry', images: 'green.PNG', price: 1400 },
    { id: 11, name: 'Khao Pad', images: 'bon.PNG', price: 1300 },
    { id: 12, name: 'Tom Kha Ghai', images: 'soup_chicken.PNG', price: 1050 },
    { id: 13, name: 'Pad See Ew', images: 'padsee.PNG', price: 1050 },
    { id: 14, name: 'Pad Krapow Moo', images: 'padmoo.PNG', price: 1050 },
    { id: 15, name: 'Crispy Pork Belly', images: 'pork.PNG', price: 1400 },
    { id: 16, name: 'Duck Red Curry', images: 'duck.PNG', price: 1500 },
    { id: 17, name: 'Margherita Pizza', images: 'margharita.PNG', price: 1499 },
    { id: 18, name: 'Pepperoni Pizza', images: 'pep_pizza.PNG', price: 2100 },
    { id: 19, name: 'Vegetarian Pizza', images: 'vegetarianp.PNG', price: 1800 },
    { id: 20, name: 'Lasagna', images: 'lasagna.PNG', price: 1600 },
    { id: 21, name: 'Cheese Burger', images: 'cheeseburger.PNG', price: 1200 },
    { id: 22, name: 'Vegetarian Burger', images: 'vegeburger.PNG', price: 1050 },
    { id: 23, name: 'Espresso', images: 'espresso.PNG', price: 400 },
    { id: 24, name: 'Cappuccino', images: 'cappuccino.PNG', price: 500 },
    { id: 25, name: 'Iced Latte', images: 'iced_latte.PNG', price: 600 },
    { id: 26, name: 'Vanilla Milkshake', images: 'vanilla_shake.PNG', price: 600 },
    { id: 27, name: 'Chocolate Milkshake', images: 'choco_shake.PNG', price: 650 },
    { id: 28, name: 'Strawberry Milkshake', images: 'strawberry_shake.PNG', price: 600 },
    { id: 29, name: 'Frappe', images: 'frappe.PNG', price: 700 },
    { id: 30, name: 'Water Bottle', images: 'water_bottle.PNG', price: 100 },
    { id: 31, name: 'Blueberry CheeseCake', images: 'cheesecake.PNG', price: 900 },
    { id: 32, name: 'Tiramisu', images: 'tiramisu.PNG', price: 1100 }
];

// Initialize an array to hold items added to the cart
let listCards = [];

// Function to initialize the application by displaying product items
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div'); // Create a new div element for each product
        newDiv.classList.add('item'); // Add 'item' class to the new div
        newDiv.innerHTML = `
            <img src="images/${value.images}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        
        // Append products to the correct container
        if (key < 8) { // First 8 products go to the appetizers list
            list.appendChild(newDiv);
        } else if (key < 16) { // Next 8 products go to the Thai Mains list
            list2.appendChild(newDiv);
        } else if (key < 22) { // Next 6 products go to the International Mains list
            list3.appendChild(newDiv);
        } else if (key < 30) { // Next 8 products go to the additional International Mains list
            list4.appendChild(newDiv);
        } else { // Remaining products go to the Desserts list
            list5.appendChild(newDiv);
        }
    });
}
initApp(); // Call the function to initialize the app

// Function to show the popup
function showPopup() {
    let popup = document.getElementById('popup');
    popup.classList.remove('hide'); // Remove hide class if it was added previously
    popup.style.display = 'block'; // Ensure the popup is displayed
    popup.classList.add('show'); // Add show class to start the slide-in animation

    // Hide the popup after 2 seconds
    setTimeout(() => {
        popup.classList.remove('show'); // Remove show class
        popup.classList.add('hide'); // Add hide class to start the slide-out animation

        // Set display to none after the slide-out animation completes
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500); // This should match the duration of the slide-out animation
    }, 2000);
}

// Updated function to add a product to the cart and show the popup
function addToCard(key) {
    let product = products[key];
    let found = listCards.find(item => item.id === product.id);
    if (found) {
        found.quantity += 1; // Increase quantity if the product already exists in the cart
    } else {
        let newProduct = { ...product, quantity: 1 }; // Create a new product object with quantity 1
        listCards.push(newProduct); // Add the new product to the cart
    }
    reloadCard(); // Update the cart display
    showPopup(); // Show the popup
}


// Function to reload the cart display
function reloadCard() {
    listCard.innerHTML = ''; // Clear the current cart display
    let count = 0; // Initialize count of items
    let totalPrice = 0; // Initialize total price
    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity; // Add item price multiplied by quantity to total price
        count += value.quantity; // Add item quantity to total count
        let newDiv = document.createElement('li'); // Create a new list item element for the cart
        newDiv.innerHTML = `
            <div><img src="images/${value.images}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})"> - </button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})"> + </button>
            </div>`;
        listCard.appendChild(newDiv); // Add the new list item to the cart
    });
    total.innerText = totalPrice.toLocaleString(); // Update the total price display
    quantity.innerText = count; // Update the total quantity display

    localStorage.setItem('cartItems', JSON.stringify(listCards)); // Store cart items in localStorage
}

// Event listener to store cart items in localStorage and redirect to the checkout page
total.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify(listCards));
    window.location.href = 'checkout.html';
});

// Function to change the quantity of items in the cart
function changeQuantity(key, quantity) {
    if (quantity === 0) {
        listCards.splice(key, 1); // Remove item from cart if quantity is zero
    } else {
        listCards[key].quantity = quantity; // Update item quantity
    }
    reloadCard(); // Update the cart display
}
