function EditorUI()
{
	var container = document.createElement('div');
	
	container.setAttribute('class',"main-wrapper clearfix");
	this.self = this;
	var allSlides = [];
	
	var focusSlide;
	var focusElementSlide;
	var focusElement;
	var workSlide;
	var workElements = [];

	var leftBar = new LeftBar(container, allSlides);
	var tools = new Tools(container);
	var centerArea = new CenterArea(container);
	var propertyExists;
	var slideContainer = document.createElement('div');
		
	this.init = function() {
		createLayout();
		document.body.appendChild(container);	
	}

	this.init();
	
	function createLayout(){
		leftBar.init();
		centerArea.init();
	}

	container.addEventListener('addSlide',function(e){
		var slide = new Slide(allSlides.length);
		allSlides.push(slide);
		leftBar.updateContainer(allSlides);
	});

	container.addEventListener('deleteElement',function(e){
		allSlides[focusSlide].elements.splice(focusElement,1);
		focusElement--;
		if(focusElement<=0)
		{
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
		else{
			focusElement = 0;
		}
		tools.clearAllTools();
		tools.initSlideTools(allSlides[focusSlide]);
	});

	container.addEventListener('deleteSlide',function(e){
		allSlides.splice(focusSlide,1);
		if(allSlides.length>0)
			leftBar.updateContainer(allSlides);
		focusSlide--;
		
		if(focusSlide > 0 )
		{
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
		else{
			focusSlide = 0;
			centerArea.clearWorkspace();
		}
		leftBar.updateContainer(allSlides);
		tools.clearAllTools();
		tools.initSlideTools(allSlides[focusSlide]);
	});
	
	container.addEventListener('slideToWorkSpace',function(e){
		focusSlide = e.detail;
		slideStarted = false;
		tools.clearAllTools();
		tools.initSlideTools(allSlides[focusSlide]);
		centerArea.changeWorkspace(allSlides[focusSlide]);
		workSlide = centerArea.getSlide();
		workElements = centerArea.getAllElements();
	});

	container.addEventListener('activeElementEvent',function(e){	
		focusElementSlide = focusSlide;
		focusElement = e.detail.elementId;
		tools.clearAllTools();
		tools.initSlideTools(allSlides[focusSlide]);
		tools.initTextTools(allSlides[focusSlide].elements[focusElement]);
	});

	container.addEventListener('changefontstyle',function(e){
		changedProperty(e.detail,'font-family');
	});

	container.addEventListener('editSlide',function(e){
		var data = window.prompt("Enter the JSON of the existing slide: ");
		if(data == null){
			allSlides = [];
		}
		else
		{
			allSlides = JSON.parse(data);
		}
		for (var i=0;i<allSlides.length;i++){
			for(var j=0;j<allSlides[i].elements.length;j++){
				for(var k=0;k<allSlides[i].elements[j].attributes.length;k++){
					if(allSlides[i].elements[j].attributes[k].attribute == 'contentEditable'){
						allSlides[i].elements[j].attributes[k].attributeValue = true;
					}
				}
			}
		}
		leftBar.updateContainer(allSlides);
	});
	
	document.addEventListener('copy',function(e){
		var slidesExport = JSON.parse(JSON.stringify(allSlides));
		for (var i=0;i<slidesExport.length;i++){
			for(var j=0;j<slidesExport[i].elements.length;j++){
				for(var k=0;k<slidesExport[i].elements[j].attributes.length;k++){
					if(slidesExport[i].elements[j].attributes[k].attribute == 'contentEditable'){
						slidesExport[i].elements[j].attributes[k].attributeValue = false;
					}
				}
			}
		}
		alert('copied'+JSON.stringify(slidesExport));
		e.clipboardData.setData('text/plain', JSON.stringify(slidesExport));
		e.preventDefault();
	});

	container.addEventListener('transitionIn',function(e){
		allSlides[focusSlide].transitionIn = e.detail;
		workSlide.setAttribute('class','slide animated '+e.detail);
		workSlide.addEventListener("animationend", function(){
			workSlide.setAttribute('class','slide');
		}, false);
	});

	container.addEventListener('transitionOut',function(e){
		
		allSlides[focusSlide].transitionOut = e.detail;
		workSlide.setAttribute('class','slide animated '+e.detail);
		workSlide.addEventListener("animationend", function(){
			workSlide.setAttribute('class','slide');
		}, false);
	});

	container.addEventListener('elementTransitionIn',function(e){
		workElements = centerArea.getAllElements();
		allSlides[focusSlide].elements[focusElement].transitionIn = e.detail;
		workElements[focusElement].setAttribute('class','animated '+e.detail);
	});

	container.addEventListener('elementTransitionOut',function(e){
		workElements = centerArea.getAllElements();
		allSlides[focusSlide].elements[focusElement].transitionOut = e.detail;
		workElements[focusElement].setAttribute('class','animated '+e.detail);
		workElements[focusElement].addEventListener('animationend',function(){workElements[focusElement].setAttribute('class','');});
	});

	container.addEventListener('textChange',function(e){
		allSlides[focusSlide].elements[focusElement].text = e.detail;
	});

	container.addEventListener('changeWidth',function(e){
		changedProperty(e.detail+'%','width');
	});

	container.addEventListener('changeHeight',function(e){
		changedProperty(e.detail+'%','height');
	});

	container.addEventListener('changeBackground',function(e){
		changedProperty(e.detail,'background-color');
	});

	container.addEventListener('clearBackground',function(e){
		toggleProperty(e.detail,'background-color');
	});

	container.addEventListener('changePositionX',function(e){
		changedProperty(e.detail+'%','left');
	});

	container.addEventListener('changePositionY',function(e){
		changedProperty(e.detail+'%','top');
	});

	container.addEventListener('changeFont',function(e){
		changedProperty(e.detail+'%','font-size');
	});

	container.addEventListener('bold',function(e){
		toggleProperty('bold','font-weight');
	});

	container.addEventListener('italics',function(e){
		toggleProperty('italic','font-style');
	});

	container.addEventListener('underline',function(e){
		toggleProperty('underline','text-decoration');
	});

	container.addEventListener('textAlign',function(e){
		changedProperty(e.detail,'text-align');
	});

	container.addEventListener('fontColor',function(e){
		changedProperty(e.detail,'color');
	});

	container.addEventListener('slidechangeBackground',function(e){
		changedslideProperty(e.detail,'background-color');
	});

	container.addEventListener('slideclearBackground',function(e){
		toggleslideProperty(e.detail,'background-color');
	});

	var slideStarted = false;
	container.addEventListener('startSlide',function(e){
		slideStarted = true;
		var elementCounter = 0;
		startSlide();
	});

	//add text in the workspace
	container.addEventListener('createText',function(e){
		var textElement = new Element('span',allSlides[focusSlide].elements.length);
		textElement.setElementAttribute('contentEditable','true');
		textElement.setText('Your Text Here');
		textElement.setElementStyle('top','10%');
		textElement.setElementStyle('left','25%');

		textElement.setElementStyle('position','absolute');
		textElement.setElementStyle('width','50%');
		textElement.setElementStyle('height','10%');
		textElement.setElementStyle('font-family','Arial');
		textElement.setElementStyle('color','black');
		textElement.setElementStyle('text-align','center');

		textElement.setElementStyle('font-size','200%');
		textElement.setElementStyle('display','inline-block');

		allSlides[focusSlide].elements.push(textElement);
		centerArea.changeWorkspace(allSlides[focusSlide]);
	});
 
	function changedProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].elements[focusElement].styles.length;i++)
		{
			if(allSlides[focusSlide].elements[focusElement].styles[i].property == property){
				allSlides[focusSlide].elements[focusElement].styles[i].propertyValue = propertyValue;
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;
				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].elements[focusElement].styles.push(newStyle);
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
	}

	function toggleProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].elements[focusElement].styles.length;i++)
		{
			if(allSlides[focusSlide].elements[focusElement].styles[i].property == property){
				allSlides[focusSlide].elements[focusElement].styles.splice(i,1);
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;
				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].elements[focusElement].styles.push(newStyle);
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
	}

	function startSlide(){
		if(allSlides.length == 0){
			alert("No Slides Made.");
		}
		else{
			centerArea.clearWorkspace();
			var ezeeUI = new EzeeUI(allSlides, centerArea.getCenterArea());
		}
	}

	function changedslideProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].styles.length;i++)
		{
			if(allSlides[focusSlide].styles[i].property == property){
				allSlides[focusSlide].styles[i].propertyValue = propertyValue;
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;

				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].styles.push(newStyle);
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
		leftBar.updateContainer(allSlides);
	}

	function toggleslideProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].styles.length;i++)
		{
			if(allSlides[focusSlide].styles[i].property == property){
				allSlides[focusSlide].styles.splice(i,1);
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;

				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].styles.push(newStyle);
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
		leftBar.updateContainer(allSlides);
	}
}
var editorUI = new EditorUI();
