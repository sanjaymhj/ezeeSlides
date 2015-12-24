function Transition(parentElements,container){
	var introTransition = ['None','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','flip','flipInX','flipInY','flipInY','lightSpeedIn','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInDownLeft','rotateInUpRight','slideInUp','slideInDown','slideInLeft','slideInRight','zoomIn','zoomInDown','zoomInLeft','rollIn'];
	var outroTransition = ['None','bounceOut','bounceDown','bounceOutLeft','bounceOutRight','bounceOutUp','fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig','flip','flipOutX','flipOutY','flipOutY','lightSpeedOut','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutDownLeft','rotateOutUpRight','slideOutUp','slideOutDown','slideOutLeft','slideOutRight','zoomOut','zoomOutDown','zoomOutLeft','rollOut']
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var label = document.createTextNode('Transition Style');
		parentElements.appendChild(label);


		var introSelect = document.createElement('select');
		var introLabel = document.createTextNode(' Intro : ');
		parentElements.appendChild(introLabel);
		
		for(var i=0;i<introTransition.length;i++){
			var text = document.createTextNode(introTransition[i]);
			var opt = document.createElement('option');
			opt.appendChild(text);
			//opt.style['font-family']=transition[i];
			introSelect.appendChild(opt);		
		}


		var outroSelect = document.createElement('select');
		var outroLabel = document.createTextNode(' Outro : ');
		
		for(var i=0;i<outroTransition.length;i++){
			var text = document.createTextNode(outroTransition[i]);
			var opt = document.createElement('option');
			opt.appendChild(text);
			//opt.style['font-family']=transition[i];
			outroSelect.appendChild(opt);		
		}

		
		introSelect.setAttribute('class','tools');
		parentElement.appendChild(introSelect);
				parentElements.appendChild(outroLabel);

		outroSelect.setAttribute('class','tools');
		parentElement.appendChild(outroSelect);
		introSelect.onchange = function(){
			
			var animation = this.value;
				var transitionEvent = new CustomEvent('transitionIn',{'detail':animation});
				container.dispatchEvent(transitionEvent);
			};

		outroSelect.onchange = function(){
			var animation = this.value;
				var transitionEvent = new CustomEvent('transitionOut',{'detail':animation});
				container.dispatchEvent(transitionEvent);
			};
	}
	this.init();
}
