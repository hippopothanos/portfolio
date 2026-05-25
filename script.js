/* inspo youtube video auto play */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.highlight-card');

    cards.forEach(card => {
        const video = card.querySelector('.hover-video');
        
        if (!video) return;

        // play video when hovered
        card.addEventListener('mouseenter', () => {
            video.muted = false; 
            video.play().catch(error => {
                console.log("Audio playback delayed until user clicks somewhere on the page.", error);
                video.muted = true;
                video.play();
            });
        });

        // thumbnail part 1
        card.addEventListener('mouseleave', () => {
            if (!document.fullscreenElement) {
                video.pause();
                video.muted = true;   
                video.currentTime = 0; 
                video.load(); 
            }
        });

        // for fullscreen highlight videos
        video.addEventListener('dblclick', () => {
            if (!document.fullscreenElement) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) { /* Safari */
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { /* IE11 */
                    video.msRequestFullscreen();
                }
            
                video.style.objectFit = "contain";
                video.controls = true;
            }
        });
    });

    // for thumbnail in highlights
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            const allVideos = document.querySelectorAll('.hover-video');
            allVideos.forEach(video => {
                video.controls = false;
                video.style.objectFit = "cover"; 
                video.pause();
                video.muted = true;
                video.currentTime = 0; 
                video.load(); 
            });
        }
    });
});

/* Slideshow image showcase*/
    const initStackedGallery = () => {
        const deckContainer = document.getElementById('galleryDeck');
        if (!deckContainer) return; 

        const totalImages = 21; 
        let currentIndex = 0;

        // generationg ng images for slideshow
        for (let i = 1; i <= totalImages; i++) {
            const card = document.createElement('div');
            card.classList.add('gallery-card');

            const img = document.createElement('img');
           img.src = `images/${i}.jpg`; // automatically scroll to my numbered images
            img.alt = `Action Snapshot ${i}`;
            img.loading = "lazy";
            card.appendChild(img);
            deckContainer.appendChild(card);
        }

        const deckCards = document.querySelectorAll('.gallery-card');

    
        const updateStackStates = () => {
            deckCards.forEach((card, index) => {
                
                card.classList.remove('active', 'prev-1', 'prev-2');

                if (index === currentIndex) {
                    
                    card.classList.add('active');
                } else if (index === (currentIndex - 1 + totalImages) % totalImages) {
                    
                    card.classList.add('prev-1');
                } else if (index === (currentIndex - 2 + totalImages) % totalImages) {
                    
                    card.classList.add('prev-2');
                }
            });

            
            currentIndex = (currentIndex + 1) % totalImages;
        };

        updateStackStates();

        setInterval(updateStackStates, 3500);
    };
    
    initStackedGallery();