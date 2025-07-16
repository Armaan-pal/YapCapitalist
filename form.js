// Example submission handler
document.getElementById('guideForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const link = document.createElement('a');
    link.href = 'assets/The_Articulate_Mind.pdf';
    link.download = 'The_Articulate_Mind.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
// Create animated stars
function createStars() {
    // Stars disabled for premium look
}

// Initialize stars when page loads
document.addEventListener('DOMContentLoaded', createStars);

// Button click handler
document.querySelector('.cta-button').addEventListener('click', function () {
    // Add your application logic here
    console.log('Application button clicked!');
});

// Video URLs - replace with your actual video URLs
// YouTube Video IDs
const youtubeVideoIds = [
    "Yb5ieV98brs",
    "fS8--o5n8os",
    "Z0Mz798H5ho",
    "X3MG4fEJiF0",
    "savwVzZh5go",
    "sVemNllnNCA"
];

// Initialize YouTube players
function initVideoPlayer() {
    const thumbnailSlider = document.getElementById('thumbnailSlider');

    youtubeVideoIds.forEach((videoId, index) => {
        const videoItem = createThumbnailVideo(videoId);
        thumbnailSlider.appendChild(videoItem);
    });

    // Load first video by default
    changeMainVideo(youtubeVideoIds[0]);
}

// Create thumbnail for YouTube video
function createThumbnailVideo(videoId) {
    const videoItem = document.createElement('div');
    videoItem.className = 'thumbnail-video-item';

    // Embed a small YouTube player as thumbnail preview
    videoItem.innerHTML = `
        <iframe 
            class="thumbnail-iframe"
            width="200" 
            height="112" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0" 
            frameborder="0" 
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
    `;

    videoItem.addEventListener('click', () => {
        changeMainVideo(videoId);
    });

    return videoItem;
}


// Change main video iframe
function changeMainVideo(videoId) {
    const mainVideoContainer = document.getElementById('mainVideoContainer');

    mainVideoContainer.innerHTML = `
        <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${videoId}&showinfo=0&rel=0"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
    `;
}


// document.addEventListener('DOMContentLoaded', () => {
//     initVideoPlayer();
// });

// Play all thumbnail videos
function playAllThumbnailVideos() {
    const thumbnailVideos = document.querySelectorAll('.thumbnail-video');
    thumbnailVideos.forEach(video => {
        video.play().catch(error => {
            console.log('Thumbnail video autoplay failed:', error);
        });
    });
}

// // Change main video when thumbnail is clicked
// function changeMainVideo(videoUrl) {
//     const mainVideo = document.getElementById('mainVideo');
//     const currentSrc = mainVideo.querySelector('source').src;

//     if (currentSrc !== videoUrl) {
//         mainVideo.querySelector('source').src = videoUrl;
//         mainVideo.load();
//         mainVideo.play().catch(error => {
//             console.log('Main video play failed:', error);
//         });
//     }
// }

// Handle video loading errors
function handleVideoError(video) {
    console.log('Video failed to load:', video.src);
    video.parentElement.classList.add('video-loading');
}

// Add error handling to all videos
function addErrorHandling() {
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'VIDEO') {
            handleVideoError(e.target);
        }
    }, true);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initVideoPlayer();
    addErrorHandling();
});

// Handle visibility change to ensure videos keep playing
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(() => {
            playAllThumbnailVideos();
            const mainVideo = document.getElementById('mainVideo');
            mainVideo.play().catch(console.error);
        }, 100);
    }
});


// Optional: Add smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optional: Add intersection observer for animations
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Optional: Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // You can use this to show a progress bar if needed
        console.log(`Scroll progress: ${scrollPercent.toFixed(1)}%`);
    }

    window.addEventListener('scroll', updateScrollProgress);
});


