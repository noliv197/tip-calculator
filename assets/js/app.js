
// Components
const outputTipComponent = document.querySelector('#tip-amount')
const outputTotalComponent = document.querySelector('#total')
const warningTextComponent = document.querySelector('.warning-text')
const radioGroup = document.querySelectorAll('input[type=radio]')
const customInput = document.querySelector('#custom')
const numberOfPeopleInput = document.querySelector('#qnt-people')
const billInput = document.querySelector('#billTotal')
const resetButton = document.querySelector('#reset')

// Values
let radioGroupList = [...radioGroup]

const values = {
    outputTip: 0,
    outputTotal: 0,
    bill: billInput.value ? Number(billInput.value) : 0,
    qntPeople: numberOfPeopleInput.value ? Number(numberOfPeopleInput.value) : 1,
    percentage: getCheckedValue(),
    tipAmount: 0
}

// Events
billInput.addEventListener('change', event => {
    values.bill = Number(event.target.value)
    calculate()
})

numberOfPeopleInput.addEventListener('change', event => {
    console.log(event.target.value)
    if(event.target.value === '0') {
        showWarning(true)
    } else {
        showWarning(false)

        values.qntPeople = Number(event.target.value)
        calculate()
    }
})

customInput.addEventListener('change', event => {
    values.percentage = event.target.value
    resetCheckbox()
    calculate()
})

resetButton.addEventListener('click', () => {
    clearAll();
})

radioGroupList.forEach(checkbox => checkbox.addEventListener('click', event => {
    values.percentage = Number(event.target.value)

    if(customInput !== '') resetCustom()
    calculate()
}))

// Functions
function calculateTip(total, percentage, qntPeople){
    return Number(((total * (percentage / 100) / qntPeople)).toFixed(2))
}

function totalByPerson(total, qntPeople, tipAmount){
    return ((total / qntPeople) + tipAmount).toFixed(2)
}

function calculate(){
    values.tipAmount = calculateTip(values.bill, values.percentage, values.qntPeople)
    outputTipComponent.value = values.tipAmount
    outputTotalComponent.value = totalByPerson(values.bill, values.qntPeople, values.tipAmount)
}

function getCheckedValue(){
    return radioGroupList.find(checkbok => checkbok.checked).value
}

function resetCheckbox(){
    radioGroupList.forEach(checkbok => checkbok.checked = false)
}

function resetCustom(){
    customInput.value = ''
}

function clearAll(){
    billInput.value = ''
    numberOfPeopleInput.value = ''
    customInput.value = ''
    outputTotalComponent.value = 0
    outputTipComponent.value = 0
    values.outputTip = 0
    values.outputTotal = 0
    values.bill = 0
    values.qntPeople = 1
    values.percentage = 15
    values.tipAmount = 0
}

function showWarning(state){
    if(state){
        numberOfPeopleInput.classList.add('warning')
        warningTextComponent.classList.remove('invisible')
        warningTextComponent.classList.add('visible')
    } else {
        numberOfPeopleInput.classList.remove('warning')
        warningTextComponent.classList.remove('visible')
        warningTextComponent.classList.add('invisible')
    }
}