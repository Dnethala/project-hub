ddocument.addEventListener("DOMContentLoaded", function () {
  // Navigation Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // Project Filter & Search Setup
  const filterButtons = document.querySelectorAll(".filter-button");
  const projects = document.querySelectorAll(".searchable-project");
  const searchInput = document.getElementById("projectSearch");
  const noResults = document.getElementById("noResults");

  function filterProjects() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let activeCategory = "All";

    // Check which filter button is currently selected
    for (let i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].classList.contains("active")) {
        activeCategory = filterButtons[i].getAttribute("data-filter");
      }
    }

    let count = 0;

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const category = project.getAttribute("data-category");
      const title = project.getAttribute("data-name").toLowerCase();
      const creator = (project.getAttribute("data-creator") || "").toLowerCase();
      
      const matchesCategory = (activeCategory === "All" || category === activeCategory);
      const matchesSearch = (searchValue === "" || title.includes(searchValue) || creator.includes(searchValue));

      if (matchesCategory && matchesSearch) {
        project.style.display = "block";
        count++;
      } else {
        project.style.display = "none";
      }
    }

    if (noResults) {
      if (count === 0) {
        noResults.hidden = false;
      } else {
        noResults.hidden = true;
      }
    }
  }

  // Handle Category Button Clicks
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
      }
      this.classList.add("active");
      filterProjects();
    });
  }

  // Search Bar Event Listener
  if (searchInput) {
    searchInput.addEventListener("keyup", filterProjects);
  }

  // Sign In Form Validation
  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
      const message = document.getElementById("signInMessage");

      emailError.textContent = "";
      passwordError.textContent = "";
      message.textContent = "";

      let hasError = false;

      if (email.trim() === "") {
        emailError.textContent = "Please enter your email.";
        hasError = true;
      }

      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        hasError = true;
      }

      if (!hasError) {
        message.textContent = "Sign in successful!";
        message.style.color = "#16704b";
        signInForm.reset();
      }
    });
  }

  // Submit Form Validation
  const submitForm = document.getElementById("submitForm");
  if (submitForm) {
    submitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("projectTitle").value;
      const creator = document.getElementById("creatorName").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;
      const message = document.getElementById("submitMessage");

      if (title.trim() === "" || creator.trim() === "" || category === "" || description.trim() === "") {
        message.textContent = "Please fill in all required fields.";
        message.style.color = "#b42318";
      } else {
        message.textContent = "Project submitted successfully!";
        message.style.color = "#16704b";
        submitForm.reset();
      }
    });
  }
});