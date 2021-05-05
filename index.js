const inputGroup = document.querySelector('.cycle');
const cycleSwitch = document.querySelector('#cycle-switch');

function formEndCycle() {
    if (cycleSwitch.value === 'end') {
       let div = document.createElement('DIV');
       div.classList.add('form-group');
       
       let lable = document.createElement('LABEL');
       lable.setAttribute('for', 'restWater');
       lable.textContent = 'Rest of water'

       let input = document.createElement('INPUT');
       input.setAttribute('type', 'number');
       input.setAttribute('id', 'restWater');
       input.setAttribute('placeholder', 'The rest of water in pallet in L');
        
       div.appendChild(lable);
       div.appendChild(input);
        
       inputGroup.insertBefore(div, inputGroup.lastElementChild);
    }
}

cycleSwitch.addEventListener('change', ()=> {
    formEndCycle();
});
formEndCycle();