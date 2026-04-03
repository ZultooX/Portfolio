let IconHrefs = [
    "https://www.linkedin.com/in/simon-henriksson-473612216/",
    "https://github.com/8nooThing8",
    "https://noothing.itch.io/"
]

let IconImgs = [
    "/Assets/Images/BottomIcons/LinkedIn.svg",
    "/Assets/Images/BottomIcons/GitHub_Invertocat_White_Clearspace.svg",
    "/Assets/Images/BottomIcons/itch.svg"
]

let BottomBar = document.createElement("div")
BottomBar.className = "bottom-bar"
document.body.appendChild(BottomBar)

let Copyright = document.createElement("div")
Copyright.className = "cpy-right"
BottomBar.appendChild(Copyright)

let CopyRightText = document.createElement("p")
CopyRightText.innerHTML = "© Simon Henriksson 2026"
Copyright.appendChild(CopyRightText)

let Separator = document.createElement("div")
Separator.style.marginLeft = "15px"
Separator.className = "bottombar-separator"
BottomBar.appendChild(Separator)

let mail = document.createElement("p")
mail.style.marginRight = "15px"
mail.style.marginLeft = "auto"
mail.innerHTML = "<a href=\"mailto:simon@pixi.nu\" class=\"a-href-style\">Simon@pixi.nu</a>"
BottomBar.appendChild(mail)

let Separator2 = document.createElement("div")
Separator2.style.marginRight = "15px"
Separator2.className = "bottombar-separator"
BottomBar.appendChild(Separator2)

let BottomAllIconHolder = document.createElement("div")
BottomAllIconHolder.className = "bottom-all-icon-holder"
BottomBar.appendChild(BottomAllIconHolder)

for (let i = 0; i < 3; i++) {
    let BottomIconHolder = document.createElement("div")
    BottomIconHolder.className = "bottom-icon-holder"
    BottomAllIconHolder.appendChild(BottomIconHolder)

    let BottomIcon = document.createElement("a")
    BottomIcon.href = IconHrefs[i]
    BottomIconHolder.appendChild(BottomIcon)

    let BottomIconImage = document.createElement("img")
    BottomIconImage.className = "bottom-icon"
    BottomIconImage.src = IconImgs[i]
    BottomIcon.appendChild(BottomIconImage)
}

let HostedWhere = document.createElement("p")
HostedWhere.className = "hosted-where-text"
HostedWhere.innerHTML = "Portfolio self hosted using <a href=\"https://httpd.apache.org//\" class=\"a-href-style\">Apache</a>"
document.body.appendChild(HostedWhere)