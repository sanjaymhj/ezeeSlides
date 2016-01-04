function LeftBar(container,slides){
	this.leftBar = document.createElement('div');
	this.slidesContainer = document.createElement('div');
	this.addSlide = document.createElement('div');
	var thumbSlide=[];
	this.addText = document.createTextNode('Add');

	this.startText = document.createTextNode('Show');
	this.startSlide = document.createElement('div');

	this.editText = document.createTextNode('Import');
	this.editSlide = document.createElement('div');
	this.editSlide.appendChild(this.editText);

	this.leftBar.setAttribute('class','left-bar');
	this.slidesContainer.setAttribute('class','slides-container');
	this.addSlide.setAttribute('class','add-slides');
	this.startSlide.setAttribute('class','start-slideshow');
	this.editSlide.setAttribute('class','edit-slide');

	this.slideCounter=0;
	var focusSlide = 0;

	var self = this;
	this.updateContainer = function(allSlides){
		self.slides=allSlides;
		self.slideCounter = allSlides.length;
		while (self.slidesContainer.hasChildNodes()) {
		    self.slidesContainer.removeChild(self.slidesContainer.lastChild);
		}

		for (var i=0;i<allSlides.length;i++){
			var slide = document.createElement('div');
			if(i==focusSlide){
				slide.setAttribute('class','slides-thumbnail focus' );
			}
			else
			{
				slide.setAttribute('class','slides-thumbnail' );
			}
			slide.appendChild(document.createTextNode(i+1));
			for(var j=0;j<allSlides[i].styles.length;j++){
				slide.style[allSlides[i].styles[j].property]=allSlides[i].styles[j].propertyValue;
			}

			slide.onclick = (function(slideId){
				return function(){
					var toWorkspace = new CustomEvent('slideToWorkSpace',{'detail':slideId});
					container.dispatchEvent(toWorkspace);
					for(var j=0;j<thumbSlide.length;j++){
						thumbSlide[j].setAttribute('class','slides-thumbnail');
					}
					focusSlide = slideId;
					this.setAttribute('class','slides-thumbnail focus');
				};} )(i);

			thumbSlide.push(slide);
			self.slidesContainer.appendChild(slide);
		}
	}

	this.init = function(){
		self.startSlide.appendChild(self.startText);
		self.addSlide.appendChild(self.addText);

		self.startSlide.addEventListener('click', function(){
			var startSlide = new CustomEvent('startSlide',{});
			container.dispatchEvent(startSlide);
		});

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
		self.leftBar.appendChild(self.addSlide);
		self.leftBar.appendChild(self.slidesContainer);

		container.appendChild(self.leftBar);

	}

	this.getCounter = function(){
		return self.slideCounter;
	}
}
