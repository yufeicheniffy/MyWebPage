{
    const View = document.querySelector('.topBar')
    const Controller = {
        init: function () {
            this.View = View;
            this.topNavBar = this.View.querySelector(".topNavBar");
            this.topLiTags = this.topNavBar.querySelectorAll("ul>li");;
            this.bindEvents();
        },

        bindEvents: function () {
            this.topNavBar_Hover();
            this.topNavBar_Click();

        },
        /*functions section*/
        topNavBar_Hover: function () {
            let topLiTags = Array.from(this.topLiTags);
            topLiTags.forEach(liTag => {
                liTag.onmouseenter = function (event) {
                    let liTarget = event.currentTarget;
                    let aBorder = liTarget.firstChild.nextSibling.nextSibling;
                    aBorder.classList.add("aBorderHover");
                    let navMenu = aBorder.nextSibling.nextSibling;
                    if (navMenu) {
                        navMenu.classList.add("navMenuActive");
                    }
                };
                liTag.onmouseleave = function (event) {
                    let liTarget = event.currentTarget;
                    let aBorder = liTarget.firstChild.nextSibling.nextSibling;
                    aBorder.classList.remove("aBorderHover");
                    let navMenu = aBorder.nextSibling.nextSibling;
                    if (navMenu) {
                        navMenu.classList.remove("navMenuActive");
                    }
                };
            })
        },
        topNavBar_Click: function () {
            let topATags = this.topNavBar.querySelectorAll("ul>li>a");
            topATags = Array.from(topATags);
            topATags.forEach(Alink => {
                Alink.onclick = function (event) {
                    event.preventDefault();
                    let aTag = event.target;
                    let targetY = document.getElementById(aTag.attributes.href.value.slice(1,)).offsetTop;
                    gradualScrollTo(0, targetY - 60);
                }
            });

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
        },
    };
    Controller.init();
}