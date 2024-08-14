document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let receiptItems = document.querySelector('.bill');
    let subtotalAmount = document.querySelector('.subtotal-amount');
    let deliveryAmount = document.querySelector('.delivery-amount');
    let totalAmount = document.querySelector('.total-amount');
    let dateElement = document.querySelector('.pdate'); // Assuming .pdate is the class for 'Date:'
    let timeElement = document.querySelector('.ptime'); // Assuming .ptime is the class for 'Time:'

    // Function to calculate subtotal based on items in cart
    function calculateTotalPrice() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Function to generate receipt HTML
    function generateReceipt() {
        let receiptHTML = '';
        cartItems.forEach(item => {
            receiptHTML += `
                <div class="receipt-item">
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">${item.quantity}</div>
                    <div class="item-amount">${(item.price).toLocaleString()}</div>
                    <div class="item-price">${(item.price * item.quantity).toLocaleString()}</div>
                </div>`;
        });
        receiptItems.innerHTML = receiptHTML;

        // Update subtotal, delivery charge, and total in receipt
        subtotalAmount.textContent = calculateTotalPrice().toLocaleString();
        deliveryAmount.textContent = '250'; // Static delivery charge for demonstration
        totalAmount.textContent = (calculateTotalPrice() + 250).toLocaleString();

        // Update date and time in receipt
        displayDate();
        displayTime();
    }

    // Function to display current date
    function displayDate() {
        const currentDate = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const day = currentDate.toLocaleDateString(undefined, options);
        dateElement.textContent = `Date: ${day}`;
    }
    

    // Function to display current time
    function displayTime() {
        const currentTime = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        timeElement.textContent = `Time: ${currentTime.toLocaleTimeString(undefined, options)}`;
    }

    // Call generateReceipt when on receipt.html page
    generateReceipt();
});
