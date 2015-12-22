function ChangeHeightWidth(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var changeWidth = document.createElement('input');
		var label = document.createTextNode('Size');
		parentElements.appendChild(label);
		changeWidth.setAttribute('type','number');
		changeWidth.setAttribute('class','tools change-position');
		parentElement.appendChild(changeWidth);
		changeWidth.onchange = function(){
				var changewidth =new CustomEvent('changeWidth',{'detail':this.value});
				container.dispatchEvent(changewidth);
			};
		var changeHeight = document.createElement('input');
		changeHeight.setAttribute('type','number');
		changeHeight.setAttribute('class','tools change-position');
		parentElement.appendChild(changeHeight);
		changeHeight.onchange = function(){
				var changeheight =new CustomEvent('changeHeight',{'detail':this.value});
				container.dispatchEvent(changeheight);
			};
	}
	this.init();

}