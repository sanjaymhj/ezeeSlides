function BackgroundColor(topTools,container){
	var backgroundColor = document.createElement('div');
	var backgroundColorInput = document.createElement('input');
	var clearBackgroundColor = document.createElement('div');
	backgroundColor.style['display'] = 'inline-block';
	clearBackgroundColor.style['width'] = '50px';
	clearBackgroundColor.style['height'] = '50px';
	backgroundColorInput.setAttribute('class','controls');
	backgroundColorInput.setAttribute('type','color');
	clearBackgroundColor.appendChild(document.createTextNode('C'));
	this.init = function(){
		backgroundColor.appendChild(backgroundColorInput);
		backgroundColor.appendChild(clearBackgroundColor);


		topTools.appendChild(backgroundColor);
	}
	backgroundColorInput.onchange = function(){
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