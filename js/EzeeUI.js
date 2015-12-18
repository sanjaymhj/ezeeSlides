function EzeeUI()
{
	var container = document.createElement('div');
	
	container.setAttribute('class',"main-wrapper clearfix");
	this.self = this;
	var allSlides = [];
	var focusSlide;
	var focusElement;

	var leftBar = new LeftBar(container, allSlides);
	var tools = new Tools(container);
	var centerArea = new CenterArea(container);

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
		console.log("in the main", e.detail);
		

	});

}
var ezeeUI = new EzeeUI();
