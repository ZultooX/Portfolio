const box = document.createElement("div");

box.style.width = "100vw";
box.style.height = "60px";
box.style.backgroundColor = "#0f0f0f";
box.style.display = "flex";
box.style.alignItems = "center";
box.style.justifyContent = "space-between";
box.style.padding = "0 20px";
box.style.boxSizing = "border-box";
box.style.position = "fixed";
box.style.top = "0px";
box.style.zIndex = "100";

document.body.appendChild(box);



// LEFT GROUP
const nameDiv = document.createElement("div");
nameDiv.style.display = "flex";
nameDiv.style.flexDirection = "column";

nameDiv.style.cursor = "pointer";
nameDiv.onclick = () => {
    window.location.href = "index.html";
}

const name = document.createElement("div");
name.textContent = "Christopher Vedlund";
name.style.color = "white";
name.style.fontSize = "18px";
name.style.fontWeight = "600";
name.style.textAlign = "left";

const wdw = document.createElement("div");
wdw.textContent = "Gameplay • Engine • Tools Programmer";
wdw.style.color = "gray";
wdw.style.fontSize = "12px";
wdw.style.letterSpacing = "0.5px";
wdw.style.textAlign = "left";

nameDiv.appendChild(name);
nameDiv.appendChild(wdw);



// RIGHT MENU (make it feel like UI, not text)
// const menu = document.createElement("div");
// menu.textContent = "MENU";
// menu.style.color = "white";
// menu.style.fontSize = "12px";
// menu.style.letterSpacing = "2px";
// menu.style.cursor = "pointer";
// menu.style.padding = "6px 10px";
// menu.style.borderRadius = "6px";



// APPEND
box.appendChild(nameDiv);
// box.appendChild(menu);