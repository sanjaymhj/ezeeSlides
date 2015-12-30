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
		self.editSlide.setAttribute('class','edit-slide');
		
		self.startSlide.addEventListener('click', function(){self.slideShow();});

		self.editSlide.addEventListener('click', function(){
			var editEvent = new CustomEvent('editSlide',{});
			container.dispatchEvent(editEvent);

		});


		self.addSlide.onclick =  function(){
			console.log(self.slideCounter,"number of slides in the array before adding new one");
			var ev1 = new CustomEvent('addSlide',{'detail':self.slideCounter});
			
			container.dispatchEvent(ev1);//js variable
			self.slidesContainer.dispatchEvent(ev1);//ui
			self.slideCounter++;
			console.log(self.slideCounter,"number of slides in the array after adding new one");

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

