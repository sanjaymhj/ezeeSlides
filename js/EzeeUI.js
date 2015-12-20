function EzeeUI()
{
	var container = document.createElement('div');
	
	container.setAttribute('class',"main-wrapper clearfix");
	this.self = this;
	var allSlides = [{
					"id":0,
					"elements":[{
						"id":0,
						"type":'span',
						"text":'The first Text',
						"attributes":[
							{'attribute':'contentEditable','attributeValue':'true'}],
						"styles":[
							
							{"property":"border","propertyValue":"2px solid black"},
							{"property":"top","propertyValue":"20%"},
							{"property":"background","propertyValue":"red"},
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
							{"property":"background","propertyValue":"blue"},
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
						{"property":"background","propertyValue":"blue"},
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
							{"property":"background","propertyValue":"cyan"},
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
							{"property":"background","propertyValue":"blue"},
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
		tools.init();
		centerArea.init();
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
		focusElement = e.detail;
		console.log(focusElement,"from main focusElement");
	});

	container.addEventListener('changeBackground',function(e){
		var backgroundExists=false;
		for(var i=0;i<allSlides[focusSlide].elements[focusElement].styles.length;i++)
		{
			if(allSlides[focusSlide].elements[focusElement].styles[i].property == "background"){
				allSlides[focusSlide].elements[focusElement].styles[i].propertyValue = e.detail;
				console.log("background changed");
				centerArea.changeWorkspace(allSlides[focusSlide]);
				backgroundExists = true;
			}
		}
		// if(!backgroundExists){
		// 	allSlides[focusSlide.id].
		// }
		// console.log("in the main", focusSlide);
		// centerArea.changeWorkspace(focusSlide);

	});
	container.addEventListener('changePositionX',function(e){
		changedProperty(e.detail+'px','left');
	});
	container.addEventListener('changePositionY',function(e){
		changedProperty(e.detail+'px','top');
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
			var newAttribute = new Attribute(property, propertyValue);
			allSlides[focusSlide].elements[focusElement].styles.push(newAttribute);
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
			var newAttribute = new Attribute(property, propertyValue);
			allSlides[focusSlide].elements[focusElement].styles.push(newAttribute);
				centerArea.changeWorkspace(allSlides[focusSlide]);

		 	console.log("in the main - new property added", propertyValue,property);
		}
	}





}
var ezeeUI = new EzeeUI();
