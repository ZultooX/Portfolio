let MonsKnife1 = document.getElementById("Knife1")
let MonsKnife2 = document.getElementById("Knife2")

MonsKnife1.addEventListener('click', () => {
    if(CurrentDiceIndex < 5)
        ClickedDice(CurrentDiceIndex + 1)
    })
MonsKnife2.addEventListener('click', () => {
    if(CurrentDiceIndex > 0)
        ClickedDice(CurrentDiceIndex - 1)
    })




let DiceCarousel = document.getElementById("DiceCarousel")
let Dice = document.getElementsByClassName("Dice")
let WhatDoTexts = document.getElementsByClassName("WhatDoText")

let CurrentDiceIndex = 0

if (localStorage.getItem('CurrentDiceIndex') !== null) {
  CurrentDiceIndex = localStorage.getItem('CurrentDiceIndex')
}

let NextIndex = CurrentDiceIndex;

let SubscribedIndex = 0

let FirstPosition = 100 * (CurrentDiceIndex) * -1
DiceCarousel.style.transform = "translateX(" + FirstPosition + "%)"

let AnimateTime = 500;

let IsAnimating = false

let Animations

for (let i = 0; i < Dice.length; i++) 
{
    const element = Dice[i];
    
    element.index = i;

    element.addEventListener('click', DicePress)
}

Dice[CurrentDiceIndex].id = "ActiveDice";
WhatDoTexts[CurrentDiceIndex].id = "ActiveText";

function DicePress()
{
    ClickedDice(this.index)
}

function ClickedDice(Index)
{
    if(Index == CurrentDiceIndex || Index == NextIndex)
        return
    if(IsAnimating)
    {
        for (let i = 0; i < Animations.length; i++) 
        {
            const element = Animations[i];
            element.playbackRate = 2;

            SubscribedIndex = Index
        }

        Animations[0].finished.then(() => {
            if(SubscribedIndex > NextIndex)
                GoRight()
            else
                GoLeft()
            });

        return
    }

    if(Index > CurrentDiceIndex)
        GoRight()
    else
        GoLeft()
}

function MakeOthersAway()
{
    for (let i = 0; i < Dice.length; i++) 
    {
        if (i == CurrentDiceIndex) 
        {
            continue
        }

        

        Dice[i].style.filter = "blur(8px)"
        Dice[i].style.scale = ".6"
        WhatDoTexts[i].id = "";
    }
}

function CalculateAndMoveCarosel()
{
    Dice[CurrentDiceIndex].id = "";
    

    IsAnimating = true;

    let CurrentPosition = 100 * (CurrentDiceIndex) * -1
    let FinalPosition = 100 * (NextIndex) * -1

    let CurrentAnimation

    CurrentAnimation = DiceCarousel.animate
    (
        [
            { transform: "translateX(" + CurrentPosition + "%)" },
            { transform: "translateX(" + FinalPosition + "%)" },
        ],
        {
            duration: AnimateTime,
        },
    );

    Animations.push(CurrentAnimation)

    CurrentAnimation = Dice[CurrentDiceIndex].animate
    (
        [
            { scale: "1" },
            { scale: "0.6" },
        ],
        {
            duration: AnimateTime,
        },
    );

    Animations.push(CurrentAnimation)

    CurrentAnimation = Dice[CurrentDiceIndex].animate
    (
        [
            { filter: "blur(0px)" },
            { filter: "blur(6px)" },
        ],
        {
            duration: AnimateTime,
        },
    );

    Animations.push(CurrentAnimation)

    CurrentAnimation = Dice[NextIndex].animate
    (
        [
            { scale: "0.6" },
            { scale: "1" },
        ],
        {
            duration: AnimateTime,
        },
    );

    Animations.push(CurrentAnimation)

    CurrentAnimation = Dice[NextIndex].animate
    (
        [
            { filter: "blur(8px)" },
            { filter: "blur(0px)" },
        ],
        {
            duration: AnimateTime,
        },
    );

    Animations.push(CurrentAnimation)


    for (let i = 0; i < Animations.length; i++) 
        {
            const element = Animations[i];

            element.finished.then(() => {

                CurrentDiceIndex = NextIndex;
                
                localStorage.setItem('CurrentDiceIndex', CurrentDiceIndex)
                
                DiceCarousel.style.transform = "translateX(" + -100 * CurrentDiceIndex + "%)";
                Dice[CurrentDiceIndex].id = "ActiveDice";
                WhatDoTexts[CurrentDiceIndex].id = "ActiveText";
                Dice[CurrentDiceIndex].style.filter = ""
                Dice[CurrentDiceIndex].style.scale = "1"
                
                MakeOthersAway()

                IsAnimating = false
            });
        }
}

function GoRight()
{
    NextIndex++

    Animations = []
    
    CalculateAndMoveCarosel()
}
function GoLeft()
{
    NextIndex--

    Animations = []

    CalculateAndMoveCarosel()
}

MakeOthersAway()