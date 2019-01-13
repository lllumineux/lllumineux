/*
c - canvas
ctx - canvas's context
img - image for canvas

abl - all background layers
fbl - first background layer
sbl - second background layer
tbl - third background layer
fntl - font layer
fltrl - filter layer
*/

var maxWidth = 500;
var maxHeight = 500;
var maxSize = 500;
var backgroundID = ''
var filterID = ''
var fontID = ''

/* Choice of background template */
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

/* Setting of background template */
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
};

function updateBackgroundLayer(canvasID){
	hueRotate = $('#' + canvasID + '-hue')[0].value;
	brightness = $('#abl-brightness')[0].value;

	eval(canvasID + '_ctx').filter = "hue-rotate(" + hueRotate + "deg)" + "brightness(" + brightness + "%)";
	eval(canvasID + '_ctx').clearRect(0, 0, eval(canvasID + '_c').width, eval(canvasID + '_c').height);
	eval(canvasID + '_ctx').drawImage(eval(canvasID + '_img'), 0, 0);
};

/* Choice of font template */
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

	if ($('#fntl-color')[0].value != ''){
		color = $('#fntl-color')[0].value;
	};
	if ($('#fntl-shadow-x')[0].value != ''){
		shadowX = $('#fntl-shadow-x')[0].value;
	};
	if ($('#fntl-shadow-y')[0].value != ''){
		shadowY = $('#fntl-shadow-y')[0].value;
	};
	if ($('#fntl-shadow-radius')[0].value != ''){
		shadowRadius = $('#fntl-shadow-radius')[0].value;
	};
	if ($('#fntl-shadow-opacity')[0].value != ''){
		shadowOpacity = $('#fntl-shadow-opacity')[0].value;
	};

	shadowOpacity = String(shadowOpacity / 100);
	
	if (fontID != ''){
		while (fntl_ctx.measureText(text).width >= maxWidth || size >= maxHeight) {
	        size--;
	        fntl_ctx.font = size + 'px ' + fontID;
	    };

		fntl_ctx.clearRect(0, 0, fntl_c.width, fntl_c.height);
		fntl_ctx.textAlign = "center";
	    fntl_ctx.font = size + 'px ' + fontID;
	    fntl_ctx.fillStyle = color;
	    fntl_ctx.fillText(text, 500, 500 + size / 4);
	};
	
	fntl_ctx.filter = 'opacity(' + opacity + '%)' + 'drop-shadow(' + shadowX + 'px ' + shadowY + 'px ' + shadowRadius + 'px rgba(0, 0, 0, ' + shadowOpacity + '))';
};

/* Choice of filter template */
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

/* Setting of filter template */
function updateFilter(){
	hueRotate = $('#fltrl-hue')[0].value;
	brightness = $('#fltrl-brightness')[0].value;
	opacity = $('#fltrl-opacity')[0].value;
	if (fltrl_ctx){
		fltrl_ctx.filter = "hue-rotate(" + hueRotate + "deg)" + "brightness(" + brightness + "%)" + "opacity(" + opacity + "%)";
		fltrl_ctx.clearRect(0, 0, fltrl_c.width, fltrl_c.height);
		fltrl_ctx.drawImage(fltrl_img, 0, 0);
	}
};