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



// ======================== Show Elements Start =======================


fetch("assets/data/coutries-card.json")
.then(function (response) {
  // response.json() returns a promise, use the same .then syntax to work with the results
  response.json().then(async function  (elements) {
    // users is now our actual variable parsed from the json, so we can use it
   elements.forEach(element => {
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
  </div>`

  document.querySelector('.search-card-wrapp').insertAdjacentHTML('beforeend', div)

   })

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
    const formData = new FormData(e.target);
    let countries = $(".country").val().toString();
    let activities = $(".activities").val().toString();
    const formProps = Object.fromEntries(formData);

    

    let searchData = {
      country: countries.toString(),
      date: formProps.datatime,
      activities: activities.toString(),
    };

    console.log(searchData.date)

    if (searchData.country !== '' || searchData.activities !== '' || searchData.date !== '') {
      document.querySelector('.search-card-wrapp').innerHTML='';

      

      fetch("assets/data/coutries-card.json")
      .then(function (response) {
        // response.json() returns a promise, use the same .then syntax to work with the results
        response.json().then(async function  (elements) {

          let data = [];
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
            (element) =>  element.time?.includes(searchData.date)
          )
          .forEach(el => {
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
          </div>`
        
          document.querySelector('.search-card-wrapp').insertAdjacentHTML('beforeend', div)
          })


        });
      })
      .catch((err) => console.error(err));
    } else {
         
    }

  

   
  });
})();

// ======================  Search End ========================
