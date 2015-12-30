function LeftBar(container,slides){
	this.leftBar = document.createElement('div');
	this.slidesContainer = document.createElement('div');
	this.addSlide = document.createElement('div');
	var thumbSlide=[];
	this.addText = document.createTextNode('+');

	this.startText = document.createTextNode('S');	
	this.startSlide = document.createElement('div');

	this.editText = document.createTextNode('E');
	this.editSlide = document.createElement('div');
	this.editSlide.appendChild(this.editText);

	this.slideCounter=0;

	var self = this;
	this.updateContainer = function(allSlides){
		self.slideCounter = allSlides.length;
		while (self.slidesContainer.hasChildNodes()) {
		    self.slidesContainer.removeChild(self.slidesContainer.lastChild);
		}

		for (var i=0;i<allSlides.length;i++){
			var slide = document.createElement('div');
			slide.setAttribute('class','slides-thumbnail' );
			for(var j=0;j<allSlides[i].styles.length;j++){
				slide.style[allSlides[i].styles[j].property]=allSlides[i].styles[j].propertyValue;
			}
					
		
			slide.onclick = (function(slideId){
				return function(){
					var toWorkspace = new CustomEvent('slideToWorkSpace',{'detail':slideId});
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
		self.editSlide.setAttribute('class','edit-slide');
		
		self.startSlide.addEventListener('click', function(){self.slideShow();});

		self.editSlide.addEventListener('click', function(){
			var editEvent = new CustomEvent('editSlide',{});
			container.dispatchEvent(editEvent);

		});


		self.addSlide.onclick =  function(){
			var addnewSlide = new CustomEvent('addSlide',{'detail':self.slideCounter});
			container.dispatchEvent(addnewSlide);
			self.slideCounter++;

		}
		self.leftBar.appendChild(self.startSlide);
		self.leftBar.appendChild(self.editSlide);

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

