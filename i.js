document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navbarLinks = document.querySelector(".navbar-links");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", function () {
        navbarLinks.classList.toggle("active");
        navbar.classList.toggle("active");
    });
});