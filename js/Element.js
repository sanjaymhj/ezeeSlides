function Element(elementType,id){
	
	this.id = id;
	this.type = elementType;

	this.attributes = [];
	var self = this;
	// this.element.addEventListener('click', function(){
	// 		window.focusElement = self.element;
	// 		console.log(focusElement,"-->focus Element from element init");
	// 	});

	this.setElementAttribute = function(property, propertyValue){
		self.attributes.push(new Attribute(property, propertyValue));
	}
}