let fullScreen = document.createElement("div")
fullScreen.className = "FullscreenFade"
document.body.appendChild(fullScreen)

let ScreenFadeSpeed = 0.01
const MaxOpacity = 1.6

let opacity = MaxOpacity

window.addEventListener("pageshow", function(event) {
    document.body.removeAttribute("hidden")

    opacity = MaxOpacity
    requestAnimationFrame(FadeOpacity);
});

document.body.removeAttribute("hidden")
requestAnimationFrame(FadeOpacity);

let lastTime = null;
const FADE_DURATION_MS = 1200;

function FadeOpacity(timestamp) {
    if (fullScreen == undefined) return;

    if (lastTime === null) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    opacity -= (delta / FADE_DURATION_MS) * MaxOpacity;

    fullScreen.style.opacity = opacity;

    if (opacity <= 0) {
        fullScreen.style.opacity = MaxOpacity;
        fullScreen.hidden = true;
        lastTime = null;
        return;
    }
    if (opacity <= 0.7) {
        fullScreen.style.pointerEvents = "none";
    }

    requestAnimationFrame(FadeOpacity);
}