let ProjectsGrid = document.getElementById("projects-grid");

import { GetJsonObject, LoadAllProjects } from './ProjectManager.js';

LoadAllProjects(ProjectsGrid);
let JsonObject = GetJsonObject()
SmoothPositionSwap()

function SmoothPositionSwap() {
    const CameFromHomeBool = JSON.parse(localStorage.getItem("CameFromHome"));
    if(!CameFromHomeBool)
        return

    const FromElement0 = JSON.parse(localStorage.getItem("Featured0"));
    const FromElement1 = JSON.parse(localStorage.getItem("Featured1"));
    const FromElement0Html = JSON.parse(localStorage.getItem("Featured0Html"));
    const FromElement1Html = JSON.parse(localStorage.getItem("Featured1Html"));

    const FeaturedProjectsIndecies = JsonObject.FeaturedProjects

    const FeaturedProject0 = document.getElementById("project-card-" + FeaturedProjectsIndecies[0])
    const FeaturedProject1 = document.getElementById("project-card-" + FeaturedProjectsIndecies[1])

    const ToFeaturedProject0 = FeaturedProject0.getBoundingClientRect()
    const ToFeaturedProject1 = FeaturedProject1.getBoundingClientRect()

    const ToFinalPosition0X = ToFeaturedProject0.x
    const ToFinalPosition0Y = ToFeaturedProject0.y
    const ToFinalPosition1X = ToFeaturedProject1.x
    const ToFinalPosition1Y = ToFeaturedProject1.y

    let ProjectsGrid = document.getElementById("projects-grid");

    const FromPosX0 = FromElement0.x
    const FromPosY0 = FromElement0.y
    const FromPosX1 = FromElement1.x
    const FromPosY1 = FromElement1.y

    let Featured0 = document.createElement("div")
    Featured0.innerHTML = FromElement0Html.trim();
    Featured0.className = "project-card"
    Featured0.style.position = "absolute"
    Featured0.style.width = "550px"
    Featured0.style.left = FromPosX0 + "px"
    Featured0.style.top = FromPosY0 + "px"

    ProjectsGrid.appendChild(Featured0)


    let Featured1 = document.createElement("div")
    Featured1.innerHTML = FromElement1Html.trim();
    Featured1.className = "project-card"
    Featured1.style.position = "absolute"
    Featured1.style.width = "550px"
    Featured1.style.left = FromPosX1 + "px"
    Featured1.style.top = FromPosY1 + "px"

    ProjectsGrid.appendChild(Featured1)

    setTimeout(() => {
        LerpToPosition(Featured0, FromPosX0, FromPosY0, ToFinalPosition0X, ToFinalPosition0Y, 0, FeaturedProject0)
        LerpToPosition(Featured1, FromPosX1, FromPosY1, ToFinalPosition1X, ToFinalPosition1Y, 0, FeaturedProject1)
    }, 300);

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

    CurrentProgress += 1/50;

    if(CurrentProgress >= 1) 
    {
        Object.remove()
        Featured.style.visibility = "visible"
        return
    }

    setTimeout(LerpToPosition, 1, Object, FromPosX, FromPosY, ToPosX, ToPosY, CurrentProgress, Featured)
}