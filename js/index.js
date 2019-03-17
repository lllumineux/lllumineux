/*
c - canvas
ctx - canvas's context
img - image for canvas
res - image made from canvas

abl - all background layers
fbl - first background layer
sbl - second background layer
tbl - third background layer
fntl - font layer
fltrl - filter layer
res - all canvases in one
*/

// Choice of background template 
const fbl_c = $('#fbl')[0];
const fbl_ctx = fbl_c.getContext('2d');
const fbl_img = new Image();

const sbl_c = $('#sbl')[0];
const sbl_ctx = sbl_c.getContext('2d');
const sbl_img = new Image();

const tbl_c = $('#tbl')[0];
const tbl_ctx = tbl_c.getContext('2d');
const tbl_img = new Image();

function changeBackgroundID(){
	fbl_img.src = '../templates/backgrounds/' + backgroundID + '/first_layer.png';
	fbl_img.addEventListener('load', () => {
		if (fbl_ctx){
			fbl_ctx.clearRect(0, 0, fbl_c.width, fbl_c.height);
		};
		fbl_ctx.drawImage(fbl_img, 0, 0);
	});

	sbl_img.src = '../templates/backgrounds/' + backgroundID + '/second_layer.png';
	sbl_img.addEventListener('load', () => {
		if (sbl_ctx){
			sbl_ctx.clearRect(0, 0, sbl_c.width, sbl_c.height);
		};
		sbl_ctx.drawImage(sbl_img, 0, 0);
	});

	tbl_img.src = '../templates/backgrounds/' + backgroundID + '/third_layer.png';
	tbl_img.addEventListener('load', () => {
		if (tbl_ctx){
			tbl_ctx.clearRect(0, 0, tbl_c.width, tbl_c.height);
		};
		tbl_ctx.drawImage(tbl_img, 0, 0);
	});
};

// Setting of background template 
function updateBackground(obj){
	canvasID = obj.id.split('-').slice(0, 1);

	if (canvasID != 'abl'){
		ctx = eval(canvasID + '_ctx');
		if (ctx){
			updateBackgroundLayer(canvasID);
		};
	}
	else{
		for (i in [0, 1, 2]){
			canvasID = ['fbl', 'sbl', 'tbl'][i];
			ctx = eval(canvasID + '_ctx');
			if (ctx){
				updateBackgroundLayer(canvasID);
			};
		};
	};
	updateValueShower(obj.id);
};

function updateBackgroundLayer(canvasID){
	hueRotate = $('#' + canvasID + '-hue')[0].value;
	brightness = $('#abl-brightness')[0].value;

	eval(canvasID + '_ctx').filter = 'hue-rotate(' + hueRotate + 'deg)' + 'brightness(' + brightness + '%)';
	eval(canvasID + '_ctx').clearRect(0, 0, eval(canvasID + '_c').width, eval(canvasID + '_c').height);
	eval(canvasID + '_ctx').drawImage(eval(canvasID + '_img'), 0, 0);
};

// Choice of font template 
const fntl_c = $('#fntl')[0];
const fntl_ctx = fntl_c.getContext('2d');

