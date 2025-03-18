const typingText = document.querySelector(".typing-text p")
const inputField = document.querySelector(".input-field")
const resultDetails = document.querySelector(".result-details")
const tryAgainBtn = document.querySelector(".content button")
const time = document.querySelector(".time span")
const mistake = document.querySelector(".mistake span")
const wpm = document.querySelector(".wpm span")
const cpm = document.querySelector(".cpm span")

let timer, maxTime = 60, timeLeft = maxTime, charIndex = 0, mistakes = 0, isTyping = false;

function loadParagraph() {
    const paragraphs = [
        "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to display font samples and test keyboards.",
        "In the bustling city, life moves at an incredible pace. People rush to and fro, each with their own destination and purpose. The streets are alive with energy, day and night.",
        "Space exploration has always captured human imagination. From the first moon landing to modern Mars missions, we continue to push the boundaries of what's possible in the cosmos.",
        "The art of cooking brings people together. Sharing a meal is one of the most fundamental ways humans bond and create lasting memories. Every culture has its unique culinary traditions.",
        "Technology continues to reshape our daily lives. From smartphones to artificial intelligence, these innovations have changed how we work, communicate, and interact with the world.",
        "Nature has an incredible way of adapting to change. Plants and animals evolve over time to survive in different environments, showcasing the remarkable resilience of life on Earth."
    ];
    
    // Get random paragraph from the array
    const randomIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = '';
    for(const char of paragraphs[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => inputField.focus()); 
    typingText.addEventListener('click', () => inputField.focus());
}
//handle user input
function initTyping(){
    const characters = typingText.querySelectorAll('span');
    const typedChar = inputField.value.charAt(charIndex);
    if(charIndex < characters.length - 1 && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.remove('incorrect');
            characters[charIndex].classList.add('correct');
            console.log('correct');
        }else{
            characters[charIndex].classList.remove('correct');
            characters[charIndex].classList.add('incorrect');
            mistakes++;
        }
        charIndex++;
    characters[charIndex].classList.add('active');
    mistake.innerText = mistakes;
    cpm.innerText = charIndex-mistakes;
    }
    else{ clearInterval(timer);
        inputField.value = '';
        isTyping = false; }
};

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmval = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm.innerText = wpmval;
    }else{
        clearInterval(timer);
    }
}
function resetGame(){
    loadParagraph();
    inputField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    wpm.innerText = 0;
    mistake.innerText = 0;
    cpm.innerText = 0;
    time.innerText = maxTime;
}
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);
loadParagraph();




