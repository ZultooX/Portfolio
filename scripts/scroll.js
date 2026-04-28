const link = document.querySelector('a[id="highlights-button"]');

link.addEventListener('click', (e) => {
    e.preventDefault(); 

    window.scrollTo({
        top: 905,
        left: 0,
        behavior: 'smooth'
    });
});