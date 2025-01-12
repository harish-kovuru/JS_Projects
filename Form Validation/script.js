const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cPassword = document.getElementById('confirm-password');
const submit = document.getElementById("btn");

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const cPasswordValue = cPassword.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
    } else {
        const missingRequirements = checkPasswordRequirements(passwordValue);
        if (missingRequirements.length > 0) {
            setError(password, 'Password must contain: ' + missingRequirements.join(', '));
        } else {
            setSuccess(password);
        }
    }

    if(cPasswordValue === '') {
        setError(cPassword, 'Please confirm your password');
    } else if (cPasswordValue !== passwordValue) {
        setError(cPassword, "Passwords doesn't match");
    } else {
        setSuccess(cPassword);
    }

};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


function isValidEmail(e) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(e);
 }

function checkPasswordRequirements(password) {
    const missing = [];
    
    if (!/[A-Z]/.test(password)) {
        missing.push('uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        missing.push('lowercase letter');
    }
    if (!/\d/.test(password)) {
        missing.push('number');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        missing.push('special character');
    }
    
    return missing;
}