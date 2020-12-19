"use strict"



window.onload = function() {

/******************** ENABLER  ********************/
	if (Enabler.isInitialized()) {
		init();
	} else {
	  	Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
	}

	function init() {
	  	if (Enabler.isPageLoaded()) {
	    	// Enabler.setProfileId(10557175);
	    	politeInit();
	  	} else {
	  		// Enabler.setProfileId(10557175);
	    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
	 	}
	};
/***************** //end ofENABLER  *****************/



/******************** VARIABLES  ********************/

	function politeInit(){
//	    console.log = function() {}

        var select = function(s) {
                return document.querySelector(s);
            },
            selectAll = function(s) {
                return document.querySelectorAll(s);
            },
            wrapper = select('#wrapper'),
            cta = select('#cta'),
            wrect = select('#wrect'),
            headlines = selectAll('.headline'),
            blueWords = selectAll('.blue'),
            lastTxt = selectAll('.lastTxt'),
            lastBlue = select('.lastBlue'),
            textTop = select('#textTop'),
            imagesCont = select('#images'),
            images = [],
            imagesSrc = ['image-1.jpg', 'image-2.jpg'],


            tl = gsap.timeline();
/***************** //end of VARIABLES  *****************/

            var splitTextTop = new SplitText(textTop, {type:"words, chars"});
            // var splitLastBlue = new SplitText(lastBlue, {type:"words, chars"});

/*******  PRELOADING IMAGES  ** ** */

        preloadImages(imagesSrc, imagesPreloaded)


        function preloadImages(arrayWithImages, callback) {
            let img
            let remaining = arrayWithImages.length

            for (let i = 0; i < arrayWithImages.length; i++) {

                img = new Image()
                img.onload = function () {
                    --remaining
                    if (remaining <= 0) {
                        callback()
                    }
                }

                img.src = arrayWithImages[i]
                images[i] = img
            }
        }

        function imagesPreloaded() {

            for (let i = 0; i < images.length; i++) {
                const imgDiv = document.createElement('div')

                imgDiv.classList.add('img')
                imgDiv.style.background = `url('${images[i].src}') no-repeat`

                imagesCont.append(imgDiv)
            }

            animate()
        }

/*******  // end of PRELOADING IMAGES  *****/



/******************  MAIN ANIMATION  ******************/
		function animate() {

            const imagesElem = selectAll('.img');

            gsap.registerEffect({
                name: "fadeIn",
                effect: (targets, config) => {
                    var tlEffect = gsap.timeline();
                    tlEffect.from(targets, {duration: config.duration, x:config.x, alpha:0, ease:"back"})
                    return tlEffect;
                },
                defaults: {duration: 1, x:"+=45"},
                extendTimeline: true,
            });

            gsap.registerEffect({
                name: "fadeOut",
                effect: (targets, config) => {
                    var tlEffect = gsap.timeline();
                    tlEffect.to(targets, {duration: config.duration, x:config.x, alpha:0, ease:"back"})
                    return tlEffect;
                },
                defaults: {duration:1, x:"+=40"},
                extendTimeline: true,
            });


            tl
            .to(wrect, {duration:0.7, alpha:0, ease:"none"})


            // frame1
            .from(splitTextTop.chars, {duration:0.7, stagger:0.03, x:"+=20", alpha:0, ease:"power3"}, "<0.5")
            .fadeIn(headlines[0], {duration:0.8, x:"+=120"}, ">-0.5")
            .from(cta, {duration:0.4, x:"-=170", ease:"back.In"}, "<0.5")

            // frame2
            // .fadeOut(headlines[0], ">3.5")
            // .fadeIn(headlines[1], ">-0.5")
            .from(imagesElem[1], {duration: 0.9, alpha: 0, ease:"none"}, "<")

            // // frame3
            // .fadeOut(headlines[1], ">3.5")
            // .fadeIn(headlines[2], ">-0.5")
            // .from(imagesElem[2], {duration: 0.9, alpha: 0, ease:"none"}, "<")

            // // frame4
            // .fadeOut(headlines[2], ">3.5")
            // .to(textTop, {duration:1, x:"+=40", alpha: 0, ease: "back"}, "<")
            // .from(splitLastBlue.chars, {duration:1.3, stagger:0.03, x:"+=20", alpha:0, ease:"power3"}, ">-0.5")
            // .from(lastTxt, {duration: 1, alpha: 0, ease:"none"}, "<0.5")
            // .from(imagesElem[3], {duration: 0.8, alpha: 0, ease:"none"}, "<")

		}
        /******************  //end of MAIN ANIMATION  ******************/



        /********************  EVENTS  ********************/
                let type = ((Modernizr.touchevents)&&(!isChrome)) ? 'touchend' : 'click',
                clickable = selectAll('.clickable');

                clickable.forEach(element => element.addEventListener(type, function(e) {
                    Enabler.exit('Exit');
                    return false;
                }, false));

            };
        /****************** //end of  EVENTS  ******************/


}