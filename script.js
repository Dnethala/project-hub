document.addEventListener("DOMContentLoaded", function () {
  
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  var projectGrid = document.getElementById("projectGrid");
  if (projectGrid) {
    var storedProjects = JSON.parse(localStorage.getItem("userProjects")) || [];
    for (var p = 0; p < storedProjects.length; p++) {
      var item = storedProjects[p];
      var newCard = document.createElement("article");
      newCard.className = "project-card searchable-project";
      newCard.setAttribute("data-category", item.category);

      var imgSrc = item.image ? item.image : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";
      var linkMarkup = item.link ? '<p><a href="' + item.link + '" target="_blank" style="color: #0066cc; text-decoration: underline;">View Project Link →</a></p>' : '';
      var fileMarkup = item.fileName ? '<p style="font-size: 0.85rem; color: #555;">📁 Attached: ' + item.fileName + '</p>' : '';

      newCard.innerHTML = 
        '<div class="project-image">' +
          '<img src="' + imgSrc + '" alt="Submitted project">' +
        '</div>' +
        '<div class="card-content">' +
          '<span class="tag">' + item.category + '</span>' +
          '<h2>' + item.title + '</h2>' +
          '<p>' + item.description + '</p>' +
          linkMarkup +
          fileMarkup +
          '<p class="creator">By ' + item.creator + '</p>' +
        '</div>';

      projectGrid.appendChild(newCard);
    }
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

  if (projectGrid) {
    filterProjects();
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
      var link = document.getElementById("projectLink").value;
      var fileInput = document.getElementById("projectFile");
      var description = document.getElementById("description").value;
      var message = document.getElementById("submitMessage");

      if (title.trim() === "" || creator.trim() === "" || category === "" || description.trim() === "") {
        message.textContent = "Please fill in all required fields.";
        message.style.color = "#b42318";
      } else {
        message.textContent = "Project submitted successfully! Redirecting to Explore...";
        message.style.color = "#16704b";

        var fileName = fileInput && fileInput.files[0] ? fileInput.files[0].name : "";
        var fileIsImage = fileInput && fileInput.files[0] && fileInput.files[0].type.startsWith("image/");

        function saveAndRedirect(imageURL) {
          var newProject = {
            title: title,
            creator: creator,
            category: category,
            link: link,
            fileName: fileName,
            image: imageURL,
            description: description
          };

          var existingProjects = JSON.parse(localStorage.getItem("userProjects")) || [];
          existingProjects.push(newProject);
          localStorage.setItem("userProjects", JSON.stringify(existingProjects));

          submitForm.reset();

          setTimeout(function () {
            window.location.href = "explore.html";
          }, 1200);
        }

        if (fileIsImage) {
          var reader = new FileReader();
          reader.onload = function (event) {
            saveAndRedirect(event.target.result);
          };
          reader.readAsDataURL(fileInput.files[0]);
        } else {
          saveAndRedirect("");
        }
      }
    });
  }

});
