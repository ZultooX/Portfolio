let fullScreen = document.createElement("div")
fullScreen.className = "FullscreenFade"
document.body.appendChild(fullScreen)

const ScreenFadeSpeed = 0.005
const MaxOpacity = 1.6

let opacity = MaxOpacity

window.addEventListener("pageshow", function(event) {
    document.body.removeAttribute("hidden")

    opacity = MaxOpacity
    FadeOpacity()
});

document.body.removeAttribute("hidden")
FadeOpacity()

function FadeOpacity() {
    if(fullScreen == undefined)
	    return

    fullScreen.style.opacity = opacity

    opacity -= ScreenFadeSpeed

    if (opacity <= 0) {
        fullScreen.style.opacity = MaxOpacity
        fullScreen.hidden = true
        return
    }
    if(opacity <= 0.7)
    {
        fullScreen.style.pointerEvents = "none"
    }

    setTimeout(FadeOpacity)
}