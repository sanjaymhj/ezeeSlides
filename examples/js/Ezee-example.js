function EzeeUI()
{
	var container = document.createElement('div');
	var allSlides = [{"id":0,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"23%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"15%"},{"property":"left","propertyValue":"0%"},{"property":"text-align","propertyValue":"center"}],"transitionIn":"fadeIn","transitionOut":"rollOut","text":"Slide&nbsp;1"},{"id":1,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"32%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"text-align","propertyValue":"center"},{"property":"height","propertyValue":"15%"}],"transitionIn":"fadeIn","transitionOut":"None","text":"Your Text Here"}],"attributes":[],"styles":[],"transitionIn":"bounceIn","transitionOut":"bounceOut"},{"id":1,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"23%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"15%"},{"property":"text-align","propertyValue":"center"},{"property":"font-family","propertyValue":"Arial"}],"transitionIn":"zoomInLeft","transitionOut":"zoomOutLeft","text":"Slide&nbsp;2"},{"id":1,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"0%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"50%"},{"property":"font-size","propertyValue":"100%"},{"property":"display","propertyValue":"inline-block"}],"transitionIn":"rotateInUpRight","transitionOut":"fadeOutLeft","text":"Your Text Here"}],"attributes":[],"styles":[],"transitionIn":"bounceInRight","transitionOut":"bounceOutLeft"},{"id":2,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"23%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"15%"},{"property":"text-align","propertyValue":"center"}],"transitionIn":"zoomInDown","transitionOut":"zoomOutDown","text":"Slide&nbsp;3"}],"attributes":[],"styles":[],"transitionIn":"bounceInUp","transitionOut":"bounceOutUp"},{"id":3,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"23%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"15%"},{"property":"text-align","propertyValue":"center"}],"transitionIn":"slideInUp","transitionOut":"slideOutUp","text":"Slide&nbsp;4"}],"attributes":[],"styles":[],"transitionIn":"fadeIn","transitionOut":"fadeOut"},{"id":4,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"23%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"100%"},{"property":"font-size","propertyValue":"187.5%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"15%"},{"property":"text-align","propertyValue":"center"}],"transitionIn":"flipInX","transitionOut":"flipOutX","text":"Slide&nbsp;5"}],"attributes":[],"styles":[],"transitionIn":"fadeInDown","transitionOut":"fadeOutDown"}];
	
	container.setAttribute('class',"main-wrapper");
	this.self = this;
	var slide;
	var next = document.createElement('div');
	next.setAttribute('class',"next-bar");

	var previous = document.createElement('div');
	previous.setAttribute('class',"previous-bar");
	

	var up = document.createElement('div');
	up.setAttribute('class',"up-bar");

	var down = document.createElement('div');
	down.setAttribute('class',"down-bar");
	
	
	var centerArea = new CenterArea(container);
	var propertyExists;
	var slideContainer = document.createElement('div');
	var allElement =[];	

	this.getAllSlides = function(){return allSlides;}
	this.init = function() {
		createLayout();
		document.body.appendChild(container);
	}

	function createLayout(){
		centerArea.init();
		slideEvent();
	}

	this.init();

	var slideStarted = false;
	function slideEvent(){
		slideStarted = true;
		
		var slideCounter = 0;
		var elementCounter = 0;
		sliderMarginLeft = parseInt(slideContainer.style.marginLeft);
		sliderWidth = 0;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		container.appendChild(next);
		container.appendChild(previous);
		container.appendChild(up);
		container.appendChild(down);


		function elementPrevious(){
			updateNavInfo();

			if(elementCounter >0){
				elementCounter--;
				if(allSlides[slideCounter].elements[elementCounter].transitionIn != 'None')
					allElement[elementCounter].style['display']='none';
				console.log("back to this element ",elementCounter);
			}
			else{
				console.log("reached to this element ",elementCounter);
			}
		};

		function elementNext(){
			if(elementCounter > allSlides[slideCounter].elements.length-1)
			{
				console.log('cant go down');
			}
			else
			{
			updateNavInfo();

				if(allSlides[slideCounter].elements[elementCounter].transitionIn != 'None'){
					allElement[elementCounter].style['display']='inline-block';
					allElement[elementCounter].setAttribute('class','animated '+allSlides[slideCounter].elements[elementCounter].transitionIn);
					allElement[elementCounter].addEventListener('animationend',function(){
						allElement[elementCounter].setAttribute('class','');
					});

				 }
				 elementCounter++;
			}
		};

		function previousSlide(){
			if(slideCounter <= 0)
					{
						console.log('cant go right');
					}
					else
					{
						elementCounter =0;
						slideCounter--;
						slideinit();
						//document.getElementsByClassName('slide')[0].setAttribute('class','slide '+allSlides[slideCounter].transition);


					}
					console.log(slideCounter);
		};

		function nextSlide(){
			elementCounter = 0;
			console.log('new slide start****************************');
			console.log(allSlides.length - 1,"right limit & current is",slideCounter);
			if(slideCounter >= allSlides.length-1)
			{
				console.log('cant go right');

			}
			else
			{
				console.log('within limit---------');
				if(allSlides[slideCounter].transitionOut != 'None'){
					console.log('animating outro of slide',slideCounter);

					console.log('animating ',allSlides[slideCounter].transitionOut,' of ',slideCounter);

					slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionOut)
					slide.addEventListener("animationend", function(){
						slide.setAttribute('class','slide');//+allSlides[slideCounter].transition);
						//alert("anim end");
						slideCounter++;
						slideinit();
						slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionIn);
						elementNext();
						slide.addEventListener("animationend", function(){
							slide.setAttribute('class','slide');//+allSlides[slideCounter].transition);

					}, false);
					}, false);
				}
				else{
					slideCounter++;
					slideinit();
					slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionIn);
					elementNext();
					slide.addEventListener("animationend", function(){
						slide.setAttribute('class','slide');//+allSlides[slideCounter].transition);
					}, false);
				}
				console.log(slideCounter);
			}
		};
		
		window.onkeydown = function(e){
			var e = e || window.event;
			if (e.keyCode == '38') {
				// up arrow
				console.log("up arrow");
				elementPrevious();
			}
			else if (e.keyCode == '40') {
				// down arrow
				elementNext();
				console.log("down arrow");
			}
			else if (e.keyCode == '37')//left or previous
			{
				previousSlide();
				console.log("left arrow");
			}
			else if (e.keyCode == '39')//right or next
			{
				nextSlide();
				console.log("right arrow");
		 	}	
		};

		this.slideinit = function(){
			centerArea.clearWorkspace();
			updateNavInfo();
			allElement=[];
			var mainSlide = document.createElement('div');
			mainSlide.setAttribute('class','slide');
			mainSlide.style['width'] = windowWidth+'px';
			mainSlide.style['height'] = windowHeight+'px';
			mainSlide.style['position'] = 'absolute';
			mainSlide.style['z-index'] = slideCounter;


			console.log(mainSlide.style['width'],mainSlide.style['height'],"from init");
		
			for(var i=0;i<allSlides[slideCounter].styles.length;i++){
				mainSlide.style[allSlides[slideCounter].styles[i].property]=allSlides[slideCounter].styles[i].propertyValue;
			}

			for(var i=0;i<allSlides[slideCounter].elements.length;i++){
				var element = document.createElement(allSlides[slideCounter].elements[i].type);
				element.innerHTML = allSlides[slideCounter].elements[i].text;
				element.setAttribute('id',i);
				
				for(var j=0;j<allSlides[slideCounter].elements[i].attributes.length;j++)
				{
					element.setAttribute(allSlides[slideCounter].elements[i].attributes[j].attribute,allSlides[slideCounter].elements[i].attributes[j].attributeValue);
				}
				for(var j=0;j<allSlides[slideCounter].elements[i].styles.length;j++)
				{
					element.style[allSlides[slideCounter].elements[i].styles[j].property]=allSlides[slideCounter].elements[i].styles[j].propertyValue;
				}
				console.log('transition In :',allSlides[slideCounter].elements[i].transitionIn,'transition Out: ',allSlides[slideCounter].elements[i].transitionOut);
				if(allSlides[slideCounter].elements[i].transitionIn == 'None')
				{
					console.log('transition in none if element',i);
				}
				else{
					element.style['display']='none';
				}
					mainSlide.appendChild(element);	
					
					console.log('Slide init ', slide);
					allElement.push(element);

				console.log(allSlides[slideCounter].transitionIn,allSlides[slideCounter].elements[i].transitionIn);
			}
			mainSlide.appendChild(document.createTextNode(slideCounter));
			centerArea.setupSlides(mainSlide);
			slide = mainSlide;
			console.log(allElement);	

		};
		var updateNavInfo = function(){
			if(slideCounter<=allSlides.length-2){
				next.setAttribute('class','next-bar active');
			}
			else{
				next.setAttribute('class','next-bar');
			}

			if(slideCounter>0){
				previous.setAttribute('class','previous-bar active');
			}
			else{
				previous.setAttribute('class','previous-bar');
			}
				console.log('down arrow blah',elementCounter,allSlides[slideCounter].elements.length)

			if(elementCounter == allSlides[slideCounter].elements.length-1 || allSlides[slideCounter].elements.length == 0){
				down.setAttribute('class','down-bar');
				console.log('down arrow blah',elementCounter,allSlides[slideCounter].elements.length)
			}
			else{
				down.setAttribute('class','down-bar active');
				console.log('down arrow blacj',elementCounter,allSlides[slideCounter].elements.length)

			}

			if(elementCounter == 0){
				up.setAttribute('class','up-bar');
				console.log('for button status',slideCounter,allSlides.length-1,'active state++++++++++++++++++++');
			}
			else{
				up.setAttribute('class','up-bar active');
				console.log('for button status',slideCounter,allSlides.length,'inactive state------------------');
			}

			
		}

		next.onclick = function(){
			nextSlide();
		};

		previous.onclick = function(){
			previousSlide();
		};
		up.onclick = function(){
			elementPrevious();
		};

		down.onclick = function(){
			elementNext();
		};

		this.slideinit();
	};



}
var ezeeUI = new EzeeUI();




//center area class


function CenterArea(container){
	var slideArea = document.createElement('div');
	var self = this;
	this.init = function(){
		slideArea.setAttribute('class','slides-area');
		slideArea.style['height'] = window.innerHeight +'px';
		slideArea.style['width'] = window.innerWidth +'px';
		container.appendChild(slideArea);
	}

	this.clearWorkspace = function(){
		while (slideArea.hasChildNodes()) {
		    slideArea.removeChild(slideArea.lastChild);
		}
	};

	this.setupSlides = function(mainSlide){
		slideArea.appendChild(mainSlide);
	}

}	
	