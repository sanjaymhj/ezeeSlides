function Tools(container){

	var topTools = document.createElement('div');
	topTools.setAttribute('class','slides-contianer clearfix');
	
	var slideTools = document.createElement('div');
	slideTools.setAttribute('class', 'edit-tools');
		
	var textTools = document.createElement('div');
	textTools.setAttribute('class', 'edit-tools');
		
	this.initSlideTools = function(slide){
		
		var div1=document.createElement('div');
		div1.appendChild(document.createTextNode('Slide Styles'));
		div1.setAttribute('class','tool-seperator');
		
		slideTools.appendChild(div1);
		var slideBackground = new SlideBackgroundColor(slideTools,container);
		for(var i = 0;i<slide.styles.length;i++){
			if(slide.styles[i].property == 'background-color'){
				slideBackground.setSlideBackground(slide.styles[i].propertyValue);
			}
		}
		
		var transition = new Transition(slideTools,container);
		transition.setTransition(slide.transitionIn, slide.transitionOut);

		var deleteSlide = new DeleteSlide(slideTools,container);

		var div2=document.createElement('div');
		div2.appendChild(document.createTextNode('Text Styles'));
		div2.setAttribute('class','tool-seperator');
		slideTools.appendChild(div2);
		var newText = new TextBox(slideTools,container);

		topTools.appendChild(slideTools);
		container.appendChild(topTools);
	}
	
	this.initTextTools = function(element){
		
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
		
		for(var i=0;i<element.styles.length;i++){
			if(element.styles[i].property == 'width'){
				divSize.setWidth(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'height'){
				divSize.setHeight(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'top'){
				changePosition.setTop(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'left'){
				changePosition.setLeft(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'font-family'){
				fontFamily.setFont(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'font-size'){
				fontSize.setSize(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'background-color'){
				elementBackgroundColor.setElementBackgroundColor(element.styles[i].propertyValue);
			}
			if(element.styles[i].property == 'color'){
				fontColor.setColor(element.styles[i].propertyValue);
			}
		}
		elementTransition.setTransition(element.transitionIn,element.transitionOut)

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

