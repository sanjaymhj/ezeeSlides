function TextBox(topTools,container){
	var createTextBox = document.createElement('div');
	createTextBox.setAttribute('class','btn-md');

	var text = document.createTextNode('New Text');
	createTextBox.appendChild(text);

	this.init = function(){
		topTools.appendChild(createTextBox);
		createTextBox.onclick = function(){
			var createText = new CustomEvent('createText',{'detail':''});
			container.dispatchEvent(createText);
		}
	}
	this.init();
}