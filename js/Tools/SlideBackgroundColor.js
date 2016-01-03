function SlideBackgroundColor(topTools,container){
	var slidebackgroundColor = document.createElement('div');
	var slidebackgroundColorInput = document.createElement('input');
	var slideclearBackgroundColor = document.createElement('div');
	slidebackgroundColor.style['display'] = 'inline-block';
	slideclearBackgroundColor.setAttribute('class','btn-md');
	slideclearBackgroundColor.style['margin'] = '5px';
	slideclearBackgroundColor.style['height'] = '25px';
	slidebackgroundColorInput.setAttribute('type','color');
	slideclearBackgroundColor.appendChild(document.createTextNode('Clear'));
	
	this.init = function(){
		slidebackgroundColor.appendChild(slidebackgroundColorInput);
		slidebackgroundColor.appendChild(slideclearBackgroundColor);
		topTools.appendChild(slidebackgroundColor);
		topTools.appendChild(document.createElement('div'));
	}
	this.setSlideBackground = function(color){
		slidebackgroundColorInput.value = color;
	}

	slidebackgroundColorInput.onclick = function(){
		var slidechangeBackground = new CustomEvent('slidechangeBackground',{'detail':slidebackgroundColorInput.value});
		container.dispatchEvent(slidechangeBackground);
	}
	slidebackgroundColorInput.onchange = function(){
		var slidechangeBackground = new CustomEvent('slidechangeBackground',{'detail':slidebackgroundColorInput.value});
		container.dispatchEvent(slidechangeBackground);
	}
	
	slideclearBackgroundColor.onclick = function(){
		var slideclearBackground = new CustomEvent('slideclearBackground',{});
		container.dispatchEvent(slideclearBackground);
	}

	this.init();
}