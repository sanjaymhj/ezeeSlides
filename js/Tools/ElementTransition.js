function ElementTransition(parentElements,container){
	var introTransition = ['None','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','flip','flipInX','flipInY','flipInY','lightSpeedIn','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInDownLeft','rotateInUpRight','slideInUp','slideInDown','slideInLeft','slideInRight','zoomIn','zoomInDown','zoomInLeft','rollIn'];
	var outroTransition = ['None','bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp','fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig','flip','flipOutX','flipOutY','flipOutY','lightSpeedOut','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutDownLeft','rotateOutUpRight','slideOutUp','slideOutDown','slideOutLeft','slideOutRight','zoomOut','zoomOutDown','zoomOutLeft','rollOut']
	var introSelect = document.createElement('select');
	var outroSelect = document.createElement('select');

	var parentElement = parentElements;
	this.init = function(){
		var label = document.createTextNode('Text Animation : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);

		parentElements.appendChild(document.createElement('div'));
		var introLabel = document.createTextNode(' Intro : ');
		parentElements.appendChild(introLabel);
		
		for(var i=0;i<introTransition.length;i++){
			var text = document.createTextNode(introTransition[i]);
			var opt = document.createElement('option');
			opt.appendChild(text);
			introSelect.appendChild(opt);		
		}


		var outroLabel = document.createTextNode(' Outro : ');
		
		for(var i=0;i<outroTransition.length;i++){
			var text = document.createTextNode(outroTransition[i]);
			var opt = document.createElement('option');
			opt.appendChild(text);
			outroSelect.appendChild(opt);		
		}

		introSelect.setAttribute('class','tools');
		parentElement.appendChild(introSelect);
		parentElements.appendChild(document.createElement('div'));

		parentElements.appendChild(outroLabel);

		outroSelect.setAttribute('class','tools');
		parentElement.appendChild(outroSelect);
		introSelect.onclick = function(){
			var animation = this.value;
			var elemenntTransitionEvent = new CustomEvent('elementTransitionIn',{'detail':animation});
			container.dispatchEvent(elemenntTransitionEvent);
		};

		outroSelect.onclick = function(){
			var animation = this.value;
			var elemenntTransitionEvent = new CustomEvent('elementTransitionOut',{'detail':animation});
			container.dispatchEvent(elemenntTransitionEvent);
		};
	}
	this.setTransition = function(transitionIn,transitionOut){
		introSelect.value = transitionIn;
		outroSelect.value = transitionOut;
	}
	this.init();
}
