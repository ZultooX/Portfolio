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

// let position = 0; // Track the current position

// setInterval(() => {
// 	if (position > -1600)
// 	{
		
// 		position -= 35; // Increment position
// 		document.getElementById("fk_Active").style.transform = `translateX(${position}px)`;
// 		document.getElementById("fk_Next").style.transform = `translateX(${position}px)`;
// 	}
	

// }, 1);
