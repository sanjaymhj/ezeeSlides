function EzeeUI()
{
	var container = document.createElement('div');
	
	container.setAttribute('class',"main-wrapper clearfix");
	this.self = this;
	var allSlides = [];
	var allSlides1 = [{
					"id":0,
					"elements":[{
						"id":0,
						"type":'span',
						"text":'The first Text',
						"attributes":[
							{'attribute':'contentEditable','attributeValue':'true'}],
						"styles":[
							
							// {"property":"border","propertyValue":"2px solid black"},
							{"property":"top","propertyValue":"20%"},
							{"property":"background-color","propertyValue":"red"},
							{"property":"position","propertyValue":"absolute"},
							{"property":"left","propertyValue":"25%"},
							{"property":"width","propertyValue":"50%"},
							{"property":"display","propertyValue":"inline-block"},
							{"property":"contentEditable","propertyValue":"true"},
							{"property":"font-size","propertyValue":"36px"},

							]
						},
						{
						"id":1,
						"type":'span',
						"text":'The first slide second text',
						"attributes":[
							{'attribute':'contentEditable','attributeValue':'true'}],
						"styles":[
							{"property":"background-color","propertyValue":"blue"},
							// {"property":"border","propertyValue":"2px dotted black"},
							{"property":"top","propertyValue":"30%"},
							{"property":"position","propertyValue":"absolute"},
							{"property":"left","propertyValue":"25%"},
							{"property":"width","propertyValue":"50%"},
							{"property":"display","propertyValue":"inline-block"},
							{"property":"contentEditable","propertyValue":"true"},
							

							]
						}


						],
					"styles":[
						// {"property":"background","propertyValue":"blue"},
						{"property":"aoverflow","propertyValue":"hidden"},
						{"property":"height","propertyValue":"100%"},


						{"property":"width","propertyValue":"100%"},
						{"property":"position","propertyValue":"arelative"}]
					},
		{
					"id":1,
					"elements":[{
						"id":0,
						"type":'div',
						"text":'The first Text',
						"attributes":[
							{'attribute':'contentEditable','attributeValue':'true'},
							{'attribute':'text','attributeValue':'Text Here'}],
						"styles":[
							{"property":"background-color","propertyValue":"cyan"},
							{"property":"border","propertyValue":"2px solid black"},
							{"property":"top","propertyValue":"50%"},
							{"property":"position","propertyValue":"absolute"},
							{"property":"left","propertyValue":"50%"},
							{"property":"width","propertyValue":"50%"},
							{"property":"display","propertyValue":"inline-block"},
							{"property":"contentEditable","propertyValue":"true"},
							{"property":"font-size","propertyValue":"200%"},

						

							]
						},
{
						"id":1,
						"type":'div',
						"text":'The second Text',
						"attributes":[
							{'attribute':'contentEditable','attributeValue':'true'},
							{'attribute':'text','attributeValue':'Second Text Here'}],
						"styles":[
							{"property":"background-color","propertyValue":"blue"},
							{"property":"border","propertyValue":"2px dotted black"},
							{"property":"top","propertyValue":"15%"},
							{"property":"position","propertyValue":"absolute"},
							{"property":"left","propertyValue":"20%"},
							{"property":"width","propertyValue":"50%"},
							{"property":"display","propertyValue":"inline-block"},
							{"property":"contentEditable","propertyValue":"true"},
							

							]
						}


						],
					"styles":[
						{"property":"background","propertyValue":"blue"},
						{"property":"aoverflow","propertyValue":"hidden"},
						{"property":"height","propertyValue":"100%"},


						{"property":"width","propertyValue":"100%"},
						{"property":"posaition","propertyValue":"a"}]
					},
		{"id":2,"elements":[],"attributes":[],"styles":[]}
		];
	var focusSlide;
	var focusElementSlide;
	var focusElement;

	var leftBar = new LeftBar(container, allSlides);
	var tools = new Tools(container);
	var centerArea = new CenterArea(container);
	var propertyExists;

this.getAllSlides = function(){return allSlides;}
	this.init = function() {
		createLayout();
		document.body.appendChild(container);	
	}

	function createLayout(){
		leftBar.init();
		centerArea.init();
		tools.init();
	}

	
	this.init();

	

	container.addEventListener('addSlide',function(e){
		var slide = new Slide(allSlides.length);
		allSlides.push(slide);
		console.log(allSlides);
	});

	container.addEventListener('slideToWorkSpace',function(e){
		focusSlide = e.detail;
		console.log("in the main focusSlide.id", focusSlide);
		centerArea.changeWorkspace(allSlides[focusSlide]);
		//tools.changeFocusSlide(focusSlide);

	});
	container.addEventListener('activeElementEvent',function(e){	
		console.log(focusElement,"first one");
		if(focusElement)
		{
			console.log("focusElement exists");
			console.log('old focusSlide ',focusElementSlide,'old element',focusElement.elementId);
			/////////get the text changes
			//console.log(focusElementSlide.elements[focusElement.elementId].text);
			
			// focusElement = e.detail.elementId;
			// focusElementSlide = e.detail.slideId;
		}
		else{
			console.log("focusElement doesnot exists");
			console.log('focusElement now',focusElement);

			// focusElement = e.detail.elementId;
			// focusElementSlide = e.detail.slideId;

		}
		
		focusElementSlide = focusSlide;
		focusElement = e.detail.elementId;
	
	});

	container.addEventListener('textChange',function(e){
		allSlides[focusSlide].elements[focusElement].setText(e.detail);
		console.log(allSlides[focusSlide].elements[focusElement].text, 'is text after change');
	});
	container.addEventListener('changeWidth',function(e){
		changedProperty(e.detail+'px','width');
	});
	container.addEventListener('changeHeight',function(e){
		changedProperty(e.detail+'px','height');
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



	container.addEventListener('startSlide',function(e){
		centerArea.clearWorkspace();
		startSlide();
	});



	//add text in the workspace
	container.addEventListener('createText',function(e){
		//changedProperty(e.detail,'color');
		var textElement = new Element('span',allSlides[focusSlide].elements.length);
		textElement.setElementAttribute('contentEditable','true');
		textElement.setText('Your Text Here');

		//textElement.setElementAttribute('text','Your Text Here');
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
		
		for(var x=0;x<allSlides.length;x++){
			var mainSlide = document.createElement('div');
			mainSlide.setAttribute('class','slide');
			for(var i=0;i<allSlides[x].styles.length;i++){
				mainSlide.style[allSlides[x].styles[i].property]=allSlides[x].styles[i].propertyValue;
			}

			for(var i=0;i<allSlides[x].elements.length;i++){
				var element = document.createElement(allSlides[x].elements[i].type);
				// if(focusSlide.elements[i].type == 'span')
				// {
					//var text = document.createTextNode(focusSlide.elements[i].text);
					element.innerHTML = allSlides[x].elements[i].text;
					//element.appendChild(text);
				// }
				for(var j=0;j<allSlides[x].elements[i].attributes.length;j++)
				{
					element.setAttribute(allSlides[x].elements[i].attributes[j].attribute,allSlides[x].elements[i].attributes[j].attributeValue);
				}

				//console.log(allSlides[x].elements[i].type);
				for(var j=0;j<allSlides[x].elements[i].styles.length;j++)
				{
					element.style[allSlides[x].elements[i].styles[j].property]=allSlides[x].elements[i].styles[j].propertyValue;
				}
				mainSlide.appendChild(element);
			}	

			centerArea.setupSlides(mainSlide);

		}
		//slideArea.appendChild(mainSlide);
		console.log(mainSlide);
	}

	





}
var ezeeUI = new EzeeUI();
