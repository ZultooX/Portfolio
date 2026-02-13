// Get the modal element
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Close modal when clicking the close button
closeBtn.onclick = function() {
    closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal and update URL
function closeModal() {
    modal.style.display = 'none';
    // Remove hash from URL without reloading
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

// Function to open modal with project details
function openModal(project) {
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

    const content = `
        <div class="modal-header">
            <h2>${project.title}</h2>
        </div>
        <div class="modal-body">
            <img src="${project.image}" alt="${project.title}">
            <div class="description">
                <p>${project.pitch || 'No description available.'}</p>
            </div>
            <div class="details">
                <h3>Contributions</h3>
                <p>${project.contributions || 'Not specified'}</p>
                ${project.details ? `
                    <h3>Details</h3>
                    <p>${project.details}</p>
                ` : ''}
            </div>
            <div class="modal-links">
                ${linksHTML}
            </div>
            <div class="modal-tags">
                ${tagsHTML}
                ${technologiesHTML}
            </div>
        </div>
    `;
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Update URL with project ID/slug
    const projectSlug = createProjectSlug(project.title);
    history.pushState({projectId: project.id || projectSlug}, project.title, `#${projectSlug}`);
}

// Create URL-friendly slug from project title
function createProjectSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

// Check URL hash on page load and open corresponding modal
function checkUrlForModal(projects) {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash && projects) {
        const project = projects.find(p => 
            createProjectSlug(p.title) === hash || 
            p.id === hash ||
            p.title.toLowerCase().replace(/\s+/g, '-') === hash
        );
        if (project) {
            // Small delay to ensure DOM is ready
            setTimeout(() => openModal(project), 100);
        }
    }
}

// Store projects globally or in a variable accessible to both functions
let allProjects = [];

fetch('assets/systems.json')
    .then(res => res.json())
    .then(data => {
        allProjects = data; // Store for later use
        const grid = document.getElementById('systems-grid');
        
        data.forEach((project, index) => {
            // Add unique ID if not present
            if (!project.id) {
                project.id = createProjectSlug(project.title) || `project-${index}`;
            }
            
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
            
            // Add click event listener to open modal
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on a link
                if (!e.target.closest('a')) {
                    openModal(project);
                }
            });
            
            grid.appendChild(card);
        });
        
        // Check URL hash after projects are loaded
        checkUrlForModal(data);
    });

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    const hash = window.location.hash.slice(1);
    if (hash) {
        checkUrlForModal(allProjects);
    } else {
        modal.style.display = 'none';
    }
});