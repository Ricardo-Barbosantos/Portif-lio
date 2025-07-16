// ++++++++++ SHOW MENU ++++++++++ //
const navMenu = document.getElementById('nav-menu')
    navToggle = document.getElementById('nav-toggle')
    navClose = document.getElementById('nav-close')

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu')
        })
    }

    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show-menu')
        })
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll('.nav__link')

    const linkAction = () =>{
        const navMenu = document.getElementById('nav-menu')
        navMenu.classList.remove('show-menu')
    }
    navLink.forEach(n => n.addEventListener('click', linkAction))

      /*=============== CHANGE BACKGROUND HEADER ===============*/
      const shadowHeader = () =>{
        const header = document.getElementById('header')
        this.scrollY >= 50 ? header.classList.add('shadow-header')
                           : header.classList.remove('shadow-header')
      }
      window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL VALIDATION ===============*/
const contactForm = document.getElementById('contact-form')
const emailInput = document.getElementById('email')
const nameInput = document.getElementById('name')
const subjectInput = document.getElementById('subject')
const messageInput = document.getElementById('message')

// Function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Function to show validation message
const showValidationMessage = (input, message, isValid) => {
    // Remove existing validation message
    const existingMessage = input.parentNode.querySelector('.validation-message')
    if (existingMessage) {
        existingMessage.remove()
    }

    // Create new validation message
    const validationDiv = document.createElement('div')
    validationDiv.className = `validation-message ${isValid ? 'valid' : 'invalid'}`
    validationDiv.textContent = message
    input.parentNode.appendChild(validationDiv)
}

// Email validation on input
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim()
    
    if (email === '') {
        // Remove validation message if field is empty
        const existingMessage = emailInput.parentNode.querySelector('.validation-message')
        if (existingMessage) {
            existingMessage.remove()
        }
        emailInput.style.borderColor = ''
    } else if (validateEmail(email)) {
        showValidationMessage(emailInput, 'Email válido!', true)
        emailInput.style.borderColor = '#28a745'
    } else {
        showValidationMessage(emailInput, 'Por favor, insira um email válido.', false)
        emailInput.style.borderColor = '#dc3545'
    }
})

// Form submission validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let isFormValid = true
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showValidationMessage(nameInput, 'Nome é obrigatório.', false)
        nameInput.style.borderColor = '#dc3545'
        isFormValid = false
    } else {
        nameInput.style.borderColor = '#28a745'
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        showValidationMessage(emailInput, 'Email é obrigatório.', false)
        emailInput.style.borderColor = '#dc3545'
        isFormValid = false
    } else if (!validateEmail(emailInput.value.trim())) {
        showValidationMessage(emailInput, 'Por favor, insira um email válido.', false)
        emailInput.style.borderColor = '#dc3545'
        isFormValid = false
    } else {
        emailInput.style.borderColor = '#28a745'
    }
    
    // Validate subject
    if (subjectInput.value.trim() === '') {
        showValidationMessage(subjectInput, 'Assunto é obrigatório.', false)
        subjectInput.style.borderColor = '#dc3545'
        isFormValid = false
    } else {
        subjectInput.style.borderColor = '#28a745'
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        showValidationMessage(messageInput, 'Mensagem é obrigatória.', false)
        messageInput.style.borderColor = '#dc3545'
        isFormValid = false
    } else {
        messageInput.style.borderColor = '#28a745'
    }
    
    if (isFormValid) {
        // Show success message
        const successDiv = document.createElement('div')
        successDiv.className = 'form-success'
        successDiv.textContent = 'Email Enviado com sucesso! Obrigado pelo contato.'
        contactForm.appendChild(successDiv)
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset()
            successDiv.remove()
            // Reset border colors
            nameInput.style.borderColor = ''
            emailInput.style.borderColor = ''
            subjectInput.style.borderColor = ''
            messageInput.style.borderColor = ''
            // Remove validation messages
            document.querySelectorAll('.validation-message').forEach(msg => msg.remove())
        }, 3000)
    }
})

