// Builds the Work / Education timeline on the home page from Assets/Experience.json.

const Tabs = document.querySelector(".experience-tabs")
const TabButtons = document.querySelectorAll(".experience-tab-button")

TabButtons.forEach(button => {
    button.addEventListener("click", () => {
        TabButtons.forEach(other => other.classList.toggle("active", other === button))
        document.querySelectorAll(".experience-panel").forEach(panel => {
            panel.classList.toggle("active", panel.id === button.dataset.panel)
        })
        Tabs.classList.toggle("education", button.dataset.panel === "education-experience")
    })
})


const Response = await fetch("/Assets/Experience.json", { cache: "no-cache" })
const ExperienceJson = await Response.json()

FillPanel(document.getElementById("work-experience"), ExperienceJson.Work)
FillPanel(document.getElementById("education-experience"), ExperienceJson.Education)


function FillPanel(Panel, Entries) {
    Entries.forEach(entry => Panel.appendChild(CreateEntry(entry)))
}

function CreateEntry(entry) {
    const Entry = CreateElement("article", "experience-entry")

    const Header = CreateElement("div", "experience-entry-header")
    Entry.appendChild(Header)

    const LogoLink = CreateLink(entry.CompanyLink)
    const Logo = CreateElement("img", "experience-logo")
    Logo.src = "/" + entry.CompanyIcon
    Logo.alt = entry.CompanyName
    if (entry.BackgroundColor)
        Logo.style.backgroundColor = entry.BackgroundColor
    LogoLink.appendChild(Logo)
    Header.appendChild(LogoLink)

    const Heading = CreateElement("div", "experience-heading")
    Header.appendChild(Heading)

    const Company = CreateLink(entry.CompanyLink, "experience-company")
    Company.textContent = entry.CompanyName
    Heading.appendChild(Company)

    const Role = CreateElement("div", "experience-role")
    Role.textContent = entry.Role
    Heading.appendChild(Role)

    const DateChip = CreateElement("div", "experience-date")
    DateChip.textContent = entry.TimeSpan
    Header.appendChild(DateChip)

    if (entry.Info?.length) {
        const Points = CreateElement("ul", "experience-points")
        entry.Info.forEach(text => {
            const Point = document.createElement("li")
            Point.innerHTML = text
            Points.appendChild(Point)
        })
        Entry.appendChild(Points)
    }

    if (entry.LinkButtons?.length) {
        const Links = CreateElement("div", "experience-links")
        entry.LinkButtons.forEach(button => {
            const Link = CreateElement("a", "experience-link")
            Link.href = button.Link
            Link.textContent = button.Title + " →"
            Links.appendChild(Link)
        })
        Entry.appendChild(Links)
    }

    return Entry
}

function CreateElement(tag, className) {
    const Element = document.createElement(tag)
    Element.className = className
    return Element
}

function CreateLink(href, className = "") {
    const Link = CreateElement("a", className)
    Link.href = href
    Link.target = "_blank"
    Link.rel = "noopener"
    return Link
}
