document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let checkoutItems = document.querySelector('.summary');
    let subtotalAmounts = document.querySelectorAll('.subtotal-amount'); // Select both subtotal elements
    let deliveryAmount = document.querySelector('.delivery-amount');
    let totalAmount = document.querySelector('.total-amount');
    const checkoutButton = document.querySelector('.checkout-button');
    const orderPopup = document.getElementById('order-popup');
    const checkoutPopup = document.getElementById('checkout-popup');
    const popupYesButton = document.getElementById('popup-yes-button');
    const popupNoButton = document.getElementById('popup-no-button');
    const popupOkButton = document.getElementById('popup-ok-button');

    // Function to calculate subtotal based on items in cart
    function calculateTotalPrice() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Function to display items in checkout summary
    function displayCheckoutItems() {
        checkoutItems.innerHTML = '';
        cartItems.forEach(item => {
            let newItem = document.createElement('li');
            newItem.innerHTML = `
                <div><img src="images/${item.images}" alt="${item.name}"/></div>
                <div>${item.name}</div>
                <div>${item.quantity}</div>
                <div>${(item.price * item.quantity).toLocaleString()}</div>`;
            checkoutItems.appendChild(newItem);
        });
    }

    // Function to update subtotal, delivery charge, and total amounts
    function updateTotalAmounts() {
        let subtotal = calculateTotalPrice();
        let deliveryCharge = 250; // Static delivery charge for demonstration
        let total = subtotal + deliveryCharge;
        
        subtotalAmounts.forEach(element => {
            element.textContent = subtotal.toLocaleString();
        });
        deliveryAmount.textContent = deliveryCharge.toLocaleString();
        totalAmount.textContent = total.toLocaleString();
    }

    // Apply promo code button click event (example)
    let applyButton = document.querySelector('.button');
    applyButton.addEventListener('click', function() {
        // Add logic to apply promo code and update total amounts if needed
        updateTotalAmounts(); // Example: update totals after applying promo code
    });

    // Display initial checkout items and totals
    displayCheckoutItems();
    updateTotalAmounts();

    // Function to show a popup
    const showPopup = (popupElement) => {
        popupElement.style.display = "flex";
    };

    // Function to hide a popup
    const hidePopup = (popupElement) => {
        popupElement.style.display = "none";
    };

    // Show the checkout confirmation popup when the checkout button is clicked
    checkoutButton.addEventListener('click', function() {
        showPopup(checkoutPopup);
    });

    // Hide the checkout confirmation popup when the No button is clicked
    popupNoButton.addEventListener('click', function() {
        hidePopup(checkoutPopup);
    });

    // Show the order confirmation popup when the Yes button is clicked
    popupYesButton.addEventListener('click', function() {
        hidePopup(checkoutPopup); // Hide the checkout confirmation popup
        showPopup(orderPopup); // Show the order confirmation popup
    });

    // Order popup OK button click event to hide popup
    popupOkButton.addEventListener('click', function() {
        orderPopup.style.display = 'none';
        window.location.href = "member.html";
    });

    // Hide popup when clicking outside the popup content
    document.addEventListener("click", (event) => {
        if (event.target === checkoutPopup) {
            hidePopup(checkoutPopup);
        } else if (event.target === orderPopup) {
            hidePopup(orderPopup);
        }
    });
});
