function EzeeUI()
{
	var container = document.createElement('div');
	
	container.setAttribute('class',"main-wrapper clearfix");
	this.self = this;
	var allSlides = [];
	//var allSlides = [{"id":0,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"0%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"740px"},{"property":"font-size","propertyValue":"100%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"555px"},{"property":"background-color","propertyValue":"#8080ff"}],"text":"Your Text Here"}],"attributes":[],"styles":[]},{"id":1,"elements":[{"id":0,"type":"span","attributes":[{"attribute":"contentEditable","attributeValue":"true"}],"styles":[{"property":"top","propertyValue":"0%"},{"property":"position","propertyValue":"absolute"},{"property":"width","propertyValue":"740px"},{"property":"font-size","propertyValue":"100%"},{"property":"display","propertyValue":"inline-block"},{"property":"height","propertyValue":"555px"},{"property":"background-color","propertyValue":"#0080ff"}],"text":"Your Text Here"}],"attributes":[],"styles":[]}];
	var allSlides2= [{
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
	var slideContainer = document.createElement('div');
		

	this.getAllSlides = function(){return allSlides;}//for dev

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
		slideStarted = false;
		console.log("tool init");
		//tools.init();
		console.log("in the main focusSlide.id", focusSlide);
		centerArea.changeWorkspace(allSlides[focusSlide]);
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

	container.addEventListener('exportSlide',function(e){
		document.getElementById('jsonHolder').innerHTML = JSON.stringify(allSlides);
		var copied =JSON.stringify(allSlides);// document.getElementById('jsonHolder').createTextRange();
		//e.clipboardData.setData('text/plain', 'Hello, world!');
		//copied.execCommand("Copy");
		alert(copied);
		 // var clip = new ClipboardEvent('copy');
   //              //clip.clipboardData.setData('text/plain', "test");
   //              clip.preventDefault();
   //              clip.returnValue = false;
   //              document.dispatchEvent(clip);

	});
	document.addEventListener('copy',function(e){   // e.clipboardData.setData('application/json', JSON.stringify(allSlides));
		alert('copied',JSON.stringify(allSlides));
});

	container.addEventListener('transitionIn',function(e){
		var slid = document.getElementsByClassName('slide')[0];
		
		console.log(e.detail, 'is transition change');
		allSlides[focusSlide].setTransitionIn(e.detail);
		slid.setAttribute('class','slide animated '+e.detail);
		slid.addEventListener("animationend", function(){
			slid.setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
		}, false);
	});

	container.addEventListener('transitionOut',function(e){
		var slid = document.getElementsByClassName('slide')[0];
		console.log(e.detail, 'is transition change');
		allSlides[focusSlide].setTransitionOut(e.detail);
		console.log(allSlides[focusSlide].transitionOut);
		slid.setAttribute('class','slide animated '+e.detail);
		slid.addEventListener("animationend", function(){
								slid.setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
						}, false);
	});

	container.addEventListener('elementTransitionIn',function(e){
		console.log(e.detail, 'is element transition change in');
		allSlides[focusSlide].elements[focusElement].setTransitionIn(e.detail);
		debugger;
		//console.log('transition set to ',e.detail);
		console.log('transition set to ',allSlides[focusSlide].elements[focusElement].transitionIn);
		debugger;
		document.getElementById(focusElement).setAttribute('class','animated '+e.detail);
		document.getElementById(focusElement).addEventListener('animationend',function(){document.getElementById(focusElement).setAttribute('class','');});

		// allSlides[focusSlide].setTransitionIn(e.detail);
		// document.getElementsByClassName('slide')[0].setAttribute('class','slide animated '+e.detail);
		// document.getElementsByClassName('slide')[0].addEventListener("animationend", function(){
		// 	document.getElementsByClassName('slide')[0].setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
		// }, false);
	});

	container.addEventListener('elementTransitionOut',function(e){
		console.log(e.detail, 'is element stransition change');
		// allSlides[focusSlide].setTransitionOut(e.detail);
		// document.getElementsByClassName('slide')[0].setAttribute('class','slide animated '+e.detail);
		// document.getElementsByClassName('slide')[0].addEventListener("animationend", function(){
		// 						document.getElementsByClassName('slide')[0].setAttribute('class','slide');// animated '+document.getElementsByClassName('slide')[0].transitionIn);
		// 				}, false);
	});

	container.addEventListener('transitionOut',function(e){
		console.log(e.detail, 'is transition change');
		allSlides[focusSlide].setTransitionOut(e.detail);
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
		//console.log("set background of slide",e.detail);

	});

	container.addEventListener('slideclearBackground',function(e){
		toggleslideProperty(e.detail,'background-color');
		console.log("clear background of slide");
	});



var slideStarted = false;
	container.addEventListener('startSlide',function(e){
		slideStarted = true;
		var keyPress = document.createElement('div');
		keyPress.appendChild(document.createTextNode('Key'));


		keyPress.style['width'] = "50px";
		keyPress.style['height'] = "50px";
		keyPress.style['background'] = "#aeaeae";
		keyPress.style['position'] = "absolute";
		keyPress.style['z-index'] = "5";
		keyPress.style['left'] = "100px";

		var next = document.createElement('div');
		next.appendChild(document.createTextNode('Next'));
		next.style['width'] = "50px";
		next.style['height'] = "50px";
		next.style['background'] = "#aeaeae";
		next.style['position'] = "absolute";
		next.style['z-index'] = "5";
		next.style['left'] = "50px";

		var previous = document.createElement('div');
		previous.appendChild(document.createTextNode('Previous'));

		previous.style['width'] = "50px";
		previous.style['height'] = "50px";
		previous.style['background'] = "#aeaeae";
		previous.style['position'] = "absolute";
		previous.style['z-index'] = "5";
		previous.style['left'] = "0";
		var elementCounter = 0;

		window.onkeydown = function(e){
			if(slideStarted)
			{
				var e = e || window.event;

			    if (e.keyCode == '38') {
			        // up arrow
			        console.log("up arrow");
			    }
			    else if (e.keyCode == '40') {
			        // down arrow
			        console.log("down arrow");
			    }
			    else if (e.keyCode == '37') {
			       if(slideContainer.offsetLeft != 0){
						slideContainer.style['left'] = slideContainer.offsetLeft + 740 +'px';
						console.log(slideContainer.offsetLeft);
					}
					else{
						console.log('cant go previous');
					}
			       console.log("left arrow");
			    }
			    else if (e.keyCode == '39') {
			       if(slideContainer.offsetLeft != -slideContainer.offsetWidth+740 ){
						slideContainer.style['left'] = slideContainer.offsetLeft - 740 +'px';
						console.log(slideContainer.offsetLeft);
						elementCounter = 0;
						}
						else{
							console.log('cant go next');
						}
			       console.log("right arrow");
			    }
			}
		}

		next.onclick = function(){
			if(slideContainer.offsetLeft != -slideContainer.offsetWidth+740 ){
			slideContainer.style['left'] = slideContainer.offsetLeft - 740 +'px';
			console.log(slideContainer.offsetLeft);
			}
			else{
				console.log('cant go next');
			}
			//slideContainer.style['margin'] = slideContainer.style['margin']-740;
		};
		previous.onclick = function(){
			if(slideContainer.offsetLeft != 0){
				slideContainer.style['left'] = slideContainer.offsetLeft + 740 +'px';
				console.log(slideContainer.offsetLeft);
			}
			else{
				console.log('cant go previous');
			}
			//slideContainer.style['margin'] = slideContainer.style['margin']-740;
		};
		centerArea.clearWorkspace();
		centerArea.setupSlides(previous);
		centerArea.setupSlides(next);
		centerArea.setupSlides(keyPress);

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
		slideContainer.style['width'] = allSlides.length * 740 +'px';
		slideContainer.style['height'] = '550px';
		slideContainer.style['position'] = 'absolute';
		slideContainer.style['left'] = '0px';

		while (slideContainer.hasChildNodes()) {
		    slideContainer.removeChild(slideContainer.lastChild);
		}
		console.log(allSlides.length);
		for(var x=0;x<allSlides.length;x++){
			var mainSlide = document.createElement('div');
			mainSlide.setAttribute('class','slide');

			for(var i=0;i<allSlides[x].styles.length;i++){
				mainSlide.style[allSlides[x].styles[i].property]=allSlides[x].styles[i].propertyValue;
			}

			for(var i=0;i<allSlides[x].elements.length;i++){
				var element = document.createElement(allSlides[x].elements[i].type);
				element.innerHTML = allSlides[x].elements[i].text;
				element.setId =i;
				for(var j=0;j<allSlides[x].elements[i].attributes.length;j++)
				{
					element.setAttribute(allSlides[x].elements[i].attributes[j].attribute,allSlides[x].elements[i].attributes[j].attributeValue);
				}
				for(var j=0;j<allSlides[x].elements[i].styles.length;j++)
				{
					element.style[allSlides[x].elements[i].styles[j].property]=allSlides[x].elements[i].styles[j].propertyValue;
				}
				// if(allSlides[x].elements[i].transitionIn=='None'){
				// 	mainSlide.appendChild(element);
				// }
				// else
				// {
				// 	mainSlide
				// }
				mainSlide.appendChild(element);
			}
			slideContainer.appendChild(mainSlide);
		}
		centerArea.setupSlides(slideContainer);
		
		console.log(mainSlide);
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
	}





}
var ezeeUI = new EzeeUI();
