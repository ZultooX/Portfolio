let FeaturedProjectGrid = document.getElementById("featured-project-grid");

import { LoadFeaturedProjects } from './ProjectManager.js';

LoadFeaturedProjects(FeaturedProjectGrid)


window.addEventListener("beforeunload", function (event) {
    window.onbeforeunload = null;
    GoToAllProjectsPage(); 
});

function GoToAllProjectsPage() {
    const BoundingCard0 = document.getElementById("project-card-0")
    localStorage.setItem("Featured0", JSON.stringify(BoundingCard0.getBoundingClientRect()));
    localStorage.setItem("Featured0Html", JSON.stringify(BoundingCard0.innerHTML));
    
    const BoundingCard1 = document.getElementById("project-card-1")
    localStorage.setItem("Featured1", JSON.stringify(BoundingCard1.getBoundingClientRect()));
    localStorage.setItem("Featured1Html", JSON.stringify(BoundingCard1.innerHTML));

    localStorage.setItem("CameFromHome", JSON.stringify(true));
}