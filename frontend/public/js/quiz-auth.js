let incorrectAttempts = 0; // Track incorrect password attempts

document.getElementById('admin-signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    const password = passwordInput.value;
    const email = emailInput.value;

    // Reset incorrect attempts on successful login
    incorrectAttempts = 0;

    fetch('/api/users/login', { // Update to the correct endpoint for user login
        method: 'POST', // Ensure the method is POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Send email and password
    })
        .then(response => response.json())
        .then(data => {
            if (data.isAuthorized) {
                window.location.href = 'game.html';
            } else {
                alert('You are not authorized to join the quiz.');
            }
        });
}); // Closing parenthesis for the event listener

let quizEventInterval;

function startQuizEventUpdates() {
    quizEventInterval = setInterval(() => {
        fetch('/api/live-quiz-event') // Endpoint to fetch live quiz event data
            .then(response => response.json())
            .then(data => {
                document.getElementById('live-question').innerText = data.question;
                document.getElementById('timer-display').innerText = `Timer: ${data.timer}`;
                const participantList = document.getElementById('participant-list');
                participantList.innerHTML = ''; // Clear existing participants
                data.participants.forEach(participant => {
                    const li = document.createElement('li');
                    li.innerText = participant.name; // Assuming participant has a name property
                    participantList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching live quiz event:', error));
    }, 5000); // Update every 5 seconds
}

// Call this function when the quiz management page is loaded
startQuizEventUpdates();
