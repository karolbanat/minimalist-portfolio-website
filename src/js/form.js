const contactForm = document.querySelector('.contact-form');
const nameInput = contactForm.querySelector('input#name');
const emailInput = contactForm.querySelector('input#email');
const messageInput = contactForm.querySelector('#message');
const submitButton = contactForm.querySelector('button[type=submit]');
const confirmationMessage = contactForm.querySelector('.contact-form__confirmation-msg');

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const handleFormSubmit = e => {
	e.preventDefault();
	const validName = validateInput(nameInput);
	const validEmail = validateEmailInput(emailInput);
	const validMessage = validateInput(messageInput);
	if (validName && validEmail && validMessage) {
		confirmationMessage.classList.add('visible');
		clearInputs();
	} else {
		confirmationMessage.classList.remove('visible');
	}
};

const handleEmailValidation = e => validateEmailInput(e.target);
const handleInputValidation = e => validateInput(e.target);

const validateEmailInput = input => {
	const email = input.value;
	if (!validateInput(input)) return false;
	if (!isValidEmail(email)) {
		showError(input, 'Please use a valid email address');
		return false;
	}
	clearError(input);
	return true;
};

const validateInput = input => {
	const value = input.value;
	if (isBlank(value)) {
		showError(input);
		return false;
	}
	clearError(input);
	return true;
};

const isBlank = value => value === '';
const isValidEmail = email => EMAIL_REGEX.test(email);

const clearInputs = () => {
	nameInput.value = '';
	emailInput.value = '';
	messageInput.value = '';
};

const showError = (input, msg = 'This field is required') => {
	const parent = input.parentElement;
	const error = parent.querySelector('.contact-form__error-msg');
	parent.classList.add('error');
	error.innerText = msg;
};

const clearError = input => {
	const parent = input.parentElement;
	const error = parent.querySelector('.contact-form__error-msg');
	parent.classList.remove('error');
	error.innerText = '';
};

submitButton.addEventListener('click', handleFormSubmit);
nameInput.addEventListener('focusout', handleInputValidation);
emailInput.addEventListener('focusout', handleEmailValidation);
messageInput.addEventListener('focusout', handleInputValidation);
nameInput.addEventListener('focus', e => clearError(e.target));
emailInput.addEventListener('focus', e => clearError(e.target));
messageInput.addEventListener('focus', e => clearError(e.target));
