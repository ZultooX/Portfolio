const footerBox = document.createElement("div");

footerBox.style.width = "100vw";
footerBox.style.height = "164px";
footerBox.style.backgroundColor = "#363636";
footerBox.style.display = "flex";
footerBox.style.alignItems = "center";
footerBox.style.justifyContent = "center";
footerBox.style.padding = "0 20px";
footerBox.style.boxSizing = "border-box";
footerBox.style.position = "relative";
footerBox.style.zIndex = "100";


const footerTempText = document.createElement("h1");
footerTempText.textContent ="FOOTER";

footerBox.appendChild(footerTempText);


const footer = document.querySelector("footer");
footer.appendChild(footerBox);