document.addEventListener('DOMContentLoaded', function() {
    // Wild animal images with captions (20 unique images)
    const images = [
        {
            url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Red fox in the wild'
        },
        {
            url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Brown bear catching salmon'
        },
        {
            url: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Snow leopard in the mountains'
        },
        {
            url: 'https://images.unsplash.com/photo-1519066629447-267fffa62d4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Wolf howling at the moon'
        },
        {
            url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Polar bear on ice'
        },
        {
            url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Lioness with cubs'
        },
        {
            url: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Moose in the forest'
        },
        {
            url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Gorilla in the jungle'
        },
        {
            url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Giraffe in the savanna'
        },
        {
            url: 'https://images.unsplash.com/photo-1505148230895-d9a785a555fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Zebra crossing the plains'
        },
        {
            url: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Rhino in the grasslands'
        },
        {
            url: 'https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Crocodile basking in the sun'
        },
        {
            url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'African buffalo in grassland'
        },
        {
            url: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            caption: 'Leopard scanning for prey'
        }
    ];

    // DOM elements
    const slidesContainer = document.querySelector('.slides');
    const captionElement = document.querySelector('.caption');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const autoSlideBtn = document.querySelector('.auto-slide');
    
    // Slider state
    let currentIndex = 0;
    let autoSlideInterval;
    let isAutoSliding = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize the slider
    function initSlider() {
        // Clear existing slides and thumbnails
        slidesContainer.innerHTML = '';
        thumbnailsContainer.innerHTML = '';
        
        // Create slides
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${image.url}" alt="Wild Animal Image ${index + 1}">`;
            slidesContainer.appendChild(slide);
            
            // Create thumbnails
            const thumbnail = document.createElement('img');
            thumbnail.className = 'thumbnail';
            thumbnail.src = image.url;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.addEventListener('click', () => goToSlide(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Set first slide as active
        updateSlider();
    }

    // Update slider to current index
    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        captionElement.textContent = images[currentIndex].caption;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigate to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    // Auto slide functionality
    function startAutoSlide() {
        if (isAutoSliding) return;
        
        autoSlideInterval = setInterval(nextSlide, 3000);
        isAutoSliding = true;
        autoSlideBtn.textContent = 'Pause Auto Slide';
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        isAutoSliding = false;
        autoSlideBtn.textContent = 'Start Auto Slide';
    }

    function resetAutoSlide() {
        if (isAutoSliding) {
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // Handle touch events for mobile swipe
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) { // Swipe left
            nextSlide();
        } else if (difference < -50) { // Swipe right
            prevSlide();
        }
        resetAutoSlide();
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    autoSlideBtn.addEventListener('click', () => {
        if (isAutoSliding) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // Touch support
    slidesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    slidesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
        resetAutoSlide();
    });

    // Initialize the slider
    initSlider();
    
    // Auto-start the slideshow when page loads
    startAutoSlide();
});