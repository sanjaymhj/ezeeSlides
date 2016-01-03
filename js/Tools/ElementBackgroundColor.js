function ElementBackgroundColor(topTools,container){
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
		backgroundColor.appendChild(document.createElement('div'));
		backgroundColor.appendChild(backgroundColorInput);
		backgroundColor.appendChild(clearBackgroundColor);

		topTools.appendChild(backgroundColor); 
		topTools.appendChild(document.createElement('div'));

	}

	this.setElementBackgroundColor = function(color){
		backgroundColorInput.value = color;
	}

	backgroundColorInput.onclick = function(){
		var changeBackground = new CustomEvent('changeBackground',{'detail':backgroundColorInput.value});
		container.dispatchEvent(changeBackground);
	}
	backgroundColorInput.onchange = function(){
		var changeBackground = new CustomEvent('changeBackground',{'detail':backgroundColorInput.value});
		container.dispatchEvent(changeBackground);
	}
	clearBackgroundColor.onclick = function(){
		var clearBackground = new CustomEvent('clearBackground',{});
		container.dispatchEvent(clearBackground);
	}

	this.init();
}