function updateFont(){
	text = $('#fntl-text')[0].value;
	size = maxSize;
	color = '#fff';
	opacity = $('#fntl-opacity')[0].value;
	shadowX = '0';
	shadowY = '0';
	shadowRadius = '0';
	shadowOpacity = '0';
	textX = 0;
	textY = 0;

	if ($('#fntl-color')[0].value[0] == '#'){
		color = $('#fntl-color')[0].value;
	}
	else{
		color = '#fff';
		$('#fntl-color')[0].value = '';
	};
	if ($('#fntl-shadow-x')[0].value != ''){
		shadowX = $('#fntl-shadow-x')[0].value;
		$('#fntl-shadow-x')[0].value = $('#fntl-shadow-x')[0].value;
	};
	if ($('#fntl-shadow-y')[0].value != ''){
		shadowY = $('#fntl-shadow-y')[0].value;
		$('#fntl-shadow-y')[0].value = $('#fntl-shadow-y')[0].value;
	};
	if ($('#fntl-shadow-radius')[0].value != ''){
		shadowRadius = $('#fntl-shadow-radius')[0].value;
		$('#fntl-shadow-radius')[0].value = $('#fntl-shadow-radius')[0].value;
	};
	if ($('#fntl-shadow-opacity')[0].value != ''){
		shadowOpacity = $('#fntl-shadow-opacity')[0].value;
		$('#fntl-shadow-opacity')[0].value = $('#fntl-shadow-opacity')[0].value;
	};
	if ($('#fntl-x')[0].value != ''){
		if ($('#fntl-x')[0].value == '-') {
			textX = 0
		}
		else {
			textX = parseInt($('#fntl-x')[0].value);
			$('#fntl-x')[0].value = $('#fntl-x')[0].value;
		}
	}
	else{
		textX = 0;
		$('#fntl-x')[0].value = '';
	};
	if ($('#fntl-y')[0].value != ''){
		if ($('#fntl-y')[0].value == '-') {
			textY = 0
		}
		else {
			textY = parseInt($('#fntl-y')[0].value.);
			$('#fntl-y')[0].value = $('#fntl-y')[0].value;
		}
	}
	else{
		textY = 0;
		$('#fntl-y')[0].value = '';
	};

	shadowOpacity = String(shadowOpacity / 100);
	
	if (fontID != ''){
		while (fntl_ctx.measureText(text).width >= maxWidth || size >= maxHeight) {
	        size--;
	        fntl_ctx.font = size + 'px ' + fontID;
	    };

		fntl_ctx.clearRect(0, 0, fntl_c.width, fntl_c.height);
		fntl_ctx.textAlign = "center";
	    fntl_ctx.font = size + size_changed + 'px ' + fontID;
	    fntl_ctx.fillStyle = color;
	    fntl_ctx.fillText(text, 500 + textX, 500 + size / fontCoef - textY);
	};
	
	fntl_ctx.filter = 'opacity(' + opacity + '%)' + 'drop-shadow(' + shadowX + 'px ' + shadowY + 'px ' + shadowRadius + 'px rgba(0, 0, 0, ' + shadowOpacity + '))';
	delDefContent();
};

// Choice of filter template 
const fltrl_c = $('#fltrl')[0];
const fltrl_ctx = fltrl_c.getContext('2d');
const fltrl_img = new Image();

function changeFilterID(){
	fltrl_img.src = '../templates/filters/' + filterID + '/filter.png';
	fltrl_img.addEventListener('load', () => {
		fltrl_ctx.drawImage(fltrl_img, 0, 0);
	});
	updateFilter();
};

// Setting of filter template 
function updateFilter(){
	hueRotate = $('#fltrl-hue')[0].value;
	brightness = $('#fltrl-brightness')[0].value;
	opacity = $('#fltrl-opacity')[0].value;
	if (fltrl_ctx){
		fltrl_ctx.filter = 'hue-rotate(' + hueRotate + 'deg)' + 'brightness(' + brightness + '%)' + 'opacity(' + opacity + '%)';
		fltrl_ctx.clearRect(0, 0, fltrl_c.width, fltrl_c.height);
		fltrl_ctx.drawImage(fltrl_img, 0, 0);
	};
	updateValueShower('fltrl-hue');
	updateValueShower('fltrl-brightness');
	updateValueShower('fltrl-opacity');
};

// Saving result 
const res_c = document.createElement('canvas');
res_c.setAttribute('width', '1000px');
res_c.setAttribute('height', '1000px');
const res_ctx = res_c.getContext('2d');
const res_img = new Image();

