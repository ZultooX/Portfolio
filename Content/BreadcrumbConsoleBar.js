
const breadCrumbBarHolder = document.createElement("div")
breadCrumbBarHolder.className = "breadcrumb-console-bar-holder"
document.body.appendChild(breadCrumbBarHolder)

const breadCrumbBar = document.createElement("div")
breadCrumbBar.className = "breadcrumb-console-bar"
breadCrumbBarHolder.appendChild(breadCrumbBar)

const StartBCB = document.createElement("a")
StartBCB.className = "accent-color"
StartBCB.innerHTML = "~"
StartBCB.href = window.location.origin
StartBCB.style.textDecoration = "none"

StartBCB.addEventListener("mouseenter", function () { UnHoveredItemBreadCrum(this) })
StartBCB.addEventListener("mouseleave", function () { HoveredItemBreadCrum(this) })

breadCrumbBar.appendChild(StartBCB)

const Path = document.createElement("span")
Path.className = "breadcrumb-base"
breadCrumbBar.appendChild(Path)

let StartSlash = document.createElement("span")
StartSlash.innerHTML = "/"
Path.appendChild(StartSlash)

const Cursor = document.createElement("span")
Cursor.className = "accent-color breadcrumb-console-bar-cursor"
Cursor.innerHTML += "█"
breadCrumbBar.appendChild(Cursor)

let PathObjectTurnOrangeArray = []
let PathObjectArray = []
let PathArray = []

AssignPath(window.location.pathname != "/")



function AppendPath(Page, HtmlPage, SetPage) {
    let NewPath = document.createElement("a")
    NewPath.className = "breadcrumb-link"
    NewPath.href = "/" + HtmlPage

    NewPath.style.textDecoration = "none"
    NewPath.style.color = "rgb(199, 207, 230)"

    Path.appendChild(NewPath)
    PathObjectArray.push(NewPath)
    PathObjectTurnOrangeArray.push(NewPath)

    let Slash = document.createElement("span")
    Path.appendChild(Slash)
    PathObjectArray.push(Slash)

    if (SetPage) {
        NewPath.innerHTML = Page
        Slash.innerHTML = "/"
    }
}

function WriteNextLetter(ElementIndex, str, letterIndex) {
    if (letterIndex >= str.length) {
        ElementIndex += 1
        if (ElementIndex <= PathArray.length - 1) {
            setTimeout(WriteNextLetter, Math.random() * 30 + 8, ElementIndex, PathArray[ElementIndex], 0)
        }

        return
    }

    PathObjectArray[ElementIndex].innerHTML += str[letterIndex]

    setTimeout(WriteNextLetter, Math.random() * 30 + 8, ElementIndex, str, letterIndex + 1)
}

window.addEventListener("beforeunload", () => {
    //window.localStorage.setItem("CameFromPage", FullPath)

    let breadCrumbBar = document.getElementsByClassName("breadcrumb-base")[0]
    window.localStorage.setItem("CameFromPageHtml", breadCrumbBar.innerHTML)
})



function AssignPath(IsFirstPage) {
    let LastPath = window.localStorage.getItem("CameFromPage")

    let Substring = ".html"
    let FullPath = window.location.pathname.replaceAll(Substring, "")

    if (FullPath == "/")
        return

    let TotalPath = ""

    let SlashMatched = (FullPath + "/").matchAll("/").toArray()

    for (let i = 1; i < SlashMatched.length; i++) {
        const PathToAdd = FullPath.substring(SlashMatched[i - 1].index + 1, SlashMatched[i].index)

        PathArray.push(PathToAdd)
        PathArray.push("/")

        TotalPath += PathToAdd + "/"
        AppendPath(PathToAdd, TotalPath.substring(0, TotalPath.length - 1), false)
    }

    WriteNextLetter(0, PathArray[0], 0)
}

function ErasePath(CurrentIndex, TotalLength) {
    let CurrentPath = PathObjectArray[PathArray.length - 1]
    let GoToIndex = CurrentPath.length

    CurrentPath.innerHTML = CurrentPath.innerHTML.substring(0, CurrentIndex)

    if (CurrentIndex >= GoToIndex) {
        PathArray.pop()
        TotalLength = PathArray[PathArray.length - 1].length
        CurrentIndex = TotalLength
    }

    setTimeout(ErasePath, 20, CurrentIndex - 1, TotalLength)
}


function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}


Speed = 25
OneDivSpeed = 1 / Speed

const RootStyles = getComputedStyle(document.documentElement);
const AccentColor = RootStyles.getPropertyValue('--accent-color').trim();

for (i = 0; i < PathObjectTurnOrangeArray.length; i++) {
    PathObjectTurnOrangeArray[i].addEventListener("mouseenter", function () { HoveredItemBreadCrum(this) })
    PathObjectTurnOrangeArray[i].addEventListener("mouseleave", function () { UnHoveredItemBreadCrum(this) })
}

function SetStartVars(Item, OnOff) {
    Item.CurrentProgress = 0
    Item.Count = 0
    Item.OnOff = OnOff
}
function HoveredItemBreadCrum(Item) {
    SetStartVars(Item, false)
    FadeColorBreadCrumb(Item);
}
function UnHoveredItemBreadCrum(Item) {
    SetStartVars(Item, true)
    FadeColorBreadCrumb(Item);
}

function FadeColorBreadCrumb(Item) {
    if (Item.Count++ < Speed) {

        Item.CurrentProgress += OneDivSpeed

        let realProgress = (!Item.OnOff ? Item.CurrentProgress : 1 - Item.CurrentProgress)

        red = lerp(199, AccentRed, realProgress)
        green = lerp(207, AccentGreen, realProgress)
        blue = lerp(230, AccentBlue, realProgress)

        Item.style.color = "rgb(" + red + ", " + green + ", " + blue + ")"

        setTimeout(FadeColorBreadCrumb, OneDivSpeed, Item, Item.OnOff)
        return;
    }
}