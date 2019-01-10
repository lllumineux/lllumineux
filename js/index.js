/*
c - canvas
ctx - canvas's context
img - image for canvas

fbl - first background layer
sbl - second background layer
tbl - third background layer
fntl - font layer
*/

bg_name = '0'
font_name = '0'
filter_name = '0'

fbl_c = $('#first-bg-layer')[0];
fbl_ctx = fbl_c.getContext('2d');
fbl_img = new Image();
fbl_img.src = '../templates/backgrounds/' + bg_name + '/first_layer.png';
fbl_img.addEventListener('load', () => {
	fbl_ctx.drawImage(fbl_img, 0, 0);
});

sbl_c = $('#first-bg-layer')[0];
sbl_ctx = sbl_c.getContext('2d');
sbl_img = new Image();
sbl_img.src = '../templates/backgrounds/' + bg_name + '/second_layer.png';
sbl_img.addEventListener('load', () => {
	sbl_ctx.drawImage(sbl_img, 0, 0);
});

tbl_c = $('#first-bg-layer')[0];
tbl_ctx = tbl_c.getContext('2d');
tbl_img = new Image();
tbl_img.src = '../templates/backgrounds/' + bg_name + '/third_layer.png';
tbl_img.addEventListener('load', () => {
	tbl_ctx.drawImage(tbl_img, 0, 0);
});

fntl_c = $('#font-layer')[0];
fntl_ctx = fntl_c.getContext('2d');
fntl_img = new Image();
fntl_img.src = '../templates/fonts/' + font_name + '/preview.png';
fntl_img.addEventListener('load', () => {
	fntl_ctx.drawImage(fntl_img, 0, 0);
});

fltrl_c = $('#filter-layer')[0];
fltrl_ctx = fltrl_c.getContext('2d');
fltrl_img = new Image();
fltrl_img.src = '../templates/filters/' + filter_name + '/filter.png';
fltrl_img.addEventListener('load', () => {
	fltrl_ctx.drawImage(fltrl_img, 0, 0);
});