
// API: https://restcountries.eu/

const output = document.querySelector('.output');
const userInput = document.querySelector('.userInput');
const guessbBtn = document.querySelector('.guess-btn');
const resultImg = document.querySelector('.result-img');
const answer = document.querySelector('.answer');
const nextBtn = document.querySelector('.next-btn');

let coutryArray = [];
let randomCountry;

window.onload = loadCountry();

async function loadCountry(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();

    coutryArray.push(...data);
   
    getRandomCountry();
}

// addeventlistner
userInput.addEventListener('keypress', function(e){
if(e.key === 'Enter'){
guess();
}
});
guessbBtn.addEventListener('click', guess);
nextBtn.addEventListener('click', getRandomCountry);

function getRandomCountry(){
    nextBtn.classList.remove('showNextBtn');
    
    let r = coutryArray[Math.floor(Math.random()*coutryArray.length)];

    randomCountry = r;

    output.innerHTML = '<img src ="' + randomCountry.flag+ '">';
    resultImg.innerHTML = '';
    answer.innerHTML = '?';
    document.querySelector('.error').classList.remove('showError');
}

function guess(){
    let g = userInput.value.toLowerCase();
    let r = randomCountry.name.toLowerCase();

    if(userInput.value == ''){
        document.querySelector('.error').classList.add('showError');
        return;
    }
    if(g == r){
        document.querySelector('.error').classList.remove('showError');
            resultImg.innerHTML = '<img src="images/check128.png" alt="correct">'; 
        }else{
            document.querySelector('.error').classList.remove('showError');
            resultImg.innerHTML = '<img src="images/close128.png" alt="wrong">';
        }
        answer.innerHTML = randomCountry.name;
        userInput.value = "";
        nextBtn.classList.add('showNextBtn');
}

