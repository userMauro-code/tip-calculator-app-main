
const inputBill = document.getElementById('bill');
const inputPeople = document.getElementById('people');
const buttonsDesc = document.querySelectorAll('.btn_grid .btn');
const inputCustom = document.querySelector('.btn_ctm');
const amount = document.getElementById('amount');
const total = document.getElementById('total');
const btnReset = document.getElementById('reset');
const alertError = document.querySelector('.error');

let bill = 0;
let tip = 0;
let people = 1;

const money = (n) => `$${n.toFixed(2)}`;

function showError (){
    alertError.style.display= 'block';
    inputPeople.classList.add('has-error');
    amount.textContent = '$0.00';
    total.textContent = '$0.00';
}

function hideError () {
    alertError.style.display= 'none';
    inputPeople.classList.remove('has-error');
}

function recalc () {
    if (!people || people <= 0) {
        showError();
        btnReset.disabled = false;
        return;
    }
    hideError();

    const tipTotal = bill * tip;
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;

    amount.textContent = money(tipPerPerson);
    total.textContent = money(totalPerPerson);

    btnReset.disabled = (bill === 0 && tip === 0 && people === 1)
};

inputBill.addEventListener('input', () => {
    bill = Number(inputBill.value) || 0;
    recalc();
});

inputPeople.addEventListener('input', ()=> {
    people = Number(inputPeople.value) || 0;
    recalc();
});

function clearActiveButtons () {
    buttonsDesc.forEach(b => b.classList.remove('btn--active'));
}

buttonsDesc.forEach(btn => {
    btn.addEventListener('click', () => {
        clearActiveButtons();
        btn.classList.add('btn--active');
        inputCustom.value = '';

        const percent = parseFloat(btn.textContent);
        tip =(isNaN(percent) ? 0 : percent /100);

        recalc();
    });
});

inputCustom.addEventListener('input', () => {
    clearActiveButtons();

    const percent = Number(inputCustom.value) || 0;
    tip = percent / 100;
    recalc();
});

btnReset.addEventListener('click', () => {
    inputBill.value = '';
    inputPeople.value = '';
    inputCustom.value = '';
    clearActiveButtons();

    bill = 0;
    tip = 0;
    people = 0;

    amount.textContent = '$0.00';
    total.textContent = '$0.00';

    hideError();
    btnReset.disabled = true;
})

