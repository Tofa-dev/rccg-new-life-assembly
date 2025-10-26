// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
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
    
    // Full Screen Image Functions (for Gallery)
    window.openFullScreen = function(imageSrc) {
        const modal = document.getElementById('fullScreenModal');
        const fullScreenImage = document.getElementById('fullScreenImage');
        
        if (modal && fullScreenImage) {
            fullScreenImage.src = imageSrc;
            fullScreenImage.alt = 'Full Screen View';
            modal.style.display = 'flex';
            
            // Handle image loading error
            fullScreenImage.onerror = function() {
                this.src = 'images/placeholder.jpg'; // Fallback image
                this.alt = 'Image not available';
            };
        }
    };

    window.closeFullScreen = function() {
        const modal = document.getElementById('fullScreenModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Close with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.closeFullScreen();
        }
    });

    // Video play functionality
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(video => {
        video.addEventListener('click', function() {
            const title = this.closest('.video-card').querySelector('h3').textContent;
            alert(`Playing video: "${title}"`);
        });
    });
    
    // Album functionality
    const albumGrid = document.getElementById('albumGrid');
    const expandedView = document.getElementById('expandedView');
    const expandedTitle = document.getElementById('expandedTitle');
    const photosGrid = document.getElementById('photosGrid');
    const closeBtn = document.getElementById('closeBtn');
    const backToGallery = document.getElementById('backToGallery');
    const galleryGrid = document.getElementById('galleryGrid');
    const albumFullViewModal = document.getElementById('albumFullViewModal');
    const albumModalImage = document.getElementById('albumModalImage');
    const albumCloseModal = document.getElementById('albumCloseModal');
    const albumPrevBtn = document.getElementById('albumPrevBtn');
    const albumNextBtn = document.getElementById('albumNextBtn');
    const albumModalCounter = document.getElementById('albumModalCounter');

    let currentAlbum = null;
    let currentPhotoIndex = 0;

    // Initialize albums from HTML
    function initAlbums() {
        const albums = document.querySelectorAll('.album');
        albums.forEach(album => {
            album.addEventListener('click', () => openAlbum(album));
        });
    }

    // Open album to show photos
    function openAlbum(albumElement) {
        // Get data from the clicked album
        const title = albumElement.getAttribute('data-title');
        const photos = albumElement.getAttribute('data-photos').split(',');
        
        currentAlbum = {
            title: title,
            photos: photos
        };
        
        expandedTitle.textContent = title;
        photosGrid.innerHTML = '';
        
        photos.forEach((photo, index) => {
            const photoEl = document.createElement('div');
            photoEl.className = 'photo';
            photoEl.innerHTML = `<img src="${photo}" alt="${title} photo">`;
            photoEl.addEventListener('click', () => openAlbumFullView(index));
            photosGrid.appendChild(photoEl);
        });
        
        galleryGrid.style.display = 'none';
        albumGrid.style.display = 'none';
        expandedView.style.display = 'block';
        backToGallery.style.display = 'block';
    }

    // Open full view modal for album photos
    function openAlbumFullView(index) {
        currentPhotoIndex = index;
        updateAlbumModal();
        albumFullViewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Update album modal with current photo
    function updateAlbumModal() {
        if (currentAlbum) {
            albumModalImage.src = currentAlbum.photos[currentPhotoIndex];
            albumModalCounter.textContent = `${currentPhotoIndex + 1} / ${currentAlbum.photos.length}`;
        }
    }

    // Close expanded view
    function closeExpandedView() {
        expandedView.style.display = 'none';
        albumGrid.style.display = 'grid';
        galleryGrid.style.display = 'grid';
        backToGallery.style.display = 'none';
    }

    // Close album full view modal
    function closeAlbumFullView() {
        albumFullViewModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Navigate to previous photo in album
    function prevAlbumPhoto() {
        if (currentAlbum) {
            currentPhotoIndex = (currentPhotoIndex - 1 + currentAlbum.photos.length) % currentAlbum.photos.length;
            updateAlbumModal();
        }
    }

    // Navigate to next photo in album
    function nextAlbumPhoto() {
        if (currentAlbum) {
            currentPhotoIndex = (currentPhotoIndex + 1) % currentAlbum.photos.length;
            updateAlbumModal();
        }
    }

    // Event listeners for album functionality
    closeBtn.addEventListener('click', closeExpandedView);
    backToGallery.addEventListener('click', closeExpandedView);
    albumCloseModal.addEventListener('click', closeAlbumFullView);
    albumPrevBtn.addEventListener('click', prevAlbumPhoto);
    albumNextBtn.addEventListener('click', nextAlbumPhoto);

    // Close album modal when clicking outside the image
    albumFullViewModal.addEventListener('click', (e) => {
        if (e.target === albumFullViewModal) {
            closeAlbumFullView();
        }
    });

    // Keyboard navigation for album modal
    document.addEventListener('keydown', (e) => {
        if (albumFullViewModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeAlbumFullView();
            } else if (e.key === 'ArrowLeft') {
                prevAlbumPhoto();
            } else if (e.key === 'ArrowRight') {
                nextAlbumPhoto();
            }
        }
    });

    // Initialize album functionality
    initAlbums();
});

// Function to open video modal
function openVideoModal(card) {
    const videoSrc = card.getAttribute('data-video-src');
    const videoTitle = card.querySelector('h3').textContent;
    const videoDesc = card.querySelector('p').textContent;

    const videoElement = document.getElementById('fullScreenVideo');
    const modal = document.getElementById('videoModal');

    // Set video source
    videoElement.src = videoSrc;
    videoElement.load(); // Reload video

    // Optional: Update title/description if needed
    // You could add a title element inside .video-container if desired

    // Show modal
    modal.style.display = 'flex';

    // Play video after it loads
    videoElement.onloadedmetadata = () => {
        videoElement.play().catch(e => {
            console.log("Auto-play failed, user must interact first.");
        });
    };
}

// Function to close video modal
function closeVideoModal() {
    const videoElement = document.getElementById('fullScreenVideo');
    const modal = document.getElementById('videoModal');

    videoElement.pause();
    videoElement.currentTime = 0; // Reset to start
    modal.style.display = 'none';
}

// Close video modal when clicking outside video container (optional)
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideoModal();
    }
});
