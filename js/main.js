let BODY
let NAV
let NAV_LIST
let NAV_LIST_BTN
let ALL_NAV_ITEMS
let NAV_ICON
let DELAY_TIME
let COUNTER_ITEMS
let COUNTER_BOX
let FOOTER_YEAR

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	BODY = document.querySelector('body')
	NAV = document.querySelector('.nav')
	NAV_LIST = document.querySelector('.nav__list')
	NAV_LIST_BTN = document.querySelector('.burger-btn')
	ALL_NAV_ITEMS = document.querySelectorAll('.nav__item')
	NAV_ICON = document.querySelector('.nav__icon')
	COUNTER_ITEMS = document.querySelectorAll('.achievement-number')
	COUNTER_BOX = document.querySelector('.achievement-box')
	FOOTER_YEAR = document.querySelector('.footer__year')
	DELAY_TIME = 1
}

const prepareDOMEvents = () => {
	window.addEventListener('scroll', addShadow)
	NAV_ICON.addEventListener('click', () => {
		NAV_LIST.classList.remove('nav__list--active')
		mobileBlock()
	})
	NAV_LIST_BTN.addEventListener('click', handleNav)
	currentYear()
	observer.observe(COUNTER_BOX)
}

const handleNav = () => {
	NAV_LIST.classList.toggle('nav__list--active')
	BODY.classList.remove('scroll-block')

	ALL_NAV_ITEMS.forEach(item => {
		item.addEventListener('click', () => {
			NAV_LIST.classList.remove('nav__list--active')
			BODY.classList.remove('scroll-block')
		})
	})

	mobileBlock()
}

const mobileBlock = () => {
	if (NAV_LIST.classList.contains('nav__list--active')) {
		if (BODY.classList.contains('scroll-block')) {
			BODY.classList.remove('scroll-block')
		} else {
			BODY.classList.add('scroll-block')
		}
	}
}

const addShadow = () => {
	if (window.scrollY > 50) {
		NAV.classList.add('nav-shadow')
	} else {
		NAV.classList.remove('nav-shadow')
	}
}

const currentYear = () => {
	const newDate = new Date().getFullYear()
	FOOTER_YEAR.textContent = newDate
}

const options = {
	rootMargin: '-50px',
}

const startCounter = entry => {
	if (entry[0].isIntersecting) {
		COUNTER_ITEMS.forEach(counter => {
			const updateCounter = () => {
				const finalNumber = counter.getAttribute('data-number')
				const value = parseInt(counter.textContent)

				const speed = finalNumber / 200

				if (value < finalNumber) {
					counter.textContent = `${Math.floor(value + speed)}`
					setTimeout(updateCounter, 1)
				} else {
					counter.textContent = finalNumber
				}
			}

			updateCounter()
		})
	}
}

const observer = new IntersectionObserver(startCounter, options)

document.addEventListener('DOMContentLoaded', main)
