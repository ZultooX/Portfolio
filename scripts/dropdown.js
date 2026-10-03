// Dropdown functionality for contributions
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            const dropdownContent = document.getElementById(`dropdown-${targetId}`);
            
            dropdownContent.classList.toggle('open');
            
            if (dropdownContent.classList.contains('open')) {
                this.innerHTML = '▲';
            } else {
                this.innerHTML = '▼';
            }
        });
    });
});