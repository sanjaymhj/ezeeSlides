function Element(elementType){
	
	this.type = elementType;
	this.attributes = [];
	this.element = document.createElement(elementType);
	var self = this;
	// this.element.addEventListener('click', function(){
	// 		window.focusElement = self.element;
	// 		console.log(focusElement,"-->focus Element from element init");
	// 	});

	this.setStyle = function(styles, styleValues)
	{
		if(styles.length==styleValues.length)
		for (var i=0;i<styles.length;i++){
			self.element.style[styles[i]]=styleValues[i];
		}
	}

	this.addText = function(text){
		var textToAppend = document.createTextNode(text);
		self.element.appendChild(textToAppend);
	}

	this.show = function(){
		focusSlide.appendChild(self.element);
	}

}