function ChangePosition(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	var changePositionX = document.createElement('input');
	var changePositionY = document.createElement('input');

	this.init = function(){
		var label = document.createTextNode('Position : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);

		changePositionX.setAttribute('type','number');
		changePositionX.setAttribute('class','tools change-position');
		parentElements.appendChild(document.createElement('br'));
		parentElements.appendChild(document.createTextNode('From Left : '));
		parentElement.appendChild(changePositionX);
		changePositionX.onclick = function(){
			var changePosX = new CustomEvent('changePositionX',{'detail':this.value});
			container.dispatchEvent(changePosX);
		};

		changePositionY.setAttribute('type','number');
		changePositionY.setAttribute('class','tools change-position')
		parentElements.appendChild(document.createTextNode('From Top : '));
		
		parentElement.appendChild(changePositionY);
		parentElement.appendChild(document.createElement('div'));

		changePositionY.onclick = function(){
			var changePosY = new CustomEvent('changePositionY',{'detail':this.value});
			container.dispatchEvent(changePosY);
		};
	}
	this.setTop = function(top){
		changePositionY.value = parseInt(top);
	}

	this.setLeft = function(left){
		changePositionX.value = parseInt(left);
	}
	this.init();
}