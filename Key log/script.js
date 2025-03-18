const log = document.getElementById("log");
const state = document.getElementById("state");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

startButton.addEventListener("click", () => {
    document.addEventListener("keydown",handledown );
    document.addEventListener("keyup",handleup );
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener("click", () => {
    document.removeEventListener("keydown",handledown );
    document.removeEventListener("keyup",handleup );
    log.textContent = '';
    state.textContent = '';
    startButton.disabled = false;
    stopButton.disabled = true;
});

function handledown(event){
    log.textContent = `Key ${event.key} pressed down`;
    state.textContent = 'key logger is down';
}
function handleup(event){
    log.textContent = `key ${event.key} pressed up`;
    state.textContent = 'key logger up';
}
