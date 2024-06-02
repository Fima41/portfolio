document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Fetch and display GitHub repositories
    const repoList = document.getElementById('repo-list');
    const username = 'Fima41'; // Replace with your GitHub username

    fetch(`https://api.github.com/users/Fima41/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = repo.html_url;
                a.target = '_blank';
                a.textContent = repo.name;
                li.appendChild(a);
                repoList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));

    // Contact form submission with validation
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            alert('All fields are required.');
            return;
        }

        if (!validateEmail(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Redirect to success page upon successful form submission
                    window.location.href = 'success.html'; 
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('Failed to send message. Please try again later.');
            });
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
