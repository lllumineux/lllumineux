c = $('#bg-picture__content')[0];
ctx = c.getContext('2d');
img = new Image();
img.src = '../img/index/bg_preview/bg.png';
img.addEventListener('load', () => {
	ctx.drawImage(img, 0, 0);
});