function BackgroundColor(topTools,container){
	var backgroundColor = document.createElement('div');
	var backgroundColorInput = document.createElement('input');
	var clearBackgroundColor = document.createElement('div');
	backgroundColor.style['display'] = 'inline-block';
	clearBackgroundColor.setAttribute('class','btn-md');

	clearBackgroundColor.style['margin'] = '5px';
	clearBackgroundColor.style['height'] = '25px';

	backgroundColorInput.setAttribute('type','color');
	clearBackgroundColor.appendChild(document.createTextNode('Clear'));
	this.init = function(){
		backgroundColor.appendChild(document.createTextNode('Background-Color : '));
		backgroundColor.appendChild(backgroundColorInput);
		backgroundColor.appendChild(clearBackgroundColor);


		topTools.appendChild(backgroundColor); 
	}
	backgroundColorInput.onclick = function(){
		var changeBackground = new CustomEvent('changeBackground',{'detail':backgroundColorInput.value});
		// console.log(backgroundColor.value);
		container.dispatchEvent(changeBackground);
	}
	clearBackgroundColor.onclick = function(){
		var clearBackground = new CustomEvent('clearBackground',{});
		// console.log(backgroundColor.value);
		container.dispatchEvent(clearBackground);
	}

	this.init();
}