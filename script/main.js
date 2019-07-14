window.onscroll=function (info) {
    if(window.scrollY>0){
        let topBar=document.getElementsByClassName("topBar");
        topBar[0].classList.add("barActive")
    } else{
        let topBar=document.getElementsByClassName("topBar");
        topBar[0].classList.remove("barActive")
    }
}