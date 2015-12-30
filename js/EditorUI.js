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
	console.log(slideContainer);
		
	this.init = function() {
		createLayout();
		document.body.appendChild(container);	
	}

	this.init();
	
	function createLayout(){
		leftBar.init();
		centerArea.init();
		tools.init();
	}

	container.addEventListener('addSlide',function(e){
		var slide = new Slide(allSlides.length);
		allSlides.push(slide);
		console.log(allSlides);	
		leftBar.updateContainer(allSlides);
		console.log(allSlides,"leftbar updated");
	});

	container.addEventListener('deleteElement',function(e){
		console.log('delete this ', allSlides[focusSlide].elements[focusElement]);
		allSlides[focusSlide].elements.splice(focusElement,1);
		focusElement--;
		if(focusElement<0)
		{
			centerArea.changeWorkspace(allSlides[focusSlide]);
		}
		else{
			focusElement = 0;
		}


	});

	container.addEventListener('deleteSlide',function(e){
		console.log('delete this ', allSlides[focusSlide]);
		allSlides.splice(focusSlide,1);
		console.log(allSlides,"remaining slides after deleting");
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
		
	});
	
	container.addEventListener('slideToWorkSpace',function(e){
		focusSlide = e.detail;
		slideStarted = false;
		console.log("tool init");
		console.log("in the main focusSlide.id", focusSlide);
		console.log(allSlides[focusSlide],"--------------------------------------");

		centerArea.changeWorkspace(allSlides[focusSlide]);
		workSlide = centerArea.getSlide();
		workElements = centerArea.getAllElements();
		console.log(workElements,"allElements From");
		
		
	});

	container.addEventListener('activeElementEvent',function(e){	
		console.log(focusElement,"first one");
		if(focusElement)
		{
			console.log("focusElement exists");
			console.log('old focusSlide ',focusElementSlide,'old element',focusElement.elementId);
		}
		else{
			console.log("focusElement doesnot exists");
			console.log('focusElement now',focusElement);
		}
		
		focusElementSlide = focusSlide;
		focusElement = e.detail.elementId;
		

	
	});

	container.addEventListener('changefontstyle',function(e){
		changedProperty(e.detail,'font-family');
		console.log(e.detail, 'is font style after change');
	});

	container.addEventListener('editSlide',function(e){
		var data = window.prompt();
		allSlides = JSON.parse(data);
		leftBar.updateContainer(allSlides);
	});
	document.addEventListener('copy',function(e){   // e.clipboardData.setData('application/json', JSON.stringify(allSlides));
		alert('copied'+JSON.stringify(allSlides));
		e.clipboardData.setData('text/plain', JSON.stringify(allSlides));
		e.preventDefault();
	});

	container.addEventListener('transitionIn',function(e){
		console.log(e.detail, 'is transition change');
		allSlides[focusSlide].transitionIn = e.detail;
		workSlide.setAttribute('class','slide animated '+e.detail);
		console.log(workSlide);
		workSlide.addEventListener("animationend", function(){
			workSlide.setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
		}, false);
	});

	container.addEventListener('transitionOut',function(e){
		
		console.log(e.detail, 'is transition change');
		allSlides[focusSlide].transitionOut = e.detail;
		console.log(allSlides[focusSlide].transitionOut);
		workSlide.setAttribute('class','slide animated '+e.detail);
		workSlide.addEventListener("animationend", function(){
			workSlide.setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
		}, false);
	});

	container.addEventListener('elementTransitionIn',function(e){
				workElements = centerArea.getAllElements();

		console.log(e.detail, 'is element transition change in');

		allSlides[focusSlide].elements[focusElement].transitionIn = e.detail;
		//console.log('transition set to ',e.detail);
		console.log('transition set to ',allSlides[focusSlide].elements[focusElement].transitionIn);
		console.log(workElements,' getting all elements from element transition');
		
		console.log(workElements,'elements to be animated');
		workElements[focusElement].setAttribute('class','animated '+e.detail);
		//workElements[focusElement].addEventListener('animationend',function(){workElements[focusElement].setAttribute('class','');});
	});

	container.addEventListener('elementTransitionOut',function(e){
				workElements = centerArea.getAllElements();

		console.log(e.detail, 'is element transition change out');
		allSlides[focusSlide].elements[focusElement].transitionOut = e.detail;
		
		console.log('transition set to ',allSlides[focusSlide].elements[focusElement].transitionOut);
		workElements[focusElement].setAttribute('class','animated '+e.detail);
		workElements[focusElement].addEventListener('animationend',function(){workElements[focusElement].setAttribute('class','');});
	});

	container.addEventListener('textChange',function(e){
		allSlides[focusSlide].elements[focusElement].setText(e.detail);
		console.log(allSlides[focusSlide].elements[focusElement].text, 'is text after change');
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
		console.log("clear background of slide");
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
		textElement.setElementStyle('top','0%');
		textElement.setElementStyle('position','absolute');
		textElement.setElementStyle('width','50%');
		textElement.setElementStyle('font-size','100%');
		textElement.setElementStyle('display','inline-block');

		allSlides[focusSlide].elements.push(textElement);
		console.log(allSlides[focusSlide].elements.length);
		centerArea.changeWorkspace(allSlides[focusSlide]);
		console.log("create New text place");


	});
 
	function changedProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].elements[focusElement].styles.length;i++)
		{
			if(allSlides[focusSlide].elements[focusElement].styles[i].property == property){
				allSlides[focusSlide].elements[focusElement].styles[i].propertyValue = propertyValue;
				console.log(property," set");
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

		 	console.log("in the main - new property added", propertyValue,property);
		}
	}

	function toggleProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].elements[focusElement].styles.length;i++)
		{
			if(allSlides[focusSlide].elements[focusElement].styles[i].property == property){
				allSlides[focusSlide].elements[focusElement].styles.splice(i,1);
				console.log(property," unset");
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

		 	console.log("in the main - new property added", propertyValue,property);
		}
	}

	function startSlide(){
		centerArea.clearWorkspace();
		console.log(centerArea.getCenterArea());
		var ezeeUI = new EzeeUI(allSlides, centerArea.getCenterArea());
	}

	


	function changedslideProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].styles.length;i++)
		{
			if(allSlides[focusSlide].styles[i].property == property){
				allSlides[focusSlide].styles[i].propertyValue = propertyValue;
				console.log(property," set");
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;
		 		console.log("in the changeslideproperty - property exists", propertyValue,property);

				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].styles.push(newStyle);
			centerArea.changeWorkspace(allSlides[focusSlide]);

		 	console.log("in the changeslideproperty - new property added", propertyValue,property);
		}
		leftBar.updateContainer(allSlides);
	}

	function toggleslideProperty (propertyValue,property){
		propertyExists=false;
		for(var i=0;i<allSlides[focusSlide].styles.length;i++)
		{
			if(allSlides[focusSlide].styles[i].property == property){
				allSlides[focusSlide].styles.splice(i,1);
				console.log(property," unset");
				centerArea.changeWorkspace(allSlides[focusSlide]);
				propertyExists = true;
				console.log("in the toggleslideProperty - new property added", propertyValue,property);

				break;
			}
		}
		if(!propertyExists)
		{
			var newStyle = new Style(property, propertyValue);
			allSlides[focusSlide].styles.push(newStyle);
				centerArea.changeWorkspace(allSlides[focusSlide]);

		 	console.log("in the toggleslideProperty - new property added", propertyValue,property);
		}
		leftBar.updateContainer(allSlides);
	}

}
var editorUI = new EditorUI();