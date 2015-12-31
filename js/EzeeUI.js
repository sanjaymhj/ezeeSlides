function EzeeUI(allSlide,parentArea){
	var container = document.createElement('div');
	var allSlides = allSlide;
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
		slideEvent();
	}
	
	this.init();

	function slideEvent(){
		var slideCounter = 0;
		var elementCounter = 0;
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
			}
			else{
			}
		};

		function elementNext(){
			if(!(elementCounter > allSlides[slideCounter].elements.length-1)){
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
			if(!(slideCounter <= 0)){
				elementCounter =0;
				slideCounter--;
				slideinit();
			}
		};

		function nextSlide(){
			elementCounter = 0;
			if(!(slideCounter >= allSlides.length-1)){
				if(allSlides[slideCounter].transitionOut != 'None'){
					slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionOut)
					slide.addEventListener("animationend", function(){
						slide.setAttribute('class','slide');
						slideCounter++;
						slideinit();
						slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionIn);
						elementNext();
						slide.addEventListener("animationend", function(){
							slide.setAttribute('class','slide');
					}, false);
					}, false);
				}
				else{
					slideCounter++;
					slideinit();
					slide.setAttribute('class','slide animated '+allSlides[slideCounter].transitionIn);
					elementNext();
					slide.addEventListener("animationend", function(){
						slide.setAttribute('class','slide');
					}, false);
				}
			}
		};
		
		window.onkeydown = function(e){
			var e = e || window.event;
			if (e.keyCode == '38'){	// up arrow
				elementPrevious();
			}
			else if (e.keyCode == '40'){// down arrow
				elementNext();
			}
			else if (e.keyCode == '37'){//left or previous
				previousSlide();
			}
			else if (e.keyCode == '39'){//right or next
				nextSlide();
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
				if(!(allSlides[slideCounter].elements[i].transitionIn == 'None')){
					element.style['display']='none';
				}
				mainSlide.appendChild(element);	
				allElement.push(element);
			}
			var pageNumber = document.createElement('span');
			pageNumber.setAttribute('class','page-number');

			pageNumber.appendChild(document.createTextNode(slideCounter+1+"/"+allSlides.length));
			console.log(pageNumber);
			mainSlide.appendChild(pageNumber);
			// mainSlide.appendChild(document.createTextNode(slideCounter+1+"/"+allSlides.length));
			container.appendChild(mainSlide);
			parentArea.appendChild(container);
			slide = mainSlide;
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

			if(elementCounter == allSlides[slideCounter].elements.length-1 || allSlides[slideCounter].elements.length == 0){
				down.setAttribute('class','down-bar');
			}
			else{
				down.setAttribute('class','down-bar active');
			}

			if(elementCounter == 0){
				up.setAttribute('class','up-bar');
			}
			else{
				up.setAttribute('class','up-bar active');
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