function saveCurrentPicture() {
	res_ctx.clearRect(0, 0, res_c.width, res_c.height);
	fbl_res = getImage(fbl_c);
	fbl_res.addEventListener('load', () => {
		res_ctx.drawImage(fbl_res, 0, 0);

		sbl_res = getImage(sbl_c);
		sbl_res.addEventListener('load', () => {
			res_ctx.drawImage(sbl_res, 0, 0);

			tbl_res = getImage(tbl_c);
			tbl_res.addEventListener('load', () => {
				res_ctx.drawImage(tbl_res, 0, 0);

				fntl_res = getImage(fntl_c);
				fntl_res.addEventListener('load', () => {
					res_ctx.drawImage(fntl_res, 0, 0);


					fltrl_res = getImage(fltrl_c);
					fltrl_res.addEventListener('load', () => {
						res_ctx.drawImage(fltrl_res, 0, 0);

						downloadImage = getImage(res_c);
						downloadImage.addEventListener('load', () => {
							link = document.createElement('a');
							link.setAttribute('href', downloadImage.src);
							link.setAttribute('download', 'lllumineux');
							link.click();
						});
					});
				});
			});
		});
	});
	
};

function getImage(canvas) {
  imageData = canvas.toDataURL();
  image = new Image();
  image.src = imageData;
  return image;
};

// Reset buttons 
function resetValue(obj) {
	$('#' + obj.id.replace('-reset', ''))[0].value = $('#' + obj.id.replace('-reset', ''))[0].getAttribute('data-default-value');
	eval($('#' + obj.id.replace('-reset', ''))[0].getAttribute('onmousemove').replace('this', '$("#" + obj.id.replace("-reset", ""))[0]'));
};

// Value showers 
function updateValueShower(name) {
	$('#' + name + '-shower')[0].innerHTML = $('#' + name)[0].value;
};

// Color picker form
function showColorPicker() {
	$('.index-overlay').css({'width': $('.index')[0].clientWidth + 'px', 'height': $('.index')[0].clientHeight + 'px'});
	$('.index-overlay').css({'z-index': '1', 'opacity': '0.5', 'overflow': 'hidden'});
	$('.color-picker-layer').css({'z-index': '2', 'opacity': '1', 'overflow': 'hidden'});
	$('html').css({'overflow': 'hidden'});
	$('#fntl-color').blur();
}

function hideColorPicker() {
	$('.index-overlay').css({'z-index': '-1', 'opacity': '0'});
	$('.color-picker-layer').css({'z-index': '-1', 'opacity': '0'})
	$('html').css({'overflow-y': 'auto'});
}

// Outline function 
bgChosen = '';
filterChosen = '';
fontChosen = '';

function addOutline(obj, slide) {
	if (slide == 'bg' && bgChosen != '') {
		$('#' + bgChosen.id).css({'outline': '0 solid #fff', 'outline-offset': '0'});
	}
	if (slide == 'filter' && filterChosen != '') {
		$('#' + filterChosen.id).css({'outline': '0 solid #fff', 'outline-offset': '0'});
	}
	if (slide == 'font' && fontChosen != '') {
		$('#' + fontChosen.id).css({'outline': '0 solid #fff', 'outline-offset': '0'});
	};

	$(obj).css({'outline': '4px solid #fff', 'outline-offset': '-4px'});

	if (slide == 'bg') {
		bgChosen = obj;
		showSaveButton();
	}
	if (slide == 'filter') {
		filterChosen = obj;
		showSaveButton();
	}
	if (slide == 'font') {
		fontChosen = obj;
	};
};

// Delete default content 'lll' 
function delDefContent() {
	if ($('#fntl-text')[0].value != '' && fontChosen != '') {
		$('.short-title')[0].innerHTML = '';
		showSaveButton();
	}
	else {
		$('.short-title')[0].innerHTML = 'lll';
		if (bgChosen == '' && filterChosen == '' && (fontChosen == '' || $('#fntl-text')[0].value == '')){
			hideSaveButton();
		};
	};
};

// Show/hide save button
function showSaveButton() {
	$('.save-icon').css({'display': 'block'});
};
function hideSaveButton() {
	$('.save-icon').css({'display': 'none'});
};