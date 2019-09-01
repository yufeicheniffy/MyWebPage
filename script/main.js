{
    const View = document.querySelector('body');
    const Controller={
        init : function(){
            this.currentStatus={
                    'currentABorder': document.getElementById("selfIntroductionABoader"),
                    'sectionHeight': this.getSectionHeight(),
                    'fixWindows': this.getMainSections(),
                    'currentSection': 0,
            };
            this.changeTopBarColor();
            this.selfIntroductionActive();
            this.elementActive()
            this.bindEvents();
        },
        bindEvents:function(){
            window.onscroll = ()=> {
                this.changeTopBarColor();
                this.setTopBatActive();
                this.elementActive();
            }
        },
        //active selfIntroduction
        selfIntroductionActive: function () {
            let selfIntroduction = document.getElementById("selfIntroduction")
            selfIntroduction.classList.add("windowActive");
            setTimeout(function () {
                footerLink.classList.add("elementActivation");
                footerLinkList.classList.add("elementActivation");
                profile.classList.add("elementActivation");
            }, 700)
        },
        //active otherElements
        elementActive: function () {
            let fixedWindows = this.currentStatus.fixWindows;
            let totalHeight = 0;
            let index = 0;
            for (let i = 0; i < fixedWindows.length; i++) {
                totalHeight += fixedWindows[i].clientHeight;
                if (totalHeight > window.scrollY + window.innerHeight) {
                    index = i;
                    break;
                }
            }
            if (index === 0) {
                index = fixedWindows.length;
            }
            for (let i = 0; i < index; i++) {
                fixedWindows[i].classList.add('windowActive');
            }
        },
        //get main sections by navigation bar
        getMainSections: function () {
            let fixWindows = document.querySelectorAll(".fixedWindow");
            return fixWindows;
        },
        // set the border of each navigation button highlight when scroll to corresponding section
        setTopBatActive: function () {
            let sectionHeight = this.getSectionHeight();
            let minDis = Number.MAX_VALUE;
            let index = 0;
            for (let i = 0; i < sectionHeight.length; i++) {
                if ((Math.abs(window.scrollY - (sectionHeight[i]-300))) < minDis) {
                    minDis = Math.abs(window.scrollY - sectionHeight[i]);
                    index = i;
                }
            }
            let aLinkList = document.querySelectorAll("#topNavBarList>li");
            let currentStatus=this.currentStatus;
            currentStatus['currentABorder'].classList.remove("aBorderClick");
            currentStatus['currentABorder'] = aLinkList[index].firstChild.nextSibling.nextSibling;
            currentStatus['currentABorder'].classList.add("aBorderClick");
            currentStatus['currentSection'] = index;
        },
        //get the height of each section
        getSectionHeight: function () {
            let aTags = document.querySelectorAll(".topNavBar > ul > li > a");
            let sectionHeight = [];
            for (let i = 0; i < aTags.length; i++) {
                let tempElement = document.getElementById(aTags[i].attributes.href.value.slice(1,)); //specific id in HTML
                if (tempElement) {
                    sectionHeight[i] = tempElement.offsetTop;
                }
            }
            return sectionHeight;
        },
        //sticky bar animation
        changeTopBarColor: function () {
            if (window.scrollY > 0) {
                let topBar = document.getElementsByClassName("topBar");
                topBar[0].classList.add("barActive");
            } else {
                let topBar = document.getElementsByClassName("topBar");
                topBar[0].classList.remove("barActive");
            }
        },
    };
    Controller.init();
}