function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');

    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('open');
        }
    });

    document.querySelectorAll('.faq-icon').forEach(item => {
        if (item !== icon) {
            item.classList.remove('rotated');
        }
    });

    // Toggle current FAQ item
    if (isOpen) {
        answer.classList.remove('open');
        icon.classList.remove('rotated');
    } else {
        answer.classList.add('open');
        icon.classList.add('rotated');
    }
}

// Optional: Close FAQ when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.faq-item')) {
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelectorAll('.faq-icon').forEach(item => {
            item.classList.remove('rotated');
        });
    }
});

function handleSubmit() {
    // Add a subtle animation to the button
    const button = document.querySelector('.cta-button');

    // Create a ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Simulate form submission
    button.textContent = 'Submitting...';
    button.disabled = true;

    setTimeout(() => {
        alert('Application submitted successfully! We\'ll be in touch soon.');
        button.textContent = 'Submit Entrance Application';
        button.disabled = false;
    }, 2000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior and entrance animations
document.addEventListener('DOMContentLoaded', function () {
    // Animate elements on load
    const title = document.querySelector('.main-title');
    const card = document.querySelector('.content-card');
    const button = document.querySelector('.cta-button');

    // Initial state
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px)';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    button.style.opacity = '0';
    button.style.transform = 'translateY(20px)';

    // Animate in sequence
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        card.style.transition = 'all 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        button.style.transition = 'all 0.8s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
    }, 500);
});

// Add event listeners to navigation buttons
document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".nav-button")

    navButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // You can add navigation logic here
            console.log(`Clicked on: ${this.textContent}`)

            // Example: Navigate to a page based on button text
            // const page = this.textContent.toLowerCase().replace(/\s+/g, '-');
            // window.location.href = `/${page}.html`;
        })
    })

    // Make contact items clickable
    const phoneItem = document.querySelector(".contact-item:first-child")
    if (phoneItem) {
        phoneItem.addEventListener("click", () => {
            window.location.href = "tel:+917795706903"
        })
        phoneItem.style.cursor = "pointer"
    }

    const emailItem = document.querySelector(".contact-item:nth-child(2)")
    if (emailItem) {
        emailItem.addEventListener("click", () => {
            window.location.href = "mailto:kailash@aeoscompany.com"
        })
        emailItem.style.cursor = "pointer"
    }
})


// Add event listeners to navigation buttons
document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll(".nav-button")

    navButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // You can add navigation logic here
            console.log(`Clicked on: ${this.textContent}`)

            // Example: Navigate to a page based on button text
            // const page = this.textContent.toLowerCase().replace(/\s+/g, '-');
            // window.location.href = `/${page}.html`;
        })
    })

    // Make contact items clickable
    const phoneItem = document.querySelector(".contact-item:first-child")
    if (phoneItem) {
        phoneItem.addEventListener("click", () => {
            window.location.href = "tel:+917795706903"
        })
        phoneItem.style.cursor = "pointer"
    }

    const emailItem = document.querySelector(".contact-item:nth-child(2)")
    if (emailItem) {
        emailItem.addEventListener("click", () => {
            window.location.href = "mailto:kailash@aeoscompany.com"
        })
        emailItem.style.cursor = "pointer"
    }
})

// roqmap section scroll effect
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');
    const scrollTop = window.pageYOffset;

    cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate if card should be stacked
        if (scrollTop > cardTop - windowHeight + 100) {
            card.classList.add('stacked');
        }

        else {
            card.classList.remove('stacked');
        }
    });
});

// Hide scroll indicator after first scroll
let hasScrolled = false;

window.addEventListener('scroll', () => {
    if (!hasScrolled) {
        document.querySelector('.scroll-indicator').style.opacity = '0';
        hasScrolled = true;
    }
});

// yap section

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('localVideo');
    const playBtn = document.getElementById('videoControl');

    if (video && playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.textContent = '⏸';
            } else {
                video.pause();
                playBtn.textContent = '▶';
            }
        });

        // Optional: Reset icon on video end
        video.addEventListener('ended', () => {
            playBtn.textContent = '▶';
        });
    }
});
