let JsonObj = await LoadProjects()

async function LoadProjects() {
    let jsonFile = await fetch("/Assets/Projects.json")
    let JsonString = await jsonFile.text()

    let JsonObj = JSON.parse(JsonString)

    return JsonObj
}

export function GetJsonObject() {
    return JsonObj
}

export function LoadAllProjects(FeaturedProjectGrid) {
    const CameFromHomeBool = JSON.parse(localStorage.getItem("CameFromHome"))
    const FeaturedCount = localStorage.getItem("FeaturedCount")

    const IsHiddenFeatured = (index) => {
        if (!CameFromHomeBool)
            return false

        for (let i = 0; i < FeaturedCount; i++) {
            if (JsonObj.FeaturedProjects[i] == index)
                return true
        }
        return false
    }

    // Projects are shown grouped under their category heading. Each card keeps its
    // original index so the home page -> projects page animation still finds it.
    const Categories = JsonObj.Categories ?? [undefined]

    Categories.forEach(Category => {
        const InCategory = JsonObj.Projects
            .map((Project, index) => ({ Project, index }))
            .filter(({ Project }) => Category === undefined || Project.Category === Category)

        if (InCategory.length === 0)
            return

        if (Category !== undefined) {
            const Heading = document.createElement("h2")
            Heading.className = "project-category-title"
            Heading.textContent = Category
            FeaturedProjectGrid.appendChild(Heading)
        }

        InCategory.forEach(({ Project, index }) => {
            CreateProjectCard(Project, FeaturedProjectGrid, index, IsHiddenFeatured(index))
        })
    })
}

export function LoadFeaturedProjects(FeaturedProjectGrid) {
    let index = 0
    JsonObj.FeaturedProjects.forEach(Project => {
        CreateProjectCard(JsonObj.Projects[Project], FeaturedProjectGrid, index, false)
        index++
    });
}





export function CreateProjectCard(ProjectJson, Grid, index, hidden) {
    let Card = CreateBaseDiv(ProjectJson, Grid, index)

    if (hidden)
        Card.style.visibility = "hidden"

    CreateImage(ProjectJson, Card);
    CreateTitleElement(ProjectJson, Card)
    CreateDescription(ProjectJson, Card)
    CreateSystemsUsed(ProjectJson, Card)
}

function CreateBaseDiv(ProjectJson, BaseGrid, index) {
    let CardLink = document.createElement("a")
    CardLink.href = ProjectJson.HtmlPage
    CardLink.style.textDecoration = "none"
    CardLink.style.color = "inherit"

    let Card = document.createElement("div")

    CardLink.addEventListener("mousedown", () => {
        window.localStorage.setItem("ProjectLastLocation", Card.getBoundingClientRect())
    })

    CardLink.appendChild(Card)
    BaseGrid.appendChild(CardLink)

    Card.id = "project-card-" + index
    Card.className = "project-card"

    return Card
}

function CreateImage(ProjectJson, Card) {
    let ImageBackground = document.createElement("div")
    ImageBackground.className = "project-background"
    Card.appendChild(ImageBackground)

    let ProjectImage = document.createElement("img")
    ProjectImage.className = "project-image"
    ProjectImage.src = "/" + ProjectJson.Thumbnail
    ImageBackground.appendChild(ProjectImage)
}

function CreateTitleElement(ProjectJson, Card) {
    let Title = document.createElement("h2")
    Title.innerHTML = ProjectJson.Title
    Title.className = "project-title"
    Card.appendChild(Title)
}

function CreateDescription(ProjectJson, Card) {
    let DescriptionHolder = document.createElement("div")
    DescriptionHolder.className = "project-description-holder"
    Card.appendChild(DescriptionHolder)

    let Description = document.createElement("p")
    Description.className = "project-description"
    Description.innerHTML = ProjectJson.Description
    DescriptionHolder.appendChild(Description)
}

function CreateSystemsUsed(ProjectJson, Card) {
    let SystemsUsedHolder = document.createElement("div")
    SystemsUsedHolder.className = "project-all-tags-holder"
    Card.appendChild(SystemsUsedHolder)

    CreateTag(SystemsUsedHolder)

    ProjectJson.SystemsUsed.forEach(system => {
        let SystemName = document.createElement("p")
        SystemName.className = "project-tag-name"
        SystemName.innerHTML = system.Name
        SystemName.style.color = system.Color
        SystemsUsedHolder.appendChild(SystemName)
    });
}

function CreateTag(SystemsUsedHolder) {

    let SvgSrc = "http://www.w3.org/2000/svg"

    let SystemsUsedIcon = document.createElementNS(SvgSrc, "svg")
    SystemsUsedIcon.setAttribute("class", "project-tag-icon")
    SystemsUsedIcon.setAttribute("viewBox", "0 0 24 24")
    SystemsUsedHolder.appendChild(SystemsUsedIcon)

    let SystemsUsedIconPath = document.createElementNS(SvgSrc, "path")
    SystemsUsedIconPath.setAttribute("d", "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z")
    SystemsUsedIcon.appendChild(SystemsUsedIconPath)

    let SystemsUsedIconLine = document.createElementNS(SvgSrc, "line")
    SystemsUsedIconLine.setAttribute("x1", "7")
    SystemsUsedIconLine.setAttribute("y1", "7")
    SystemsUsedIconLine.setAttribute("x2", "7.01")
    SystemsUsedIconLine.setAttribute("y2", "7")
    SystemsUsedIcon.appendChild(SystemsUsedIconLine)
}