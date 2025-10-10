// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Set active class on navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 58, 108, 0.9)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
    
    // Simulate sermon play/download functionality
    const playButtons = document.querySelectorAll('.play-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            let sermonTitle = '';
            if (this.closest('.sermon-card')) {
                sermonTitle = this.closest('.sermon-card').querySelector('h3').textContent;
            } else if (this.closest('.archive-item')) {
                sermonTitle = this.closest('.archive-item').querySelector('h4').textContent;
            }
            alert(`Now playing: "${sermonTitle}"`);
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            let sermonTitle = '';
            if (this.closest('.sermon-card')) {
                sermonTitle = this.closest('.sermon-card').querySelector('h3').textContent;
            } else if (this.closest('.archive-item')) {
                sermonTitle = this.closest('.archive-item').querySelector('h4').textContent;
            }
            alert(`Downloading: "${sermonTitle}"`);
        });
    });
    
    // Gallery item click functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`Viewing gallery: "${title}"`);
        });
    });
    
    // Video play functionality
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(video => {
        video.addEventListener('click', function() {
            const title = this.closest('.video-card').querySelector('h3').textContent;
            alert(`Playing video: "${title}"`);
        });
    });
});