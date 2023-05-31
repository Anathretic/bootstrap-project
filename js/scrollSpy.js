const menuItems = document.querySelectorAll('.nav__link')
const scrollSpySections = document.querySelectorAll('.section')

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = []

		scrollSpySections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 105) {
				sections.push(section)
				const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)

				menuItems.forEach(item => item.classList.remove('nav__link--active'))
				activeSection.classList.add('nav__link--active')
			}
		})
	}
}

const navHeight = document.querySelector('.nav').offsetHeight
document.documentElement.style.setProperty('--scroll-padding', navHeight - 1 + 'px')

window.addEventListener('scroll', handleScrollSpy)
