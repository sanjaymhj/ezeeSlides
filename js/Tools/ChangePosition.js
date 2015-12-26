function ChangePosition(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var label = document.createTextNode('Position : ');
		parentElements.appendChild(label);
		var changePositionX = document.createElement('input');
		changePositionX.setAttribute('type','number');
		changePositionX.setAttribute('class','tools change-position');
		parentElement.appendChild(changePositionX);
		changePositionX.onclick = function(){
				var changePosX = new CustomEvent('changePositionX',{'detail':this.value});
				container.dispatchEvent(changePosX);
			};
		var changePositionY = document.createElement('input');
		changePositionY.setAttribute('type','number');
		changePositionY.setAttribute('class','tools change-position')
		parentElement.appendChild(changePositionY);
		parentElement.appendChild(document.createElement('div'));

		changePositionY.onclick = function(){
				var changePosY = new CustomEvent('changePositionY',{'detail':this.value});
				container.dispatchEvent(changePosY);
			};
	}
	this.init();

}