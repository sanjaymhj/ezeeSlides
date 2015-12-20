function Element(elementType,id){
	
	this.id = id;
	this.type = elementType;
	this.text;
	this.attributes = [];
	this.styles = [];
	var self = this;
	// this.element.addEventListener('click', function(){
	// 		window.focusElement = self.element;
	// 		console.log(focusElement,"-->focus Element from element init");
	// 	});
	this.setText = function(text){
		self.text = text;
	}

	this.setElementAttribute = function(attribute, attributeValue){
		self.attributes.push(new Attribute(attribute, attributeValue));
	}
	this.setElementStyle = function(property, propertyValue){
		self.styles.push(new Style(property, propertyValue));
	}

}