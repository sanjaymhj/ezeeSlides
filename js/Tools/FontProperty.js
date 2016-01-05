function FontSize(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	var changeFont = document.createElement('input');

	this.init = function(){
		var label = document.createTextNode('Text-Size : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);
		changeFont.setAttribute('type','number');
		changeFont.setAttribute('class','tools fontsize');
		parentElement.appendChild(changeFont);
		changeFont.onclick = function(){
			var size = this.value/16*100;
			var changefont = new CustomEvent('changeFont',{'detail':size});
			container.dispatchEvent(changefont);
		};
	}
	this.setSize = function(size){
		changeFont.value = parseInt(size)/100*16;
	}
	this.init();
}

function FontFamily(parentElements,container){
	var fontFamily = ['Arial','Times New Roman','Papyrus','Consolas','Comic Sans MS','Chiller','Impact'];
	var parentElement = parentElements;
	var container = container;
	var changeFontFamily = document.createElement('select');

	this.init = function(){
		var label = document.createTextNode('Font : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);
		for(var i=0;i<fontFamily.length;i++){
			var font = document.createTextNode(fontFamily[i]);
			var opt = document.createElement('option');
			opt.appendChild(font);
			opt.style['font-family']=fontFamily[i];
			changeFontFamily.appendChild(opt);		
		}
		changeFontFamily.setAttribute('class','tools');
		parentElement.appendChild(changeFontFamily);
		parentElement.appendChild(document.createElement('div'));

		changeFontFamily.onclick = function(){
			var font = this.value;
			var changefontstyle = new CustomEvent('changefontstyle',{'detail':font});
			container.dispatchEvent(changefontstyle);
		};
	}
	this.setFont = function(font){
		changeFontFamily.value = font;
	}
	this.init();
}


function Bold(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var bold = document.createElement('div');
		var text = document.createTextNode('B');
		bold.setAttribute('class',"btn-sm");
		bold.appendChild(text);

		bold.style['display']='inline-block';
		bold.style['font-weight']='bold';
		parentElement.appendChild(bold);
		bold.onclick = function(){
			var bold = new CustomEvent('bold',{});
			container.dispatchEvent(bold);
		};
	}
	this.init();
}

function Italics(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var italics = document.createElement('div');
		italics.setAttribute('class',"btn-sm");
		var text = document.createTextNode('i');
		italics.appendChild(text);
		italics.style['display']='inline-block';
		italics.style['font-style']='italic';
		parentElement.appendChild(italics);
		italics.onclick = function(){
			var ital = new CustomEvent('italics',{});
			container.dispatchEvent(ital);
		};
	}
	this.init();
}

function Underline(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		var underline = document.createElement('div');
		underline.setAttribute('class',"btn-sm");
		var text = document.createTextNode('U');
		underline.appendChild(text);
		underline.style['display']='inline-block';
		underline.style['text-decoration']='underline';
		parentElement.appendChild(underline);
		underline.onclick = function(){
			var underLine = new CustomEvent('underline',{});
			container.dispatchEvent(underLine);
		};
	}
	this.init();
}

function TextAlign(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	this.init = function(){
		parentElements.appendChild(document.createTextNode('Text-Alignment : '));
		var leftAligndiv = document.createElement('div');
		leftAligndiv.setAttribute('class',"btn-sm left-align");

		leftAligndiv.style['display']='inline-block';

		parentElement.appendChild(leftAligndiv);
		leftAligndiv.onclick = function(){
			var leftAlign = new CustomEvent('textAlign',{'detail':'left'});
			container.dispatchEvent(leftAlign);
		};

		var rightAligndiv = document.createElement('div');
		rightAligndiv.setAttribute('class',"btn-sm right-align");
		rightAligndiv.style['display']='inline-block';
		parentElement.appendChild(rightAligndiv);
		rightAligndiv.onclick = function(){
			var rightAlign = new CustomEvent('textAlign',{'detail':'right'});
			container.dispatchEvent(rightAlign);
		}

		var centerAligndiv = document.createElement('div');
		centerAligndiv.setAttribute('class',"btn-sm center-align");
		centerAligndiv.style['display']='inline-block';
		parentElement.appendChild(centerAligndiv);
		centerAligndiv.onclick = function(){
			var centerAlign = new CustomEvent('textAlign',{'detail':'center'});
			container.dispatchEvent(centerAlign);
		}

		var justifiedAligndiv = document.createElement('div');
		justifiedAligndiv.setAttribute('class',"btn-sm justified-align");
		justifiedAligndiv.style['display']='inline-block';
		parentElement.appendChild(justifiedAligndiv);
		parentElement.appendChild(document.createElement('div'));

		justifiedAligndiv.onclick = function(){
			var justifiedAlign = new CustomEvent('textAlign',{'detail':'justified'});
			container.dispatchEvent(justifiedAlign);
		}
}
	this.init();
}

function FontColor(parentElements,container){
	var parentElement = parentElements;
	var container = container;
	var fontColor = document.createElement('input');

	this.init = function(){
		fontColor.setAttribute('class','btn-sm');
		fontColor.setAttribute('type','color');
		fontColor.style['display']='inline-block';
		var label = document.createTextNode('Text Color : ');
		var bold = document.createElement('b');
		bold.appendChild(label);
		parentElements.appendChild(bold);
		parentElement.appendChild(fontColor);
		parentElement.appendChild(document.createElement('div'));

		fontColor.onclick = function(){
			var fontcolor = new CustomEvent('fontColor',{'detail':fontColor.value});
			container.dispatchEvent(fontcolor);
		};
		fontColor.onchange = function(){
			var fontcolor = new CustomEvent('fontColor',{'detail':fontColor.value});
			container.dispatchEvent(fontcolor);
		};
	}
	this.setColor = function(color){
		fontColor.value = color;
	}
	this.init();
}