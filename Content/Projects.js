let FileName = window.location.pathname
let FirstIndex = FileName.lastIndexOf("/")
let LastIndex = FileName.lastIndexOf(".html")

if(FirstIndex == -1)
    FirstIndex = 0
if(LastIndex == -1)
    LastIndex = FileName.length

FileName = FileName.substring(FirstIndex + 1, LastIndex)

document.getElementsByClassName("thumbnail")[0].src = "/Assets/Images/Projects/Thumbnails/" + FileName + ".jpg"







let ImageZoominbg = document.createElement("div");
ImageZoominbg.className = "image-zoomin-bg"
document.body.appendChild(ImageZoominbg);
document.body.addEventListener('click', ZoomOutImage, true); 

let ImageZoomin = document.createElement("div");
ImageZoomin.className = "image-zoomin"
ImageZoominbg.appendChild(ImageZoomin);

let ImageContent = document.createElement("img");
ImageContent.className = "image-zoomin-content"
ImageZoomin.appendChild(ImageContent);


let contentImages = document.getElementsByClassName("content-image")
for(let i = 0; i < contentImages.length; i++)
{
    contentImages[i].addEventListener("click", ZoomInImage)
}

function ZoomInImage()
{
    const originalClientRect = this.getClientRects()[0]
    const originalAspectRatio = originalClientRect.height / originalClientRect.width

    ImageContent.src = this.src

    ImageContent.style.height = "auto"
    ImageContent.style.width = "90%"

    const imageContentClientRect = ImageContent.getClientRects()[0]
    const imageZoominClientRect = ImageZoomin.getClientRects()[0]

    const calculatedHeight = originalAspectRatio * imageContentClientRect.width;

    if(calculatedHeight >= imageZoominClientRect.height)
    {
        ImageContent.style.height = "90%"
        ImageContent.style.width = "auto"
    }

    document.body.style.overflow = 'hidden';
    document.getElementsByClassName("breadcrumb-console-bar-holder")[0].style.opacity = 0

    setTimeout(function(){
        ImageZoominbg.style.pointerEvents = "all"
        ImageZoominbg.style.opacity = 1
    }, 5)
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        ZoomOutImage()
    }
})

function ZoomOutImage()
{
    document.body.style.overflow = 'visible';
    ImageZoominbg.style.pointerEvents = "none"
    ImageZoominbg.style.opacity = 0

    document.getElementsByClassName("breadcrumb-console-bar-holder")[0].style.opacity = 1
}