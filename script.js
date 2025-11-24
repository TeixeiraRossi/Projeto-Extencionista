// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden")

      if (isOpen) {
        mobileMenu.classList.add("hidden")
        menuIcon.classList.remove("hidden")
        closeIcon.classList.add("hidden")
      } else {
        mobileMenu.classList.remove("hidden")
        menuIcon.classList.add("hidden")
        closeIcon.classList.remove("hidden")
      }
    })
  }

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nome = document.getElementById("nome").value
      const email = document.getElementById("email").value
      const mensagem = document.getElementById("mensagem").value

      alert("Mensagem enviada com sucesso!")

      // Reset form
      contactForm.reset()
    })
  }
})
