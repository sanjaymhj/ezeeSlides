function DeleteElement(topTools,container){
	var deleteElement = document.createElement('div');
	deleteElement.setAttribute('class','tools btn-lg');
	deleteElement.appendChild(document.createTextNode('Delete This Element'));
	this.init = function(){
		topTools.appendChild(deleteElement);
		topTools.appendChild(document.createElement('div'));
		
		deleteElement.addEventListener('click',function(){
			var deleteElementEvent = new CustomEvent('deleteElement',{});
			container.dispatchEvent(deleteElementEvent);
		});
	}
	this.init();
}

function DeleteSlide(topTools,container){
	var deleteSlide = document.createElement('div');
	deleteSlide.setAttribute('class','tools btn-lg next');
	deleteSlide.appendChild(document.createTextNode('Delete This Slide'));
	this.init = function(){
		topTools.appendChild(deleteSlide);
		deleteSlide.addEventListener('click',function(){
			var deleteSlideEvent = new CustomEvent('deleteSlide',{});
			container.dispatchEvent(deleteSlideEvent);
		});
	}
	this.init();
}