var currentStatus = {
    'currentABorder': document.getElementById("selfIntroductionABoader"),
    'sectionHeight': getSectionHeight(),
    'fixWindows': getMainSections(),
    'currentSection': 0,
};
//Listener List
//1. Hover animation for topNavBar
let topLiTags = document.querySelectorAll(".topNavBar > ul>li")
for (let i = 0; i < topLiTags.length; i++) {
    let liTag = topLiTags[i];
    liTag.onmouseenter = function (event) {
        let liTarget = event.currentTarget;
        let aBorder = liTarget.firstChild.nextSibling.nextSibling;
        aBorder.classList.add("aBorderHover");
        let navMenu = aBorder.nextSibling.nextSibling;
        if (navMenu) {
            navMenu.classList.add("navMenuActive");
        }
    }
    liTag.onmouseleave = function (event) {
        let liTarget = event.currentTarget;
        let aBorder = liTarget.firstChild.nextSibling.nextSibling;
        aBorder.classList.remove("aBorderHover");
        let navMenu = aBorder.nextSibling.nextSibling;
        if (navMenu) {
                navMenu.classList.remove("navMenuActive");
        }
    }
}
//2.  topNavBar click events
let topATags = document.querySelectorAll(".topNavBar > ul>li>a");
for (let i = 0; i < topLiTags.length; i++) {
    topATags[i].onclick = function (event) {
        event.preventDefault();
        let aTag = event.target;
        let targetY = document.getElementById(aTag.attributes.href.value.slice(1,)).offsetTop;
        gradualScrollTo(0, targetY - 60);
    }
}

function gradualScrollTo(x, y) {
// Setup the tween loop.
    const coords = {x: window.scrollX, y: window.scrollY};
    let moveDistance = Math.abs(y - coords.y);
    let duration = Math.min(moveDistance * 2, 1200);
    console.log(duration)

    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    requestAnimationFrame(animate);
    const tween = new TWEEN.Tween(coords)
        .to({x: x, y: y}, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            window.scrollTo(coords.x, coords.y)
        })
        .start();
}

//3. scroll events
window.onscroll = function (event) {
    changeTopBarColor();
    setTopBatActive();
    elementActive();
}

//active selfIntroduction
function selfIntroductionActive(){
    let selfIntroduction=document.getElementById("selfIntroduction")
    selfIntroduction.classList.add("windowActive");
    setTimeout(function () {
        footerLink.classList.add("elementActivation");
        footerLinkList.classList.add("elementActivation");
        profile.classList.add("elementActivation");
    },700)
}
//active otherElements
function elementActive(){
    let fixedWindows=currentStatus.fixWindows;
    let totalHeight=0;
    let index=0;
    for(let i=0;i<fixedWindows.length;i++){
        totalHeight+=fixedWindows[i].clientHeight;
        if(totalHeight>window.scrollY+window.innerHeight){
            index=i;
            break;
        }
    }
    if (index===0){
        index=fixedWindows.length;
    }
    for(let i=0;i<index;i++){
        fixedWindows[i].classList.add('windowActive');
    }

}

//get main sections by navigation bar
function getMainSections(){
    let fixWindows=document.querySelectorAll(".fixedWindow");
    return fixWindows;
}

// set the border of each navigation button highlight when scroll to corresponding section
function setTopBatActive() {
    let sectionHeight = getSectionHeight();
    let minDis = Number.MAX_VALUE;
    let index = 0;
    for (let i = 0; i < sectionHeight.length; i++) {
        if ((Math.abs(window.scrollY - sectionHeight[i])) < minDis) {
            minDis = Math.abs(window.scrollY - sectionHeight[i]);
            index = i;
        }
    }
    let aLinkList = document.querySelectorAll("#topNavBarList>li");
    currentStatus['currentABorder'].classList.remove("aBorderClick");
    currentStatus['currentABorder'] = aLinkList[index].firstChild.nextSibling.nextSibling;
    currentStatus['currentABorder'].classList.add("aBorderClick");
    currentStatus['currentSection']=index;
}

//get the height of each section
function getSectionHeight() {
    let aTags = document.querySelectorAll(".topNavBar > ul > li > a");
    let sectionHeight = [];
    for (let i = 0; i < aTags.length; i++) {
        let tempElement = document.getElementById(aTags[i].attributes.href.value.slice(1,));
        if (tempElement) {
            sectionHeight[i] = tempElement.offsetTop;
        }
    }
    return sectionHeight;
}

//sticky bar animation
function changeTopBarColor() {
    if (window.scrollY > 0) {
        let topBar = document.getElementsByClassName("topBar");
        topBar[0].classList.add("barActive");
    } else {
        let topBar = document.getElementsByClassName("topBar");
        topBar[0].classList.remove("barActive");
    }
}

