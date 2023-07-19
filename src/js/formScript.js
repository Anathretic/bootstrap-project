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
let INPUT_DATE
let INPUT_HOUR
let POPUP_ICON
let INPUTS_ARRAY

let SECOND_PROGRESS_BAR
let THIRD_PROGRESS_BAR
let FOURTH_PROGRESS_BAR
let FIRST_FORM
let SECOND_FORM
let THIRD_FORM
let FOURTH_FORM
let FIRST_FORM_NEXT_BTN
let SECOND_FORM_BACK_BTN
let SECOND_FORM_NEXT_BTN
let THIRD_FORM_BACK_BTN
let THIRD_FORM_NEXT_BTN
let FOURTH_FORM_BACK_BTN
let FOURTH_FORM_SEND_BTN

let ALL_INPUTS
let ERROR_COUNT = 0

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
	INPUT_DATE = document.querySelector('#popup-date')
	INPUT_HOUR = document.querySelector('#popup-time')
	POPUP_ICON = document.querySelector('.popup__icon')
	INPUTS_ARRAY = [INPUT_NAME, INPUT_LAST_NAME, INPUT_PHONE_NUMBER, INPUT_EMAIL, INPUT_AMOUNT]
	SECOND_PROGRESS_BAR = document.querySelector('.popup__header-progressbar--second')
	THIRD_PROGRESS_BAR = document.querySelector('.popup__header-progressbar--third')
	FOURTH_PROGRESS_BAR = document.querySelector('.popup__header-progressbar--fourth')
	FIRST_FORM = document.querySelector('.popup__form--first')
	SECOND_FORM = document.querySelector('.popup__form--second')
	THIRD_FORM = document.querySelector('.popup__form--third')
	FOURTH_FORM = document.querySelector('.popup__form--fourth')
	FIRST_FORM_NEXT_BTN = document.querySelector('.popup__buttons-btn--first-next')
	SECOND_FORM_BACK_BTN = document.querySelector('.popup__buttons-btn--second-back')
	SECOND_FORM_NEXT_BTN = document.querySelector('.popup__buttons-btn--second-next')
	THIRD_FORM_BACK_BTN = document.querySelector('.popup__buttons-btn--third-back')
	THIRD_FORM_NEXT_BTN = document.querySelector('.popup__buttons-btn--third-next')
	FOURTH_FORM_BACK_BTN = document.querySelector('.popup__buttons-btn--fourth-back')
	FOURTH_FORM_SEND_BTN = document.querySelector('.popup__buttons-btn--fourth-send')
	ALL_INPUTS = document.querySelectorAll('.popup__box')
}

const popupPrepareDOMEvents = () => {
	POPUP.addEventListener('touchstart', showBookForm, { passive: true })
	FIRST_SPECIAL_BTN.addEventListener('click', showBookForm)
	POPUP_ICON.addEventListener('click', closeBookForm)
	FIRST_FORM_NEXT_BTN.addEventListener('click', () => {
		checkForm(INPUT_NAME)
		checkForm(INPUT_LAST_NAME)
		checkErrors()

		if (ERROR_COUNT === 0) {
			forwardToSecondForm()
		}
	})
	SECOND_FORM_BACK_BTN.addEventListener('click', () => {
		clearAllErrors()
		backToFirstForm()
	})
	SECOND_FORM_NEXT_BTN.addEventListener('click', () => {
		checkCharacters(INPUT_PHONE_NUMBER)
		checkNumber(INPUT_PHONE_NUMBER, 9)
		checkMail(INPUT_EMAIL)
		checkErrors()

		if (ERROR_COUNT === 0) {
			forwardToThirdForm()
		}
	})
	THIRD_FORM_BACK_BTN.addEventListener('click', () => {
		clearAllErrors()
		backToSecondForm()
	})
	THIRD_FORM_NEXT_BTN.addEventListener('click', () => {
		checkSelect(SELECT_TREATMENT)
		checkAmount(INPUT_AMOUNT)
		checkErrors()

		if (ERROR_COUNT === 0) {
			forwardToFourthForm()
		}
	})
	FOURTH_FORM_BACK_BTN.addEventListener('click', () => {
		clearAllErrors()
		backToThirdForm()
	})
	FOURTH_FORM_SEND_BTN.addEventListener('click', e => {
		e.preventDefault()

		checkDate(INPUT_DATE)
		checkHour(INPUT_HOUR)
		checkErrors()

		if (ERROR_COUNT === 0) {
			INPUTS_ARRAY.forEach(el => {
				el.value = ''
			})

			SELECT_TREATMENT.value = '0'
			SELECT_TREATMENT.style.border = 'none'

			FOURTH_FORM.style.display = 'none'
			POPUP_MESSAGE.style.display = 'block'

			setTimeout(() => {
				window.location.href = '/'
			}, 2500)
		}
	})
}

