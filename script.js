import { DateTime } from 'https://cdn.skypack.dev/luxon'

const picker = datepicker(".text-dob", {id: age}); //this line create a  date picker for input field
const button = document.getElementById('btn-calculate');
const calResult = document.getElementById('result');
button.addEventListener('click', calculate);

function calculate(e) {
    e.preventDefault();
    let personAge = document.querySelector(".text-dob").value;
    
    if(!personAge) {
        calResult.innerHTML = '<p>Please enter your age</p>';
        return;
    }

    let dateObj = DateTime.fromJSDate(new Date(personAge));
    
    if(!dateObj.isValid) {
        calResult.innerHTML = '<p>Please enter a valid date</p>';
        setTimeout(() => {
            calResult.innerHTML = '', 3000;
        })
        return;
    }

    const now = DateTime.now();
    if(dateObj.year > now.year || dateObj.year == now.year && dateObj.month > now.month ||
        dateObj.year == now.year && dateObj.month === now.month && dateObj.day > now.day
    ){
        calResult.innerHTML = '<p>Please enter a date in the past</p>';
        setTimeout(() => {
            calResult.innerHTML = '';
        }, 3000);
        return;
    }

    const {years, months } = DateTime.now().diff(dateObj, ['years', 'months']).toObject();
    calResult.innerHTML = `You are ${Math.floor(years)} years and ${Math.floor(months)} months old`;
    return;
}


