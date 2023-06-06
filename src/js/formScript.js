let BODY
let NAV
let FIRST_SPECIAL_BTN
let POPUP
let POPUP_FORM
let POPUP_MESSAGE
let INPUT_NAME
let INPUT_LAST_NAME
let INPUT_PHONE_NUMBER
let INPUT_EMAIL
let SELECT_TREATMENT
let INPUT_AMOUNT
let POPUP_ICON
let POPUP_FORM_BTN
let INPUTS_ARRAY

const popupMain = () => {
	popupPrepareDOMElements()
	popupPrepareDOMEvents()
}

const popupPrepareDOMElements = () => {
	BODY = document.querySelector('body')
	NAV = document.querySelector('.nav')
	FIRST_SPECIAL_BTN = document.querySelector('.button-box__item')
	POPUP = document.querySelector('.popup')
	POPUP_FORM = document.querySelector('.popup__form')
	POPUP_MESSAGE = document.querySelector('.popup__message')
	INPUT_NAME = document.querySelector('#popup-name')
	INPUT_LAST_NAME = document.querySelector('#popup-last-name')
	INPUT_PHONE_NUMBER = document.querySelector('#popup-phone-number')
	INPUT_EMAIL = document.querySelector('#popup-email')
	SELECT_TREATMENT = document.querySelector('#popup-treatment')
	INPUT_AMOUNT = document.querySelector('#popup-amount')
	POPUP_ICON = document.querySelector('.popup__box-icon')
	POPUP_FORM_BTN = document.querySelector('.popup__box-btn')
	INPUTS_ARRAY = [INPUT_NAME, INPUT_LAST_NAME, INPUT_PHONE_NUMBER, INPUT_EMAIL, INPUT_AMOUNT]
}

const popupPrepareDOMEvents = () => {
	POPUP.addEventListener('touchstart', showPopup, { passive: true })
	FIRST_SPECIAL_BTN.addEventListener('click', showPopup)
	POPUP_ICON.addEventListener('click', closePopup)
	POPUP_FORM_BTN.addEventListener('click', e => {
		e.preventDefault()

		checkForm(INPUTS_ARRAY)
		checkCharacters(INPUT_PHONE_NUMBER)
		checkNumber(INPUT_PHONE_NUMBER, 9)
		checkMail(INPUT_EMAIL)
		checkSelect(SELECT_TREATMENT)
		checkAmount(INPUT_AMOUNT)
		checkErrors()
	})
}

const showPopup = () => {
	POPUP.classList.add('popup--active')
	FIRST_SPECIAL_BTN.classList.add('button-box__item--active')
	scrollBlock()
}

const closePopup = () => {
	POPUP.classList.remove('popup--active')
	FIRST_SPECIAL_BTN.classList.remove('button-box__item--active')
	setTimeout(() => {
		BODY.classList.remove('scroll-block')
		BODY.classList.remove('scroll-block-padding')
		NAV.classList.remove('scroll-block-padding')
	}, 100)
}

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.popup__box-error')
	formBox.classList.add('warning')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.popup__box-error')
	formBox.classList.remove('warning')
	errorMsg.textContent = ''
}

const clearAll = () => {
	INPUTS_ARRAY.forEach(el => {
		el.value = ''
		el.classList.remove('warning')
	})
	SELECT_TREATMENT.value = '0'
	SELECT_TREATMENT.style.border = 'none'
	FIRST_SPECIAL_BTN.classList.remove('button-box__item--active')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkNumber = (input, min) => {
	if (input.value.length < min) {
		showError(input, 'Numer składa się z przynajmniej 9 cyfr..')
	}
}

const checkCharacters = input => {
	const checkCharacters = new RegExp('^[0-9]*$')

	if (checkCharacters.test(input.value)) {
		clearError(input)
	} else {
		showError(input, 'Możesz używać samych cyfr!')
	}
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'Wprowadź poprawnie swój e-mail..')
	}
}

const checkAmount = input => {
	if (input.value > 0) {
		clearError(input)
	} else {
		showError(input, 'Podaj ilość osób..')
	}
}

const limitAmount = () => {
    if(INPUT_AMOUNT.value > 5) {
        INPUT_AMOUNT.value = '5'
    }
}

const checkSelect = select => {
	if (select.value !== '0') {
		clearError(select)
	} else {
		showError(select, 'Wybierz zabieg..')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.popup__box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('warning')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		clearAll()
		POPUP_MESSAGE.style.display = 'block'
		POPUP_FORM.style.display = 'none'
	}
}

const scrollBlock = () => {
	const documentWidth = document.documentElement.clientWidth
	const windowWidth = window.innerWidth
	const scrollBarWidth = windowWidth - documentWidth
	document.documentElement.style.setProperty('--padding-space', scrollBarWidth + 'px')

	if (POPUP.classList.contains('popup--active')) {
		if (BODY.classList.contains('scroll-block')) {
			BODY.classList.remove('scroll-block')
		} else {
			BODY.classList.add('scroll-block')
		}
	}

	if (scrollBarWidth > 0) {
		BODY.classList.add('scroll-block-padding')
		NAV.classList.add('scroll-block-padding')
	}
}

document.addEventListener('DOMContentLoaded', popupMain)