const showBookForm = () => {
	POPUP.classList.add('popup--active')
	FIRST_SPECIAL_BTN.classList.add('button-box__item--active')
	scrollBlock()
}

const closeBookForm = () => {
	POPUP.classList.remove('popup--active')
	FIRST_SPECIAL_BTN.classList.remove('button-box__item--active')
	setTimeout(() => {
		BODY.classList.remove('scroll-block')
		BODY.classList.remove('scroll-block-padding')
		NAV.classList.remove('scroll-block-padding')
	}, 150)
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

const clearAllErrors = () => {
	ALL_INPUTS.forEach(el => {
		el.classList.remove('warning')
	})
}

const checkForm = el => {
	const numbers = /[0-9]/

	if (el.value === '' || el.value.match(numbers)) {
		showError(el, el.placeholder)
	} else {
		clearError(el)
	}
}

const checkNumber = (input, min) => {
	if (input.value.length < min) {
		showError(input, 'Numer składa się z min. 9 cyfr..')
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
		showError(email, 'Wprowadź poprawnie e-mail..')
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
	if (INPUT_AMOUNT.value > 20) {
		INPUT_AMOUNT.value = '20'
	} else if (INPUT_AMOUNT.value < 0) {
		INPUT_AMOUNT.value = '0'
	}
}

const checkSelect = select => {
	if (select.value !== '0') {
		clearError(select)
	} else {
		showError(select, 'Wybierz zabieg..')
	}
}

const checkDate = date => {
	const re = /^\d{4}-\d{2}-\d{2}$/

	if (re.test(date.value)) {
		clearError(date)
	} else {
		showError(date, 'Wprowadź prawidłową datę..')
	}
}

const checkHour = hour => {
	const re = /^([1]?[0-7]):([0, 3][0])?$/

	if(re.test(hour.value)) {
		clearError(hour)
	} else {
		showError(hour, 'Pracujemy od 10:00 do 18:00..')
	}
	console.log(hour.value);
}

const checkErrors = () => {
	ERROR_COUNT = 0

	ALL_INPUTS.forEach(el => {
		if (el.classList.contains('warning')) {
			ERROR_COUNT++
		}
	})
}

const backToFirstForm = () => {
	FIRST_FORM.style.display = 'flex'
	SECOND_FORM.style.display = 'none'
	SECOND_PROGRESS_BAR.classList.remove('popup-progressbar-active')
}

const forwardToSecondForm = () => {
	FIRST_FORM.style.display = 'none'
	SECOND_FORM.style.display = 'flex'
	SECOND_PROGRESS_BAR.classList.add('popup-progressbar-active')
}

const backToSecondForm = () => {
	SECOND_FORM.style.display = 'flex'
	THIRD_FORM.style.display = 'none'
	THIRD_PROGRESS_BAR.classList.remove('popup-progressbar-active')
}

const forwardToThirdForm = () => {
	SECOND_FORM.style.display = 'none'
	THIRD_FORM.style.display = 'flex'
	THIRD_PROGRESS_BAR.classList.add('popup-progressbar-active')
}

const backToThirdForm = () => {
	THIRD_FORM.style.display = 'flex'
	FOURTH_FORM.style.display = 'none'
	FOURTH_PROGRESS_BAR.classList.remove('popup-progressbar-active')
}

const forwardToFourthForm = () => {
	THIRD_FORM.style.display = 'none'
	FOURTH_FORM.style.display = 'flex'
	FOURTH_PROGRESS_BAR.classList.add('popup-progressbar-active')
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
