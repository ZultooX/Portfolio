const Split = document.getElementsByClassName("divider")[0]

const BeforeCascading = document.getElementById("before-cascading")
const AfterCascading = document.getElementById("after-cascading")


window.addEventListener("pageshow", function(event) {
    ChangeWindowSize()
    Split.style.left = GetFraction(0.5) + "px"
});

let SplitFraction = 0.5

let Left
let Right

let TotalSize

let fractionBefore

let OffsetX = 0
let IsMouseDown = false
let mouseStartX = 0

let mousePosX = 0

addEventListener("mousemove", (event)=>{
    mousePosX = event.clientX
})

Split.addEventListener("mousedown", ()=>{
    mouseStartX = mousePosX
    IsMouseDown = true

    let DivideRect = document.getElementsByClassName("divider")[0].getClientRects()[0];

    OffsetX = (DivideRect.x + (DivideRect.width * 0.5)) - mousePosX

    setTimeout(MoveXBar, 10)
})

document.addEventListener("mouseup", ()=>{
    IsMouseDown = false
})

let RefWidth = 0

addEventListener("resize", ChangeWindowSize)
function ChangeWindowSize()
{
    const CascadeImageRefRect = document.getElementById("cascade-holder").getClientRects()

    Right = CascadeImageRefRect[0].right
    Left = CascadeImageRefRect[0].left

    TotalSize = CascadeImageRefRect[0].width

    const Height = CascadeImageRefRect[0].height
    RefWidth = CascadeImageRefRect[0].width

    const WidthPx = RefWidth + "px"
    const HeightPx = Height + "px"

    BeforeCascading.style.width = WidthPx
    BeforeCascading.style.height = HeightPx

    AfterCascading.style.width = WidthPx
    AfterCascading.style.height = HeightPx

    Split.style.height = HeightPx

    Split.style.left = GetFraction(SplitFraction) + "px"
}

function GetFraction(Fraction)
{
    const SplitHalfSize = document.getElementsByClassName("divider")[0].getClientRects()[0].width * 0.5

    const FractionWidth = TotalSize * Fraction
    
    return Left + FractionWidth - SplitHalfSize
}

function Clamp(min, max, val)
{
    if(val < min)
        return min
    if(val > max)
        return max

    return val
}

function MoveXBar()
{
    if(!IsMouseDown)
        return

    let TranslatedX = (mousePosX - Left + OffsetX) / RefWidth
    SplitFraction = Clamp(0, 1, TranslatedX)

    Split.style.left = GetFraction(SplitFraction) + "px"

    const DividedLeft = SplitFraction * 100
    const DividedRight = (1 - SplitFraction) * 100

    BeforeCascading.style.clipPath = "inset(0 " + DividedRight + "% 0 0)"
    AfterCascading.style.clipPath = "inset(0 0 0 " + DividedLeft + "%)"

    setTimeout(MoveXBar, 10)
}