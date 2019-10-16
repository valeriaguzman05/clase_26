const images=[].slice.call(document.querySelectorAll(".bumblebee"));

function LazyLoadPhoto(photo){
    const LazyImage = new Image ();
    LazyImage.classList.add("bumblebee");
    LazyImage.src= photo.dataset.srcLazy; 
    LazyImage.onload = () => {
        const parent = photo.parentNode; 
        parent.replaceChild(LazyImage, photo)
    }
}

if ( "IntersectionObserver" in window) { 
    let imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) { 
                let image= entry.target;
                const PlaceHolderSrc = image.dataset.src;
                image.src = PlaceHolderSrc;
                imageObserver.unobserve(image);
                setTimeout(() => { 
                    LazyLoadPhoto(image);
                }, 3000);
            }
        });
    });
    images.forEach((image) => {
        imageObserver.observe(image);
    });
}