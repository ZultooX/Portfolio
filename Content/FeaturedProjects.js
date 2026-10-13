let FeaturedProjectGrid = document.getElementById("featured-project-grid");

import { LoadFeaturedProjects } from './ProjectManager.js';

LoadFeaturedProjects(FeaturedProjectGrid)


window.addEventListener("beforeunload", function (event) {
    window.onbeforeunload = null;
    GoToAllProjectsPage(); 
});

const projectCards = document.getElementsByClassName("project-card")

function GoToAllProjectsPage() {
    let totalCards = 0

    for (let i = 0; i < projectCards.length; i++) 
    {
        const card = projectCards[i];

        const cardClientRect = card.getClientRects()[0]
        const FeaturedProjectGridClientRect = FeaturedProjectGrid.getClientRects()[0]
        if(cardClientRect.top >= FeaturedProjectGridClientRect.bottom)
            continue

        const currentFeaturedName = "Featured" + i 
        const currentFeaturedHtml = "Featured" + i + "Html"
        
        localStorage.setItem(currentFeaturedName, JSON.stringify(card.getBoundingClientRect()));
        localStorage.setItem(currentFeaturedHtml, JSON.stringify(card.innerHTML));

        totalCards++
    }
    
    localStorage.setItem("CameFromHome", JSON.stringify(true));

    localStorage.setItem("FeaturedCount", JSON.stringify(totalCards));
}