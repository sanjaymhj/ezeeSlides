function Element(elementType,id){
	
	this.id = id;
	this.type = elementType;
	this.text;
	this.attributes = [];
	this.styles = [];
	this.transitionIn = 'None';
	this.transitionOut = 'None';
	var self = this;

	this.setText = function(text){
		self.text = text;
	}

	this.setElementAttribute = function(attribute, attributeValue){
		self.attributes.push(new Attribute(attribute, attributeValue));
	}

	this.changeText = function(value){
		self.text = value;
	}

	this.setElementStyle = function(property, propertyValue){
		self.styles.push(new Style(property, propertyValue));
	}
}