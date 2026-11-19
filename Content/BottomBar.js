let IconHrefs = [
    "https://www.linkedin.com/in/christopher-vedlund",
    "https://github.com/ZultooX",
    "https://zultoox.itch.io/"
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
CopyRightText.innerHTML = "© Christopher Vedlund 2026"
Copyright.appendChild(CopyRightText)

// let Separator = document.createElement("div")
// Separator.style.marginLeft = "15px"
// Separator.className = "bottombar-separator"
// BottomBar.appendChild(Separator)

let mail = document.createElement("p")
mail.style.marginRight = "15px"
mail.style.marginLeft = "auto"
mail.innerHTML = "<a href=\"mailto:vedlundchristopher@gmail.com\" class=\"a-href-style\">vedlundchristopher@gmail.com</a>"
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
HostedWhere.innerHTML = "Portfolio self hosted"
document.body.appendChild(HostedWhere)