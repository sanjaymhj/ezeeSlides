function Slide(id)
{
	this.id = id;
	this.elements = [];
	this.attributes =[];
	this.styles = [];
	this.transitionIn ="None";
	this.transitionOut ="None";

	var self = this;

	this.setSlideStyle = function(property, propertyValue){
		self.styles.push(new Style(property, propertyValue));
	}
	
	this.setTransitionIn = function(transitionEffect){
		self.transitionIn = transitionEffect;
	}

	this.setTransitionOut = function(transitionEffect){
		self.transitionOut = transitionEffect;
	}

	this.addElements = function(element){
		self.elements.push(element);
	}

}