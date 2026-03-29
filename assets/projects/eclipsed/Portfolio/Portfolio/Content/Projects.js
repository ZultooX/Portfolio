let FileName = window.location.pathname
let FirstIndex = FileName.lastIndexOf("/")
let LastIndex = FileName.lastIndexOf(".html")

if(FirstIndex == -1)
    FirstIndex = 0
if(LastIndex == -1)
    LastIndex = FileName.length

FileName = FileName.substring(FirstIndex + 1, LastIndex)

document.getElementsByClassName("thumbnail")[0].src = "/Assets/Images/Projects/Thumbnails/" + FileName + ".jpg"