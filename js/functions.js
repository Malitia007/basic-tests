const fizzBuzzBtn = document.getElementById('fizz-buzz-btn');
const cheapLetterBtn = document.getElementById('cheap-letter-btn');
const fibDigitsBtn = document.getElementById('fib-digits-btn');

const fizzUntilN = document.getElementById('fizz-until-n');
const  cheapLetter = document.getElementById('cheap-letter');
const fibUntilN = document.getElementById('fib-digits-n');

const content = document.getElementById('content');

if (fizzBuzzBtn) fizzBuzzBtn.addEventListener('click',(e)=>fizzBuzzGenerator());
if (cheapLetterBtn) cheapLetterBtn.addEventListener('click',(e)=>cheapLetterDeletion());
if (fibDigitsBtn) fibDigitsBtn.addEventListener('click',(e)=>fibDigits());

cheapLetter.addEventListener('input', (e) => onLetterChange(e))

let costLetters = [];


const fizzBuzzGenerator = ()=> {
    if(!fizzUntilN.value) {
        alert('Please specify the N value');
        return
    }

    // Clear previous results
    content.innerHTML = '';

    let powerOf2 = 1;

    for (let i=1; i<=fizzUntilN.value; i++) {
        const p = document.createElement('p');
        if  (i == powerOf2) {
            p.textContent = 'POWER';
            powerOf2 = powerOf2*2;
        } else {
            p.textContent = i.toString();
        }
        content.appendChild(p);
    }
}

const onLetterChange = (ev)=>{
    costLetters=[]
    content.innerHTML = '';
    const letter= ev.target.value
    //auto assign letters cost with random values - until 30
    for (let i=0; i<letter.length; i++) {
        const spanCostLabel = document.createElement('span');
        costLetters.push(Math.floor(Math.random()*30));
        spanCostLabel.innerText = `Cost[${i}]=${costLetters[i]}`;
        spanCostLabel.style.margin='5px';
        spanCostLabel.style.display='inline-block';
        content.append(spanCostLabel)
    }
}

const cheapLetterDeletion = () => {
    if(!cheapLetter.value) {
        alert('Please specify the letter content');
        return
    }

    let letter=cheapLetter.value

    let totalLetterCost = 0

    for (let i = 1; i < letter.length; i++) {
        if (letter[i] === letter[i - 1]) {
            if (costLetters[i] < costLetters[i - 1]) {
                totalLetterCost += costLetters[i];
                costLetters[i] = costLetters[i - 1];
            } else {
                totalLetterCost += costLetters[i - 1];
            }
        }
    }
    const result = document.createElement('p');
    result.innerHTML = 'Reduced cost:' + totalLetterCost.toString();
    content.append(result);

}

const fibDigits = () => {
    if(!fibUntilN.value) {
        alert('Please specify the N value');
        return
    }

    content.innerHTML = '';

    const n = fibUntilN.value;
    let results = -1;

    if (n===0) results = 0;
    if (n===1) results = 1;

    let n1 = 0;
    let n2 = 1

    for (let i = 2; i <= n; i++) {
        let next = digitSum(n1) + digitSum(n2);
        n1 = n2;
        n2 = next;
    }

    results = n2;
    if (results === -1) results = 'err'
    content.append(results.toString());
}

function digitSum(n) {
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}