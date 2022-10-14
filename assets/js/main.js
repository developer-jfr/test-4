//====================== Navbar Close Start ========================

const navItems = document.querySelectorAll(".nav-item");
const navbarContent = document.querySelector(".navbar-collapse");
const navbarImg = document.querySelector(".navbar-img");

navItems.forEach((el) => {
  el.addEventListener("click", function () {
    navbarContent.classList.remove("show");
    navbarImg.classList.remove("active");
  });
});

const navbarToggler = document.querySelector(".navbar-toggler");

navbarImg.addEventListener("click", function () {
  navbarImg.classList.toggle("active");
});

//===================== Navbar Close End ==========================

// ======================= Search Start =========================

const form = document.getElementById("search");

(function () {
  form.addEventListener("submit", function (e) {
    // Prevent default behavior
    e.preventDefault();
    // Create new FormData object
    const formData = new FormData(e.target);
    let countries = $(".country").val().toString();
    let activities = $(".activities").val().toString();
    const formProps = Object.fromEntries(formData);

    let searchData = {
      country: countries.toString(),
      date: formProps.datatime,
      activities: activities.toString(),
    };

    fetch("assets/data/coutries-card.json")
      .then(function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
        response.json().then(function (elements) {
          // users is now our actual variable parsed from the json, so we can use it
          elements.filter(
            (element) =>
              element.country?.includes(searchData.country)
          )
          .filter(
            (element) =>
              element.activities?.includes(searchData.activities)
          )
          .filter(
            (element) =>
              element.time?.includes(searchData.date)
          )
          .forEach(el => {
            console.log(el)
          })
        });
      })
      .catch((err) => console.error(err));
  });
})();

// ======================  Search End ========================
