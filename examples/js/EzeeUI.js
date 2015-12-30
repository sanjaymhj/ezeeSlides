function EzeeUI(allSlide,parentArea){
	var container = document.createElement('div');
	var allSlides = allSlide;
	//container.setAttribute('class',"slide-wrapper");
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
	
	var propertyExists;
	var slideContainer = document.createElement('div');
	var allElement =[];	

	this.getAllSlides = function(){return allSlides;}

	this.init = function() {
		createLayout();
		
	}

	function createLayout(){
		slideEvent();
	}

	this.init();

	function slideEvent(){
		var slideCounter = 0;
		var elementCounter = 0;
		sliderMarginLeft = parseInt(slideContainer.style.marginLeft);
		sliderWidth = 0;
		windowWidth = parentArea.offsetWidth-parentArea.offsetPadding;
		windowHeight = parentArea.offsetHeight-parentArea.offsetPadding;

		parentArea.appendChild(next);
		parentArea.appendChild(previous);
		parentArea.appendChild(up);
		parentArea.appendChild(down);


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
			updateNavInfo();
			while (container.hasChildNodes()) {
		  	  container.removeChild(container.lastChild);
			}
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
			container.appendChild(mainSlide);
			parentArea.appendChild(container);
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