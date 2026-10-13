let ProjectsGrid = document.getElementById("projects-grid");

import { GetJsonObject, LoadAllProjects } from './ProjectManager.js';

LoadAllProjects(ProjectsGrid);
let JsonObject = GetJsonObject()
SmoothPositionSwap()

function SmoothPositionSwap() {
    const CameFromHomeBool = JSON.parse(localStorage.getItem("CameFromHome"));
    if(!CameFromHomeBool)
        return
    
    const FeaturedProjectIndecies = JsonObject.FeaturedProjects

    const FeaturedCount = localStorage.getItem("FeaturedCount")
    for (let i = 0; i < FeaturedCount; i++) 
    {
        const index = FeaturedProjectIndecies[i];
        
        const FromElement = JSON.parse(localStorage.getItem("Featured" + i));
        const FromElementHtml = JSON.parse(localStorage.getItem("Featured" + i + "Html"));


        const FeaturedProject = document.getElementById("project-card-" + index)

        const ToFeaturedProject = FeaturedProject.getBoundingClientRect()

        const ToFinalPositionX = ToFeaturedProject.x
        const ToFinalPositionY = ToFeaturedProject.y

        let ProjectsGrid = document.getElementById("projects-grid");

        const FromPosX = FromElement.x
        const FromPosY = FromElement.y

        let Featured = document.createElement("div")
        Featured.innerHTML = FromElementHtml.trim();
        Featured.className = "project-card"
        Featured.style.position = "absolute"
        Featured.style.width = "550px"
        Featured.style.left = FromPosX + "px"
        Featured.style.top = FromPosY + "px"

        ProjectsGrid.appendChild(Featured)

        setTimeout(() => {
            LerpToPosition(Featured, FromPosX, FromPosY, ToFinalPositionX, ToFinalPositionY, 0, FeaturedProject)
        }, 500);
    }

    localStorage.setItem("CameFromHome", JSON.stringify(false));
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function LerpToPosition(Object, FromPosX, FromPosY, ToPosX, ToPosY, CurrentProgress, Featured) {

    let LerpedX = lerp(FromPosX, ToPosX, CurrentProgress)
    let LerpedY = lerp(FromPosY, ToPosY, CurrentProgress)

    Object.style.left = LerpedX + "px"
    Object.style.top = LerpedY + "px"

    CurrentProgress += 1/60;

    if(CurrentProgress >= 1) 
    {
        Object.remove()
        Featured.style.visibility = "visible"
        return
    }

    setTimeout(LerpToPosition, 1, Object, FromPosX, FromPosY, ToPosX, ToPosY, CurrentProgress, Featured)
}