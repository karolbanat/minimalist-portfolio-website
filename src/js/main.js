const toggleBtn = document.querySelector('.toggle-button');
const primaryNav = document.querySelector('#primary-nav');

const handleToggleButton = e => {
	const prevExpanded = toggleBtn.getAttribute('aria-expanded') === 'true' ? true : false;
	toggleBtn.setAttribute('aria-expanded', !prevExpanded);
	primaryNav.toggleAttribute('data-expanded', !prevExpanded);
	if (!prevExpanded) {
		primaryNav.classList.add('animation-slide-nav');
		const endAnimation = () => {
			primaryNav.classList.remove('animation-slide-nav');
			primaryNav.removeEventListener('animationend', endAnimation);
		};
		primaryNav.addEventListener('animationend', endAnimation);
	}
};

toggleBtn.addEventListener('click', handleToggleButton);
