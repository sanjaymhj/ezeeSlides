
function Tools(container){

	var topTools = document.createElement('div');
	topTools.setAttribute('class','slides-contianer');
	
	var slideTools = document.createElement('div');
	slideTools.setAttribute('class', 'edit-tools');
		
	var textTools = document.createElement('div');
	textTools.setAttribute('class', 'edit-tools');
		
	this.initSlideTools = function(){
		
		var div1=document.createElement('div');
		div1.appendChild(document.createTextNode('Slide Styles'));
		div1.setAttribute('class','tool-seperator');
		
		slideTools.appendChild(div1);
		slideTools.appendChild(document.createTextNode(' Background-Color : '));

		var slideBackground = new SlideBackgroundColor(slideTools,container);
		
		var transition = new Transition(slideTools,container);
		var deleteSlide = new DeleteSlide(slideTools,container);
		var div2=document.createElement('div');
		div2.appendChild(document.createTextNode('Text Styles'));
		div2.setAttribute('class','tool-seperator');
		slideTools.appendChild(div2);
		var newText = new TextBox(slideTools,container);

		topTools.appendChild(slideTools);
		container.appendChild(topTools);
	}
	
	this.initTextTools = function(){
		
		var deleteElement = new DeleteElement(slideTools,container);
		var divSize = new ChangeSize(textTools,container);	
		var changePosition = new ChangePosition(textTools,container);		
		var fontFamily = new FontFamily(textTools,container);
		var fontSize = new FontSize(textTools,container);
		var bold = new Bold(textTools,container);
		var italics = new Italics(textTools,container);
		var underline = new Underline(textTools,container);
		var elementBackgroundColor = new ElementBackgroundColor(textTools,container);
		var textAlign = new TextAlign(textTools,container);
		var fontColor = new FontColor(textTools,container);
		var elementTransition = new ElementTransition(textTools, container);
		topTools.appendChild(textTools);
		container.appendChild(topTools);
		
	}

	this.clearAllTools = function(){
		while (slideTools.hasChildNodes()) {
		    slideTools.removeChild(slideTools.lastChild);
		}
		while (textTools.hasChildNodes()) {
		    textTools.removeChild(textTools.lastChild);
		}
		while (topTools.hasChildNodes()) {
		    topTools.removeChild(topTools.lastChild);
		}
	}
}

