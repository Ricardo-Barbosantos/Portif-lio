
window.onload = () => {
  window.scrollTo(0, 0);
};

// ++++++++++ SHOW MENU ++++++++++ //
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== EMAIL VALIDATION ===============*/
const contactForm = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to show validation message
const showValidationMessage = (input, message, isValid) => {
  // Remove existing validation message
  const existingMessage = input.parentNode.querySelector(".validation-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new validation message
  const validationDiv = document.createElement("div");
  validationDiv.className = `validation-message ${isValid ? "valid" : "invalid"}`;
  validationDiv.textContent = message;
  input.parentNode.appendChild(validationDiv);
};

// Email validation on input
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();

  if (email === "") {
    // Remove validation message if field is empty
    const existingMessage = emailInput.parentNode.querySelector(".validation-message");
    if (existingMessage) {
      existingMessage.remove();
    }
    emailInput.classList.remove("valid", "invalid"); // Remove classes
  } else if (validateEmail(email)) {
    showValidationMessage(emailInput, "Email válido!", true);
    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");
  } else {
    showValidationMessage(emailInput, "Por favor, insira um email válido.", false);
    emailInput.classList.remove("valid");
    emailInput.classList.add("invalid");
  }
});

/*=============== EMAILJS INTEGRATION ===============*/
// Inicializar EmailJS com sua Public Key
emailjs.init("HB_i2hwHyvsIPnYYv"); // Substitua pela sua PUBLIC_KEY

// Form submission with EmailJS
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  // Validate name
  if (nameInput.value.trim() === "") {
    showValidationMessage(nameInput, "Nome é obrigatório.", false);
    nameInput.classList.add("invalid");
    isFormValid = false;
  } else {
    nameInput.classList.remove("invalid");
    nameInput.classList.add("valid");
  }

  // Validate email
  if (emailInput.value.trim() === "") {
    showValidationMessage(emailInput, "Email é obrigatório.", false);
    emailInput.classList.add("invalid");
    isFormValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showValidationMessage(emailInput, "Por favor, insira um email válido.", false);
    emailInput.classList.add("invalid");
    isFormValid = false;
  } else {
    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");
  }

  // Validate subject
  if (subjectInput.value.trim() === "") {
    showValidationMessage(subjectInput, "Assunto é obrigatório.", false);
    subjectInput.classList.add("invalid");
    isFormValid = false;
  } else {
    subjectInput.classList.remove("invalid");
    subjectInput.classList.add("valid");
  }

  // Validate message
  if (messageInput.value.trim() === "") {
    showValidationMessage(messageInput, "Mensagem é obrigatória.", false);
    messageInput.classList.add("invalid");
    isFormValid = false;
  } else {
    messageInput.classList.remove("invalid");
    messageInput.classList.add("valid");
  }

  if (isFormValid) {
    // Show loading state
    const submitButton = contactForm.querySelector("button[type=\'submit\']");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    // Enviar formulário com EmailJS
    emailjs
      .sendForm("service_ajzjewr", "template_bibizhr", contactForm) // Substitua pelos seus SERVICE_ID e TEMPLATE_ID
      .then(
        () => {
          // Sucesso
          const successDiv = document.createElement("div");
          successDiv.className = "form-success";
          successDiv.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
          contactForm.appendChild(successDiv);

          // Resetar formulário após 3 segundos
          setTimeout(() => {
            contactForm.reset();
            successDiv.remove();
            // Resetar botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            // Resetar classes
            nameInput.classList.remove("valid", "invalid");
            emailInput.classList.remove("valid", "invalid");
            subjectInput.classList.remove("valid", "invalid");
            messageInput.classList.remove("valid", "invalid");
            // Remover mensagens de validação
            document.querySelectorAll(".validation-message").forEach((msg) => msg.remove());
          }, 3000);
        },
        (error) => {
          // Erro
          console.log("FALHA...", error);
          const errorDiv = document.createElement("div");
          errorDiv.className = "validation-message invalid";
          errorDiv.textContent = "Erro ao enviar mensagem. Tente novamente.";
          contactForm.appendChild(errorDiv);

          submitButton.textContent = originalText;
          submitButton.disabled = false;

          setTimeout(() => {
            errorDiv.remove();
          }, 5000);
        }
      );
  }
});


