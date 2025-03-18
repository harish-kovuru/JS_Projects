const pickColor = document.getElementById('color-picker');
const pickBgColor = document.getElementById('bg-color');
const pickFontSize = document.getElementById('font-size');
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');
const retrieveButton = document.getElementById('retrieve');
const ctx = canvas.getContext('2d');

pickColor.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});



canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});


canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

pickBgColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,600);
    
});

pickFontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});


clearButton.addEventListener('click', () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('quick-sign', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'quick-sign.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    let dataURL = localStorage.getItem('quick-sign');
    if(dataURL){
        let img = new Image();
        img.src = dataURL;
        ctx.drawImage(img, 0, 0);
    }
});
