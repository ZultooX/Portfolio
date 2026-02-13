(function () {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    let icons = {};

    let allProjects = [];

    LoadIcons();
    CreateProjectCards();

    window.onclick = function (e) {
        if (e.target === modal) {
            CloseModal();
        }
    }

    closeBtn.onclick = function () {
        CloseModal();
    }

    window.addEventListener('popstate', function (e) {
        const hash = this.window.location.hash.slice(1);
        if (hash) {
            CheckUrlForModal(allProjects)
        }
    });

    function LoadIcons() {
        fetch("assets/test.json")
            .then(res => res.json())
            .then(data => {
                icons = data.icons;
            });
    }

    function CreateProjectCards() {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];

        const json = currentScript.dataset.json;
        const gridname = currentScript.dataset.gridname;

        fetch("assets/test.json")
            .then(res => res.json())
            .then(data => {
                allProjects = data;

                const grid = document.getElementById(gridname);
                data[json].forEach(project => {
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
            <img src="${project.thumbnail}" alt="${project.title}">
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
            </div>`;

                    card.addEventListener('click', function (e) {
                        if (!e.target.closest('a')) {
                            OpenModal(project);
                        }
                    });

                    grid.appendChild(card);
                });

                CheckUrlForModal(data[json]);
            });
    }

    function OpenModal(project) {
        const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
        const technologiesHTML = project.techs.map(tag => `<span>${tag}</span>`).join('');

        let linksHTML = "";
        for (const key in icons) {
            if (project.links?.[key]) {
                linksHTML += `
                <a href="${project.links[key]}" target="_blank" rel="noopener">
                    ${key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
            `;
            }
        }

        let detailsHTML = "";
        for (let i = 0; i < project.modal.length; i++) {
            const modalItem = project.modal[i];
            // Use the title if available, otherwise create a generic one
            const itemTitle = modalItem.title || `Feature ${i + 1}`;

            detailsHTML += `
            <div class="detail-item">
                <img src="${modalItem.screenshot}" alt="${itemTitle}">
                <div class="detail-content">
                    <h4 class="detail-title">${itemTitle}</h4>
                    <div class="detail-description">
                        <p>${modalItem.description}</p>
                    </div>
                </div>
            </div>
        `;
        }

        const content = `
        <div class="modal-inner">
            <div class="modal-header">
                <h2>${project.title}</h2>
            </div>

            <div class="modal-body">
                <div class="project-overview">
                    <img src="${project.thumbnail}" alt="${project.title}">
                    <div class="overview-content">
                        <p class="project-pitch">${project.pitch || 'No description available.'}</p>
                        <div class="modal-tags">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>

                ${detailsHTML ? `
                    <div class="details-section">
                        <h3>Project Details</h3>
                        <div class="details-grid">
                            ${detailsHTML}
                        </div>
                    </div>
                ` : ''}

                <div class="modal-footer">
                    ${technologiesHTML ? `
                        <div class="footer-section">
                            <h3>Technologies</h3>
                            <div class="modal-tags">
                                ${technologiesHTML}
                            </div>
                        </div>
                    ` : ''}

                    ${linksHTML ? `
                        <div class="footer-section">
                            <h3>Links</h3>
                            <div class="modal-links">
                                ${linksHTML}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

        modalContent.innerHTML = content;
        modal.style.display = 'block';

        const projectSlug = CreateProjectSlug(project.title);
        history.pushState(
            { projectId: project.id || projectSlug },
            project.title,
            `#${projectSlug}`
        );
    }

    function CloseModal() {
        modal.style.display = 'none';
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    function CreateProjectSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    function CheckUrlForModal(projects) {
        const hash = window.location.hash.slice(1);
        if (hash && projects) {
            const project = projects.find(p =>
                CreateProjectSlug(p.title) === hash ||
                p.id === hash ||
                p.title.toLowerCase().replace(/\s+/g, '-') === hash
            );

            if (project) {
                setTimeout(() => OpenModal(project), 100);
            }
        }
    }
})();

function ApplyStaggeredAnimation() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        // Apply delay: 0.1s, 0.2s, 0.3s, etc.
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}