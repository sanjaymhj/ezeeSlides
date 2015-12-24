function SlideBackgroundColor(topTools,container){
	var slidebackgroundColor = document.createElement('div');
	var slidebackgroundColorInput = document.createElement('input');
	var slideclearBackgroundColor = document.createElement('div');
	slidebackgroundColor.style['display'] = 'inline-block';
	slideclearBackgroundColor.style['width'] = '25px';
	slideclearBackgroundColor.style['height'] = '25px';
	slidebackgroundColorInput.setAttribute('class','controls');
	slidebackgroundColorInput.setAttribute('type','color');
	slideclearBackgroundColor.appendChild(document.createTextNode('C'));
	
	this.init = function(){
		slidebackgroundColor.appendChild(slidebackgroundColorInput);
		slidebackgroundColor.appendChild(slideclearBackgroundColor);

		topTools.appendChild(slidebackgroundColor);
	}

	slidebackgroundColorInput.onchange = function(){
		var slidechangeBackground = new CustomEvent('slidechangeBackground',{'detail':slidebackgroundColorInput.value});
		// console.log(slidebackgroundColor.value);
		console.log("change inside the class");
		container.dispatchEvent(slidechangeBackground);
	}
	
	slideclearBackgroundColor.onclick = function(){
		var slideclearBackground = new CustomEvent('slideclearBackground',{});
		console.log("clear clicked");
		container.dispatchEvent(slideclearBackground);
	}

	this.init();
}