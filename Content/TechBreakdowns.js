import { CreateProjectCard } from './ProjectManager.js';

const BreakdownsGrid = document.getElementById("breakdowns-grid")

const Response = await fetch("/Assets/TechBreakdowns.json", { cache: "no-cache" })
const BreakdownsJson = await Response.json()

BreakdownsJson.Breakdowns.forEach((Breakdown, index) => {
    CreateProjectCard(Breakdown, BreakdownsGrid, index, false)
})
