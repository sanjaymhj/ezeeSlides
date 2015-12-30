function Slide(id)
{
	this.id = id;
	this.elements = [];
	this.attributes =[];
	this.styles = [];
	this.transitionIn ="None";
	this.transitionOut ="None";

	var self = this;
	
	this.addElements = function(element){
		self.elements.push(element);
	}

}