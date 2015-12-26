function LeftBar(container,slides){
	this.leftBar = document.createElement('div');
	this.slidesContainer = document.createElement('div');
	this.addSlide = document.createElement('div');
	var thumbSlide=[];
	this.addText = document.createTextNode('+');

	this.startText = document.createTextNode('S');	
	this.startSlide = document.createElement('div');

	this.exportText = document.createTextNode('E');
	this.exportSlide = document.createElement('div');
	this.exportSlide.appendChild(this.exportText);

	this.slideCounter=0;

	var self = this;
	this.updateContainer = function(allSlides){

		while (self.slidesContainer.hasChildNodes()) {
		    self.slidesContainer.removeChild(self.slidesContainer.lastChild);
		}

		for (var i=0;i<allSlides.length;i++){
			var slide = document.createElement('div');
				//console.log(e.detail,"from slide addition in view");
			slide.setAttribute('class','slides-thumbnail' );
			for(var j=0;j<allSlides[i].styles.length;j++){
				slide.style[allSlides[i].styles[j].property]=allSlides[i].styles[j].propertyValue;
				console.log('wiritin the property');
			}
					
		
			slide.onclick = (function(slideId){
				return function(){
					console.log(slideId,"slideid from left bar");
					var toWorkspace = new CustomEvent('slideToWorkSpace',{'detail':slideId});
					console.log(i, 'th slide selected');
					container.dispatchEvent(toWorkspace);
				};} )(i);

				thumbSlide.push(slide);
			self.slidesContainer.appendChild(slide);	
		}
	}

	this.init = function(){
		self.startSlide.appendChild(self.startText);
		self.addSlide.appendChild(self.addText);

		self.leftBar.setAttribute('class','left-bar');
		self.slidesContainer.setAttribute('class','slides-container');
		self.addSlide.setAttribute('class','add-slides');
		self.startSlide.setAttribute('class','start-slideshow');
		self.exportSlide.setAttribute('class','export-slide');
		
		self.startSlide.addEventListener('click', function(){self.slideShow();});

		self.exportSlide.addEventListener('click', function(){
			var exportEvent = new CustomEvent('exportSlide',{});
			container.dispatchEvent(exportEvent);

		});


		self.addSlide.onclick =  function(){
			console.log(self.slideCounter,"number of slides in the array before adding new one");
			var ev1 = new CustomEvent('addSlide',{'detail':self.slideCounter});
			
			container.dispatchEvent(ev1);//js variable
			self.slidesContainer.dispatchEvent(ev1);//ui
			self.slideCounter++;
			console.log(self.slideCounter,"number of slides in the array after adding new one");

		}

		self.slidesContainer.addEventListener('addSlide',function(e){

			var slide = document.createElement('div');
			console.log(e.detail,"from slide addition in view");
			
			slide.setAttribute('class','slides-thumbnail' );
			
			slide.onclick = (function(slideId){
				return function(){
					console.log(slideId,"slideid from left bar");
					var toWorkspace = new CustomEvent('slideToWorkSpace',{'detail':slideId});
					
					container.dispatchEvent(toWorkspace);
				};} )(e.detail);

				thumbSlide.push(slide);
			self.slidesContainer.appendChild(thumbSlide[thumbSlide.length-1]);	


		});

		self.leftBar.appendChild(self.startSlide);
		self.leftBar.appendChild(self.exportSlide);

		self.leftBar.appendChild(self.slidesContainer);
		self.leftBar.appendChild(self.addSlide);
		container.appendChild(self.leftBar);

	}
	this.slideShow = function(){
		var startSlide = new CustomEvent('startSlide',{});
		container.dispatchEvent(startSlide);
	}

	this.getCounter = function(){
		return self.slideCounter;
	}
}


