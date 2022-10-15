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

// ==================== Load More Start ===============================

let loadMoreBtn = document.querySelector(".loadmore");
let currentItem = 3;
loadMoreBtn.addEventListener("click", function () {
  let containers = [...document.querySelectorAll(".search-card")];

  for (let i = currentItem; i < currentItem + 3; i++) {
    containers[i]?.setAttribute("style", "display: inline-block;");
  }

  currentItem += 3;
  if (currentItem >= containers.length) {
    loadMoreBtn.setAttribute("style", "display: none;");
  } else {
    loadMoreBtn.setAttribute("style", "display: block;");
  }
});

// =================== Load More End ===================================

// ======================== Show Elements Start =======================

fetch("assets/data/coutries-card.json")
  .then(function (response) {
    // response.json() returns a promise, use the same .then syntax to work with the results
    response.json().then(async function (elements) {
      // users is now our actual variable parsed from the json, so we can use it
      elements.forEach((element) => {
        let div = ` <div class="search-card">
    <div class="search-default">
      <span class="search-coutry-name">${element.country}</span>
      <div class="search-content">
        <div class="d-flex">
          <span>Activities:</span>
          <p>${element.activities}</p>
        </div>
        <div class="d-flex">
          <span>Time:</span>
          <p>${element.time}</p>
        </div>
      </div>
    </div>
    <div class="hover-search">
      <span>${element.description}</span>
      <a href="#">Experience this</a>
    </div>
  </div>`;

        document
          .querySelector(".search-card-wrapp")
          .insertAdjacentHTML("beforeend", div);
      });
    });
  })
  .catch((err) => console.error(err));

// ======================= Search Start =========================

const form = document.getElementById("search");

(function () {
  form.addEventListener("submit", function (e) {
    // Prevent default behavior
    e.preventDefault();

    // Create new FormData object
    let countries = $(".country").val();
    let activities = $(".activities").val();

    let searchData = {
      country: countries,
      date: $(".datatime").val(),
      activities: $(".activities").val(),
    };

    document.querySelector(".search-card-wrapp").innerHTML = "";

  console.log(searchData.activities)
    fetch("assets/data/coutries-card.json")
      .then(function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
        response.json().then(async function (elements) {
          // users is now our actual variable parsed from the json, so we can use it
          elements
            .filter(
              (element) => {
                if(searchData.country.includes(element.country) ) {
                  return element
                } else if (searchData.country.length === 0) {
                  return element
                } 
              }
            )
            .filter(
              (element) => {
                if(searchData.date.includes(element.time) ) {
                  return element
                } else if (searchData.date.length === 0) {
                  return element
                } 
              }
            )
            .filter(
              (element) => {
                if(searchData.activities.includes(element.activities) ) {
                  return element
                } else if (searchData.activities.length === 0) {
                  return element
                }
              }
            )
            .forEach((el, index, array) => {
              console.log(el)
              let div = ` <div class="search-card">
              <div class="search-default">
                <span class="search-coutry-name">${el.country}</span>
                <div class="search-content">
                  <div class="d-flex">
                    <span>Activities:</span>
                    <p>${el.activities}</p>
                  </div>
                  <div class="d-flex">
                    <span>Time:</span>
                    <p>${el.time}</p>
                  </div>
                </div>
              </div>
              <div class="hover-search">
                <span>${el.description}</span>
                <a href="#">Experience this</a>
              </div>
            </div>`;

              document
                .querySelector(".search-card-wrapp")
                .insertAdjacentHTML("beforeend", div);

              if (array.length > 3) {
                loadMoreBtn.setAttribute("style", "display: block;");
              } else {
                loadMoreBtn.setAttribute("style", "display: none;");
              }
            });
        });
      })
      .catch((err) => console.error(err));
  });
})();

// ======================  Search End ========================
