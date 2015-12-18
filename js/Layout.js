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
		
		//startSlide.addEventListener('click', function(){slideShow();});


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
					console.log(slideId);
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

	this.getCounter = function(){
		return self.slideCounter;
	}

	
	this.addSlides = function(){
		console.log("123");
	}

}


function Tools(container){

	var topTools = document.createElement('div');
	topTools.setAttribute('class','slides-contianer');
	var backgroundColor = document.createElement('div');
	this.init = function(){
		topTools.setAttribute('class', 'top-tools');
		backgroundColor.setAttribute('class','controls backgroundColor');
		topTools.appendChild(backgroundColor);
		container.appendChild(topTools);
	}
;
}


function CenterArea(container){
	var slideArea = document.createElement('div');
	
	var initialMessage = document.createTextNode("Select the Slide to edit.");
	this.init = function(){
		slideArea.setAttribute('class','slides-area');
		slideArea.appendChild(initialMessage);
		container.appendChild(slideArea);
	}

	slideArea.addEventListener('toWorkspace',function(){
		while (slideArea.hasChildNodes()) {
		    slideArea.removeChild(slideArea.lastChild);
		}


	});

	
}