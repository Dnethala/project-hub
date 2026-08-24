document.addEventListener("DOMContentLoaded", function () {
  
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  var filterButtons = document.querySelectorAll(".filter-button");
  var searchInput = document.getElementById("projectSearch");
  var noResults = document.getElementById("noResults");

  function filterProjects() {
    var searchValue = "";
    if (searchInput) {
      searchValue = searchInput.value.toLowerCase().trim();
    }

    var activeCategory = "All";
    for (var i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].classList.contains("active")) {
        activeCategory = filterButtons[i].getAttribute("data-filter");
      }
    }

    var projects = document.querySelectorAll(".project-card");
    var visibleCount = 0;

    for (var j = 0; j < projects.length; j++) {
      var project = projects[j];
      
      var category = project.getAttribute("data-category");
      var cardText = project.textContent.toLowerCase();

      var matchesCategory = (activeCategory === "All" || category === activeCategory);
      var matchesSearch = (searchValue === "" || cardText.indexOf(searchValue) !== -1);

      if (matchesCategory && matchesSearch) {
        project.style.display = "block";
        visibleCount = visibleCount + 1;
      } else {
        project.style.display = "none";
      }
    }

    if (noResults) {
      if (visibleCount === 0) {
        noResults.hidden = false;
      } else {
        noResults.hidden = true;
      }
    }
  }

  for (var k = 0; k < filterButtons.length; k++) {
    filterButtons[k].addEventListener("click", function () {
      for (var m = 0; m < filterButtons.length; m++) {
        filterButtons[m].classList.remove("active");
      }
      this.classList.add("active");
      filterProjects();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", filterProjects);
  }

  var signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var emailError = document.getElementById("emailError");
      var passwordError = document.getElementById("passwordError");
      var message = document.getElementById("signInMessage");

      emailError.textContent = "";
      passwordError.textContent = "";
      message.textContent = "";

      var hasError = false;

      if (email.trim() === "") {
        emailError.textContent = "Please enter your email.";
        hasError = true;
      }

      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        hasError = true;
      }

      if (hasError === false) {
        message.textContent = "Sign in successful!";
        message.style.color = "#16704b";
        signInForm.reset();
      }
    });
  }

  var submitForm = document.getElementById("submitForm");
  if (submitForm) {
    submitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      var title = document.getElementById("projectTitle").value;
      var creator = document.getElementById("creatorName").value;
      var category = document.getElementById("category").value;
      var description = document.getElementById("description").value;
      var message = document.getElementById("submitMessage");

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
