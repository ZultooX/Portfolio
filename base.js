function onHover_MenuEffect(menuIndex) {
	var menuItems = document.getElementsByClassName("navbar-item");
	var hoveredItem = menuItems[menuIndex];

	hoveredItem.style.transform = "scale(1.5)";
	hoveredItem.style.position = "relative";

	for (let i = 0; i < menuItems.length; i++) {
		if (i < menuIndex) {
			menuItems[i].style.transform = "translateX(-40px)";
		} else if (i > menuIndex) {
			menuItems[i].style.transform = "translateX(40px)";
		}
	}
}

function resetMenuEffect(menuIndex) {
	var menuItems = document.getElementsByClassName("navbar-item");

	for (let i = 0; i < menuItems.length; i++) {
		menuItems[i].style.transform = "scale(1) translateX(0)";
	}
}


function nextImage(totalImages, imageId) {
}


document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburger");
	const navbarLinks = document.querySelector(".navbar-links");
	const navbar = document.querySelector(".navbar");

	hamburger.addEventListener("click", function () {
		navbarLinks.classList.toggle("active");
		navbar.classList.toggle("active");
	});
});


document.querySelector('.me-container').addEventListener('click', function () {
	window.location.href = "about-me.html";
});




// let position = 0; // Track the current position

// setInterval(() => {
// 	if (position > -1600)
// 	{

// 		position -= 35; // Increment position
// 		document.getElementById("fk_Active").style.transform = `translateX(${position}px)`;
// 		document.getElementById("fk_Next").style.transform = `translateX(${position}px)`;
// 	}


// }, 1);
function toggleGameInfo(gameElement) {
	let infoDiv = document.getElementById(gameElement);

	if (infoDiv) {
		infoDiv.classList.toggle('visible'); // Toggle visibility
	}
}


function downloadFile() {
	const element = document.createElement('a');
	const file = new Blob(["This is your file content."], { type: 'text/plain' });
	element.href = URL.createObjectURL(file);
	element.download = "custom_filename.txt"; // Name of the file to download
	element.click();
}



window.dataLayer = window.dataLayer || [];
function ftag() { dataLayer.push(arguments); }
ftag('js', new Date());
ftag('config', 'G-YMNRFE4X1W');