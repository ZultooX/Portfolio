AccentRed = 219
AccentGreen = 164
AccentBlue = 113
document.documentElement.style.setProperty("--accent-color", "rgb(" + AccentRed + ", " + AccentGreen + ", " + AccentBlue + ")");

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

StartBCB.style.height = "fit-content"

breadCrumbBar.appendChild(StartBCB)

const Path = document.createElement("span")
Path.className = "breadcrumb-base"
breadCrumbBar.appendChild(Path)

let StartSlash = document.createElement("span")
StartSlash.innerHTML = "/"
StartSlash.style = "height: fit-content;"
Path.appendChild(StartSlash)

const Cursor = document.createElement("span")
Cursor.className = "accent-color breadcrumb-console-bar-cursor"
Cursor.innerHTML += "█"
Cursor.style = "height: fit-content;"
breadCrumbBar.appendChild(Cursor)

let PathObjectTurnOrangeArray = []
let PathObjectArray = []
let PathArray = []

AssignPath(window.location.pathname != "/")


const TopButtonHolder = document.createElement("div")
TopButtonHolder.className = "top-button-holder"
breadCrumbBar.appendChild(TopButtonHolder)

const buttonNames = ["Home", "Projects", "About"]
const buttonLocations = ["/", "/Projects", "/About"]

for(let i = 0; i < 3; i++)
{
    const Button = document.createElement("a")
    Button.className = "top-button"
    Button.innerText = buttonNames[i]
    Button.href = buttonLocations[i]
    TopButtonHolder.appendChild(Button)
}


function AppendPath(Page, HtmlPage, SetPage) {
    let NewPath = document.createElement("a")
    NewPath.className = "breadcrumb-link"
    NewPath.href = "/" + HtmlPage

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