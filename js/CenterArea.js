function CenterArea(container){
	var slideArea = document.createElement('div');
	var self = this;
	var slide;
	var allElements = [];
	var initialMessage = document.createTextNode("Select the Slide to edit.");
	this.init = function(){
		slideArea.setAttribute('class','slides-area show');
		slideArea.appendChild(initialMessage);
		container.appendChild(slideArea);
	}

	this.slideAdded = function(){
		slideArea.setAttribute('class','slide-area slide-added')
	}

	this.getCenterArea = function(){
		return slideArea;
	}


	this.clearWorkspace = function(){
		while (slideArea.hasChildNodes()) {
		    slideArea.removeChild(slideArea.lastChild);
		}
	};

	this.changeWorkspace = function(focusSlide){
		self.clearWorkspace();
		var mainSlide = document.createElement('div');
		mainSlide.setAttribute('class','slide');
		for(var i=0;i<focusSlide.styles.length;i++){
			mainSlide.style[focusSlide.styles[i].property]=focusSlide.styles[i].propertyValue;
		}
		allElements = [];
		for(var i=0;i<focusSlide.elements.length;i++){
			var element = document.createElement(focusSlide.elements[i].type);
			element.innerHTML = focusSlide.elements[i].text;
			element.setAttribute('id',i);
			for(var j=0;j<focusSlide.elements[i].attributes.length;j++)
			{
				element.setAttribute(focusSlide.elements[i].attributes[j].attribute,focusSlide.elements[i].attributes[j].attributeValue);
			}

			for(var j=0;j<focusSlide.elements[i].styles.length;j++)
			{
				element.style[focusSlide.elements[i].styles[j].property]=focusSlide.elements[i].styles[j].propertyValue;
			}
			mainSlide.appendChild(element);
			element.onclick = (function(el){
				return function(){
					var activeElementEvent = new CustomEvent('activeElementEvent',{detail:{'elementId':el,'slideId':focusSlide.id}});
					container.dispatchEvent(activeElementEvent);
				}
			})(i);
			

			element.onkeypress = function(e){
				var evt = e || window.event;
				var textChanged = new CustomEvent('textChange',{'detail':this.innerHTML+String.fromCharCode(evt.which)});
				container.dispatchEvent(textChanged);
			}
			allElements.push(element);
		}	
		slideArea.appendChild(mainSlide);
		self.slide = mainSlide;
	};
	this.setupSlides = function(mainSlide){
		slideArea.appendChild(mainSlide);
		
	}
	this.getSlide = function(){
		return self.slide;
	}

	this.getAllElements = function(){
		return allElements;
	}
	
}