function ChangeSize(parentElements,container){
	var parentElement = parentElements;
	// var container = container;
	var changeWidth = document.createElement('input');
	var changeHeight = document.createElement('input');

	this.init = function(){
		
		var label = document.createTextNode('Size : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);
		parentElements.appendChild(document.createElement('br'));
		changeWidth.setAttribute('type','number');
		changeWidth.setAttribute('class','tools change-position ');
		parentElements.appendChild(document.createTextNode('--Width : '));

		parentElement.appendChild(changeWidth);
		changeWidth.onclick = function(){
			var changewidth =new CustomEvent('changeWidth',{'detail':this.value});
			container.dispatchEvent(changewidth);
		};
		changeHeight.setAttribute('type','number');
		changeHeight.setAttribute('class','tools change-position ');
		parentElements.appendChild(document.createTextNode('Height : '));

		parentElement.appendChild(changeHeight);
		parentElement.appendChild(document.createElement('div'));
		changeHeight.onclick = function(){
			var changeheight =new CustomEvent('changeHeight',{'detail':this.value});
			container.dispatchEvent(changeheight);
		};
	}
	this.setWidth = function(width){
		changeWidth.value = parseInt(width);
	}
	this.setHeight = function(height){
		changeHeight.value = parseInt(height);
	}
	this.init();
}