function LeftBar(container,slides){
	this.leftBar = document.createElement('div');
	this.slidesContainer = document.createElement('div');
	this.addSlide = document.createElement('div');
	this.addText = document.createTextNode('+');

	this.startText = document.createTextNode('S');	
	this.startSlide = document.createElement('div');

	this.slideCounter=0;

	var self = this;
	this.init = function(){
		self.startSlide.appendChild(self.startText);
		self.addSlide.appendChild(self.addText);

		self.leftBar.setAttribute('class','left-bar');
		self.slidesContainer.setAttribute('class','slides-container');
		self.addSlide.setAttribute('class','add-slides');
		self.startSlide.setAttribute('class','start-slideshow');
		
		self.startSlide.addEventListener('click', function(){self.slideShow();});


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

			self.slidesContainer.appendChild(slide);
			//console.log(slidesContainer);
			
		});

		self.leftBar.appendChild(self.startSlide);
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
		// backgroundColor.setAttribute('class','controls');
		// backgroundColor.setAttribute('type','color');

		// topTools.appendChild(backgroundColor);
		var backgroundColor = new BackgroundColor(topTools,container);
		var divSize = new ChangeHeightWidth(topTools,container);
		var changePosition = new ChangePosition(topTools,container);
		//changePosition.init();
		var fontSize = new FontSize(topTools,container);
		var bold = new Bold(topTools,container);
		var italics = new Italics(topTools,container);
		var underline = new Underline(topTools,container);
		var textAlign = new TextAlign(topTools,container);
		var fontColor = new FontColor(topTools,container);
		var newText = new TextBox(topTools,container);

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
	var initialMessage = document.createTextNode("Select the Slide to edit.");
	this.init = function(){
		slideArea.setAttribute('class','slides-area');
		slideArea.appendChild(initialMessage);
		container.appendChild(slideArea);
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
		//console.log(focusSlide)
		for(var i=0;i<focusSlide.elements.length;i++){
			var element = document.createElement(focusSlide.elements[i].type);
			// if(focusSlide.elements[i].type == 'span')
			// {
				//var text = document.createTextNode(focusSlide.elements[i].text);
				element.innerHTML = focusSlide.elements[i].text;
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
		}	
		slideArea.appendChild(mainSlide);
		console.log(slideArea);
	};
	this.setupSlides = function(mainSlide){
		slideArea.appendChild(mainSlide);
	}

	
}