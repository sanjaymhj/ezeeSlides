function Slide(id)
{
	this.id = id;
	this.elements = [];
	this.attributes =[];
	this.styles = [];
	var self = this;

	this.setSlideStyle = function(property, propertyValue){
		self.styles.push(new Style(property, propertyValue));
	}

	this.setSlideStyle = function(property, propertyValue){
		self.attributes.push(new Attribute(attribute, attributeValue));
	}
	this.addElements = function(element){
		self.elements.push(element);
	}

}