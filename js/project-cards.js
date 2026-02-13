(function () {
    const icons = {
        github: "assets/images/icons/github-logo.png",
        itch: "assets/images/icons/itch-io-logo.png"
    }

    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];

    const jsonPath = currentScript.dataset.json;
    const gridname = currentScript.dataset.gridname;

    fetch(jsonPath)
        .then(res => res.json())
        .then(data => {
            const grid = document.getElementById(gridname);
            data.forEach(project => {
                const card = document.createElement('article');
                card.className = 'project-card';

                const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
                const technologiesHTML = project.techs.map(tag => `<span>${tag}</span>`).join('');

                let linksHTML = "";

                for (const key in icons) {
                    if (project.links?.[key]) {
                        linksHTML += `
                      <a href="${project.links[key]}" target="_blank" rel="noopener">
                        <img src="${icons[key]}" alt="${key.charAt(0).toUpperCase() + key.slice(1)}">
                      </a>
                    `;
                    }
                }

                card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-hover">
                <div class="title-row">
                    <h2>${project.title}</h2>
                    <div class="project-tags">${tagsHTML}</div>
                </div>
                <p class="contributions">${project.contributions}</p>
                <p class="pitch">${project.pitch}</p>
                
                <div class="project-links">
                    ${linksHTML}
                </div>
                <div class="project-techs">${technologiesHTML}</div>
            </div>
        `;
                grid.appendChild(card);
            });
        })
})();