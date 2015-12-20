function Slide(id)
{
	this.id = id;
	this.elements = [];
	this.attributes =[];
	this.styles = [];
	var self = this;

	this.setSlideAttribute = function(property, propertyValue){
		self.attributes.push(new Attribute(property, propertyValue));
	}

	this.addElements = function(element){
		self.elements.push(element);
	}

}