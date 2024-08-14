document.addEventListener('DOMContentLoaded', function() {
    // Function to open popup1
    function openPopup1() {
        document.getElementById('popup1').style.display = 'block';
    }

    // Function to close popup1
    function closePopup1Fn() {
        document.getElementById('popup1').style.display = 'none';
    }

    // Function to open popup2
    function openPopup2() {
        document.getElementById('popup2').style.display = 'block';
    }

    // Function to close popup2
    function closePopup2Fn() {
        document.getElementById('popup2').style.display = 'none';
    }

    // Event listener for "Book A Table" button
    document.getElementById('bookTableBtn').addEventListener('click', openPopup1);

    // Event listener for closing popup1
    document.querySelector('.popup1 .close').addEventListener('click', closePopup1Fn);

    // Event listener for "Continue" button in popup1
    document.getElementById('nextButton').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        closePopup1Fn(); // Close popup1
        openPopup2(); // Open popup2
    });

    // Event listener for closing popup2
    document.querySelector('.popup2 .close').addEventListener('click', closePopup2Fn);

    // Event listener for "Book a table" button in popup2
    document.querySelector('.popup2 form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        closePopup2Fn(); // Close popup2

        // Gather reservation details from form
        const name = document.getElementById('name').value;
        const mail = document.getElementById('mail').value;
        const tel = document.getElementById('tel').value;
        const reservationDetails = {
            name: name,
            mail: mail,
            tel: tel,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            duration: document.getElementById('duration').value
        };

        // Call function to open confirm popup with reservation details
        openConfirmPopup(reservationDetails);
    });

    // Function to open confirm popup with reservation details
    function openConfirmPopup(reservationDetails) {
        const confirmPopup = document.getElementById('confirm');

        // Display reservation details
        document.getElementById('reservation-name').textContent = reservationDetails.name;
        document.getElementById('reservation-email').textContent = reservationDetails.mail;
        document.getElementById('reservation-tel').textContent = reservationDetails.tel;
        document.getElementById('reservation-date').textContent = reservationDetails.date;
        document.getElementById('reservation-time').textContent = reservationDetails.time;
        document.getElementById('reservation-guests').textContent = reservationDetails.guests;
        document.getElementById('reservation-duration').textContent = reservationDetails.duration;

        // Display the confirm popup
        confirmPopup.style.display = 'block';

        // Event listener for closing confirm popup
        confirmPopup.querySelector('.close').addEventListener('click', function() {
            confirmPopup.style.display = 'none';
        });

        // Event listener for confirming reservation
        document.getElementById('confirmReservationBtn').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission
            confirmPopup.style.display = 'none';
            closeAllPopups();
        });
    }

    // Function to close all popups
    function closeAllPopups() {
        document.getElementById('popup1').style.display = 'none';
        document.getElementById('popup2').style.display = 'none';
        document.getElementById('confirm').style.display = 'none';
    }
});