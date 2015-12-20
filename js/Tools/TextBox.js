function TextBox(topTools,container){
	var createTextBox = document.createElement('div');
	createTextBox.setAttribute('class','btn-sm');

	var text = document.createTextNode('T');
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