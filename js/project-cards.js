(function () {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');

    let icons = {};
    let gridInstances = []; // Store multiple grid instances

    LoadIcons();

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
            // Check all grid instances for the project
            gridInstances.forEach(instance => {
                CheckUrlForModal(instance.filteredProjects || instance.allProjects);
            });
        }
    });

    function LoadIcons() {
        fetch("assets/projects.json")
            .then(res => res.json())
            .then(data => {
                icons = data.icons;
                InitializeGrids(); // Initialize grids after icons are loaded
            });
    }

    function InitializeGrids() {
        const scripts = document.getElementsByTagName('script');

        // Process each project-cards.js script
        Array.from(scripts).forEach(script => {
            if (script.src && script.src.includes('project-cards.js')) {
                const json = script.dataset.json;
                const gridname = script.dataset.gridname;

                if (json && gridname) {
                    CreateGridInstance(json, gridname);
                }
            }
        });
    }

    function CreateGridInstance(jsonKey, gridname) {
        fetch("assets/projects.json")
            .then(res => res.json())
            .then(data => {
                const gridInstance = {
                    jsonKey: jsonKey,
                    gridname: gridname,
                    allProjects: data[jsonKey] || [],
                    filteredProjects: [], // Start empty
                    currentSortMode: 'highlight', // Start with highlight mode
                    gridElement: document.getElementById(gridname)
                };

                // Store the instance first
                gridInstances.push(gridInstance);

                // Create sorting controls for this grid
                CreateSortControls(gridInstance);

                // Apply the highlight filter immediately
                FilterAndDisplayProjects(gridInstance);

                // Check URL for modal
                CheckUrlForModal(gridInstance.allProjects);
            });
    }

    function CreateSortControls(instance) {
        const gridContainer = instance.gridElement.parentElement;

        if (gridContainer.querySelector('.sort-controls')) return;

        const sortContainer = document.createElement('div');
        sortContainer.className = 'sort-controls';

        // Set Highlights as active by default
        sortContainer.innerHTML = `
        <div class="sort-buttons">
            <button class="sort-btn active" data-sort="highlight">Highlights</button>
            <button class="sort-btn" data-sort="game-engine">Game Engine</button>
            <button class="sort-btn" data-sort="game">Games</button>
            <button class="sort-btn" data-sort="web">Web</button>
            <button class="sort-btn" data-sort="tool">Tools</button>
            <button class="sort-btn" data-sort="recent">Most Recent</button>
            <button class="sort-btn" data-sort="all">All</button>
        </div>
    `;

        gridContainer.insertBefore(sortContainer, instance.gridElement);

        sortContainer.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                sortContainer.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                instance.currentSortMode = this.dataset.sort;
                FilterAndDisplayProjects(instance);
            });
        });
    }

    function FilterAndDisplayProjects(instance) {
        const mode = instance.currentSortMode;
        let filtered = [...instance.allProjects];

        console.log('Filtering with mode:', mode); // Debug log

        switch (mode) {
            case 'highlight':
                // Check if categories array includes "highlight"
                filtered = instance.allProjects.filter(p =>
                    p.categories && p.categories.includes('highlight')
                );
                console.log('Highlight projects:', filtered); // Debug log
                break;

            case 'game-engine':
                // Check if categories array includes "game-engine"
                filtered = instance.allProjects.filter(p =>
                    p.categories && p.categories.includes('game-engine')
                );
                break;

            case 'game':
                // Check if categories array includes "game"
                filtered = instance.allProjects.filter(p =>
                    p.categories && p.categories.includes('game')
                );
                break;

            case 'web':
                // Check if categories array includes "web"
                filtered = instance.allProjects.filter(p =>
                    p.categories && p.categories.includes('web')
                );
                break;

            case 'tool':
                // Check if categories array includes "tool"
                filtered = instance.allProjects.filter(p =>
                    p.categories && p.categories.includes('tool')
                );
                break;

            case 'recent':
                // Sort all projects by date (newest first)
                filtered = [...instance.allProjects].sort((a, b) => {
                    const dateA = a.date ? new Date(a.date) : new Date(0);
                    const dateB = b.date ? new Date(b.date) : new Date(0);
                    return dateB - dateA;
                });
                break;

            case 'all':
            default:
                // Show all projects
                filtered = instance.allProjects;
                break;
        }

        instance.filteredProjects = filtered;
        DisplayProjects(instance);
        ApplyStaggeredAnimation(instance.gridElement);
    }

    function DisplayProjects(instance) {
        const grid = instance.gridElement;
        grid.innerHTML = ''; // Clear existing cards

        if (instance.filteredProjects.length === 0) {
            // Show empty state
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-grid-message';
            emptyMessage.textContent = 'No projects found in this category.';
            grid.appendChild(emptyMessage);
            return;
        }

        instance.filteredProjects.forEach(project => {
            const card = CreateProjectCard(project, instance.jsonKey);
            grid.appendChild(card);
        });
    }

    function CreateProjectCard(project, jsonKey) {
        const card = document.createElement('article');
        card.className = 'project-card';

        const tagsHTML = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
        const technologiesHTML = project.techs ? project.techs.map(tag => `<span>${tag}</span>`).join('') : '';

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

        // Team size display (only if teamSize exists in the project data)
        const teamSizeHTML = project.teamSize ? `
        <div class="team-size-badge">
            <svg class="team-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-1 .05 1.16.84 2 1.87 2 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span class="team-size-number">${project.teamSize}</span>
        </div>
    ` : '';

        card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}">
        ${teamSizeHTML}
        <div class="project-hover">
            <div class="title-row">
                <h2>${project.title}</h2>
                <div class="project-tags">${tagsHTML}</div>
            </div>
            <p class="contributions">${project.contributions || ''}</p>
            <p class="pitch">${project.pitch || ''}</p>
            
            <div class="project-links">
                ${linksHTML}
            </div>
            <div class="project-techs">${technologiesHTML}</div>
        </div>`;

        card.addEventListener('click', function (e) {
            if (!e.target.closest('a') && !e.target.closest('.team-size-badge')) {
                OpenModal(project);
            }
        });

        return card;
    }

    function OpenModal(project) {
        const tagsHTML = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
        const technologiesHTML = project.techs ? project.techs.map(tag => `<span>${tag}</span>`).join('') : '';

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

        // Create media HTML (trailer if exists, otherwise thumbnail)
        const mediaHTML = project.trailer ? `
        <div class="modal-video">
            <iframe 
                src="${project.trailer}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    ` : `
        
    `;

        let detailsHTML = "";
        if (project.modal) {
            for (let i = 0; i < project.modal.length; i++) {
                const modalItem = project.modal[i];
                const itemTitle = modalItem.title || `Feature ${i + 1}`;

                detailsHTML += `
                <div class="detail-item">
                    <img src="${modalItem.screenshot}" alt="${itemTitle}">
                    <div class="detail-content">
                        <h4 class="detail-title">${itemTitle}</h4>
                        <div class="detail-description">
                            <p>${modalItem.description || ''}</p>
                        </div>
                    </div>
                </div>
            `;
            }
        }

        const aboutHTML = project.description ? `
    <div class="about-section">
        <h3>About the Project</h3>
        <div class="about-grid">
            <div class="about-item">
                <div class="about-content">
                    ${project.description.split('\n').map(para => `<p>${para}</p>`).join('')}
                </div>
            </div>
        </div>
    </div>
` : '';

        const content = `
        <div class="modal-inner">
            <div class="modal-header">
                <h2>${project.title}</h2>
            </div>

            <div class="modal-body">
                <!-- Media section (trailer or thumbnail) -->
                <div class="modal-media">
                    ${mediaHTML}
                </div>

                <!-- About section using details-section classes -->
                ${aboutHTML}

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

    function ApplyStaggeredAnimation(gridElement) {
        const cards = gridElement.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    }
})();