const footer = document.querySelector("footer");

const footerBox = document.createElement("div");

Object.assign(footerBox.style, {
    width: "100%",
    background: "#1f1f1f",
    color: "#d0d0d0",
    padding: "50px 20px 25px",
    boxSizing: "border-box"
});

/* MAIN CONTAINER */
const container = document.createElement("div");

Object.assign(container.style, {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px"
});

/* ================= LEFT ================= */
const left = document.createElement("div");

const name = document.createElement("h2");
name.textContent = "Christopher Vedlund";
Object.assign(name.style, {
    color: "white",
    fontSize: "20px",
    marginBottom: "8px"
});

const role = document.createElement("p");
role.textContent = "Gameplay • Engine • Tools Programmer";
Object.assign(role.style, {
    color: "#aaa",
    fontSize: "13px"
});

left.appendChild(name);
left.appendChild(role);

/* ================= MIDDLE (LINKS) ================= */
const middle = document.createElement("div");

const title = document.createElement("p");
title.textContent = "Links";
Object.assign(title.style, {
    color: "white",
    marginBottom: "10px",
    fontSize: "14px",
    letterSpacing: "1px"
});

middle.appendChild(title);

const links = [
    { text: "GitHub", url: "https://github.com/" },
    { text: "LinkedIn", url: "https://linkedin.com/" },
    { text: "Email", url: "mailto:vedlundchristopher@gmail.com" }
];

links.forEach(link => {
    const a = document.createElement("a");
    a.textContent = link.text;
    a.href = link.url;

    Object.assign(a.style, {
        display: "block",
        color: "#aaa",
        textDecoration: "none",
        fontSize: "13px",
        marginBottom: "6px",
        transition: "0.2s ease"
    });

    a.onmouseenter = () => a.style.color = "white";
    a.onmouseleave = () => a.style.color = "#aaa";

    middle.appendChild(a);
});

/* ================= RIGHT ================= */
const right = document.createElement("div");

const desc = document.createElement("p");
desc.textContent =
    "Game developer focused on building gameplay systems, tools, and interactive experiences through iteration and experimentation.";

Object.assign(desc.style, {
    maxWidth: "280px",
    fontSize: "13px",
    color: "#999",
    lineHeight: "1.6"
});

right.appendChild(desc);

/* ================= DIVIDER LINE ================= */
const footerDivider = document.createElement("div");
Object.assign(footerDivider.style, {
    width: "100%",
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    marginTop: "40px"
});

/* ================= BOTTOM ================= */
const bottom = document.createElement("div");

Object.assign(bottom.style, {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px",
    fontSize: "12px",
    color: "#777"
});

const copy = document.createElement("p");
copy.textContent = `© ${new Date().getFullYear()} Christopher Vedlund`;

const built = document.createElement("p");
// built.textContent = "Built with HTML, CSS & JavaScript";

bottom.appendChild(copy);
bottom.appendChild(built);

/* BUILD */
container.appendChild(left);
container.appendChild(middle);
container.appendChild(right);

footerBox.appendChild(container);
footerBox.appendChild(footerDivider);
footerBox.appendChild(bottom);

footer.appendChild(footerBox);