function Tools(container){

	var topTools = document.createElement('div');
	topTools.setAttribute('class','slides-contianer');

	//var backgroundColor = document.createElement('input');
	var focusSlide;
	var focusElement;
	
	this.init = function(){
		topTools.setAttribute('class', 'top-tools');
		
		var div1=document.createElement('div');
		div1.appendChild(document.createTextNode('Slide Styles'));
		div1.setAttribute('class','tool-seperator');
		
		topTools.appendChild(div1);
		topTools.appendChild(document.createTextNode(' Background-Color : '));


		var slideBackground = new SlideBackgroundColor(topTools,container);
		
		var transition = new Transition(topTools,container);
		var deleteSlide = new DeleteSlide(topTools,container);
			
		var div2=document.createElement('div');
		div2.appendChild(document.createTextNode('Text Styles'));
		div2.setAttribute('class','tool-seperator');
		topTools.appendChild(div2);
		var newText = new TextBox(topTools,container);
		var divSize = new ChangeSize(topTools,container);	
		var changePosition = new ChangePosition(topTools,container);		
		var fontFamily = new FontFamily(topTools,container);
		var fontSize = new FontSize(topTools,container);
		var bold = new Bold(topTools,container);
		var italics = new Italics(topTools,container);
		var underline = new Underline(topTools,container);
		var backgroundColor = new BackgroundColor(topTools,container);
		var textAlign = new TextAlign(topTools,container);
		var fontColor = new FontColor(topTools,container);
		var elementTransition = new ElementTransition(topTools, container);
		
		var deleteElement = new DeleteElement(topTools,container);
		container.appendChild(topTools);
	}
	this.changeFocusSlide =  function(focusEle){
		focusElement = focusEle;
		focusSlide = focusEle;
		
		console.log(focusElement,"from tools focus Element",focusSlide," and this is the focusSlide");
	}

	topTools.addEventListener('evtChangepositionX',function(e){console.log(e.detail);});
}


function CenterArea(container){
	var slideArea = document.createElement('div');
	var self = this;
	var slide;
	var allElements = [];
	var initialMessage = document.createTextNode("Select the Slide to edit.");
	this.init = function(){
		slideArea.setAttribute('class','slides-area no-slide');
		slideArea.appendChild(initialMessage);
		container.appendChild(slideArea);
	}
	this.slideAdded = function(){
		slideArea.setAttribute('class','slide-area slide-added')
	}


	this.clearWorkspace = function(){
		while (slideArea.hasChildNodes()) {
		    slideArea.removeChild(slideArea.lastChild);
		}
	};

	this.changeWorkspace = function(focusSlide){
		self.clearWorkspace();
		console.log(focusSlide,"from the center area");
		var mainSlide = document.createElement('div');
		mainSlide.setAttribute('class','slide');
		for(var i=0;i<focusSlide.styles.length;i++){
			mainSlide.style[focusSlide.styles[i].property]=focusSlide.styles[i].propertyValue;
		}
		allElements = [];
		//console.log(focusSlide)
		for(var i=0;i<focusSlide.elements.length;i++){
			var element = document.createElement(focusSlide.elements[i].type);
			// if(focusSlide.elements[i].type == 'span')
			// {
				//var text = document.createTextNode(focusSlide.elements[i].text);
				element.innerHTML = focusSlide.elements[i].text;
				element.setAttribute('id',i);
				//element.appendChild(text);
			// }
			for(var j=0;j<focusSlide.elements[i].attributes.length;j++)
			{
				element.setAttribute(focusSlide.elements[i].attributes[j].attribute,focusSlide.elements[i].attributes[j].attributeValue);
			}

			console.log(focusSlide.elements[i].type);
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
		console.log(allElements);
		slideArea.appendChild(mainSlide);
		console.log(slideArea);
		self.slide = mainSlide;
	};
	this.setupSlides = function(mainSlide){
		slideArea.appendChild(mainSlide);
		slideArea.onkeypress = function(){
				console.log("dfhklajsh liuah eaiwu hailsdf");
			}
	}
	this.getSlide = function(){
		return self.slide;
	}

	this.getAllElements = function(){
		return allElements;
	}
	
}