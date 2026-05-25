const box = document.createElement("div");
box.classList.add("navbar-bg");

document.body.appendChild(box);

const leftGroup = document.createElement("div");
leftGroup.classList.add("navbar-leftgroup");

// LEFT GROUP
const nameDiv = document.createElement("div");
nameDiv.classList.add("name-container");

nameDiv.onclick = () => {
    window.location.href = "/#";
}

const divider = document.createElement("div");
divider.classList.add("navbar-divider");

const nameText = document.createElement("div");
nameText.textContent = "Christopher Vedlund";
nameText.classList.add("name-text")

const titleText = document.createElement("div");
titleText.textContent = "Gameplay • Engine • Tools Programmer";
titleText.classList.add("title-text");


const leftMenu = document.createElement("div");
leftMenu.classList.add("navbar-menu-container");
const resumeButton = document.createElement("a");
resumeButton.textContent = "RESUME";
resumeButton.classList.add("navbar-menu-item");
resumeButton.href = "downloads/christopher-vedlund-resume.pdf";
resumeButton.target = "_blank";
resumeButton.rel = "noopener noreferrer";
leftMenu.appendChild(resumeButton);

const linkedinButton = Object.assign(document.createElement("a"), {
  textContent: "LINKEDIN",
  href: "https://www.linkedin.com/in/christopher-vedlund",
  target: "_blank",
  rel: "noopener noreferrer",
});

linkedinButton.classList.add("navbar-menu-item");

leftMenu.appendChild(linkedinButton);


nameDiv.appendChild(nameText);
nameDiv.appendChild(titleText);

leftGroup.appendChild(nameDiv);
leftGroup.appendChild(divider);
leftGroup.appendChild(leftMenu);



const menu = document.createElement("div");
menu.classList.add("navbar-menu-container");


const homeButton = document.createElement("a");
homeButton.textContent = "HOME";
homeButton.classList.add("navbar-menu-item");
homeButton.href = "/";
menu.appendChild(homeButton);


const highlightsButton = document.createElement("a");
highlightsButton.textContent = "HIGHLIGHTS";
highlightsButton.classList.add("navbar-menu-item");
highlightsButton.href = "/#highlights";
menu.appendChild(highlightsButton);

const aboutButton = document.createElement("a");
aboutButton.textContent = "ABOUT";
aboutButton.classList.add("navbar-menu-item");
aboutButton.href = "/#about";
menu.appendChild(aboutButton);

const gamesButton = document.createElement("a");
gamesButton.textContent = "GAMES";
gamesButton.classList.add("navbar-menu-item");
gamesButton.href = "/games.html";
menu.appendChild(gamesButton);

const projectsButton = document.createElement("a");
projectsButton.textContent = "PROJECTS";
projectsButton.classList.add("navbar-menu-item");
projectsButton.href = "/projects.html";
menu.appendChild(projectsButton);

const techBreakDowns = document.createElement("a");
techBreakDowns.textContent = "TECH BREAKDOWNS";
techBreakDowns.classList.add("navbar-menu-item");
techBreakDowns.href = "/tech-breakdowns.html";
menu.appendChild(techBreakDowns);

// APPEND
box.appendChild(leftGroup);
box.appendChild(menu);