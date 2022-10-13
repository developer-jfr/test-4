
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
    console.log($('.country').val().toString())
    console.log($('.activities').val().toString())
    const formProps = Object.fromEntries(formData);
    
    console.log(formProps)
   
  });
  
})();


// ======================  Search End ========================