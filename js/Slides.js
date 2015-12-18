function Slide(id)
{
	this.id = id;
	this.elements = [];
	this.attributes =[];
	var self = this;

	
	this.initSlide = function()
	{
		this.addClass('slide');	//this.container
	}
	this.getElements = function(){
		return self.elements;
	}
	this.setSlideProperty = function(property, propertyValue){
		self.attributes.push(new Attribute(property, propertyValue));
	}

	this.addElements = function(element){
		self.elements.push(element);
	}

}