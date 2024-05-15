const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let isAutoScrolling = false;
    let autoScrollInterval;

    // Function to start automatic scrolling
    const startAutoScroll = () => {
        isAutoScrolling = true;
        autoScrollInterval = setInterval(() => {
            const scrollAmount = imageList.clientWidth;
            const currentScrollLeft = imageList.scrollLeft;
            const nextScrollLeft = currentScrollLeft + scrollAmount;
            if (nextScrollLeft >= maxScrollLeft) {
                // If reaching the end, scroll back to the beginning
                imageList.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, 3000); // Change interval as needed
    };

    // Function to stop automatic scrolling
    const stopAutoScroll = () => {
        isAutoScrolling = false;
        clearInterval(autoScrollInterval);
    };

    // Toggle automatic scrolling on/off
    const toggleAutoScroll = () => {
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    };

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            const currentScrollLeft = imageList.scrollLeft;
            const nextScrollLeft = currentScrollLeft + scrollAmount;

            if (nextScrollLeft < 0) {
                // If scrolling to the left of the first slide, scroll to the beginning
                imageList.scrollTo({ left: 0, behavior: "smooth" });
            } else if (nextScrollLeft > maxScrollLeft) {
                // If scrolling to the right of the last slide, scroll to the beginning
                imageList.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Initialize slider
    startAutoScroll();
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
