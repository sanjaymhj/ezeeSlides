
function Tools(container){

	var topTools = document.createElement('div');
	topTools.setAttribute('class','slides-contianer');

	var focusSlide;
	var focusElement;
	
	this.init = function(){
		topTools.setAttribute('class', 'top-tools');
		
		var div1=document.createElement('div');
		div1.appendChild(document.createTextNode('Slide Styles'));
		div1.setAttribute('class','tool-seperator');
		
		topTools.appendChild(div1);
		topTools.appendChild(document.createTextNode(' Background-Color : '));

		var slideBackground = new SlideBackgroundColor(topTools,container);
		
		var transition = new Transition(topTools,container);
		var deleteSlide = new DeleteSlide(topTools,container);
			
		var div2=document.createElement('div');
		div2.appendChild(document.createTextNode('Text Styles'));
		div2.setAttribute('class','tool-seperator');
		topTools.appendChild(div2);
		var newText = new TextBox(topTools,container);

		var deleteElement = new DeleteElement(topTools,container);
		var divSize = new ChangeSize(topTools,container);	
		var changePosition = new ChangePosition(topTools,container);		
		var fontFamily = new FontFamily(topTools,container);
		var fontSize = new FontSize(topTools,container);
		var bold = new Bold(topTools,container);
		var italics = new Italics(topTools,container);
		var underline = new Underline(topTools,container);
		var elementBackgroundColor = new ElementBackgroundColor(topTools,container);
		var textAlign = new TextAlign(topTools,container);
		var fontColor = new FontColor(topTools,container);
		var elementTransition = new ElementTransition(topTools, container);
		
		container.appendChild(topTools);
	}
	this.changeFocusSlide =  function(focusEle){
		focusElement = focusEle;
		focusSlide = focusEle;
	}

	topTools.addEventListener('evtChangepositionX',function(e){console.log(e.detail);});
}

