AccentRed = 219
AccentGreen = 164
AccentBlue = 113

document.documentElement.style.setProperty("--accent-color", "rgb(" + AccentRed + ", " + AccentGreen + ", " + AccentBlue + ")");


myName = document.getElementsByClassName("my-name");

for (i = 0; i < myName.length; i++) {
    myName[i].addEventListener("mouseenter", function () { ChangeName(this, "Noo(Thing).") })
    myName[i].addEventListener("mouseleave", function () { ChangeName(this, "Simon.") })
}

Count = 0
CurrentProgress = 0;

function ChangeName(Item, NewName) {
    CurrentName = NewName;
    Fade(Item, false);
}

Speed = 20
OneDivSpeed = 1 / Speed
function Fade(Item, OnOff) {
    if (Count++ < Speed) {
        CurrentProgress += OneDivSpeed
        Item.style.opacity = (OnOff ? CurrentProgress : 1 - CurrentProgress)
        setTimeout(Fade, OneDivSpeed, Item, OnOff)
        return;
    }

    Count = 0
    CurrentProgress = 0

    if (!OnOff) {
        myName[0].textContent = CurrentName
        Fade(Item, true)
    }
}