const range = document.getElementById('range')
const num = document.getElementById('num')
const themeBtn = document.querySelector('.theme')
const bucketName = document.querySelector('.bucket-name')
const addInputBtn = document.querySelector('.add-input')
const wrapper = document.querySelector('.wrapper')
const inputTxt = document.querySelectorAll('input[type=text]')

// set the theme state
const setDark = () => {
    document.body.classList.remove("light")
    localStorage.setItem('dark', true)
}
const removeDark = () => {
    document.body.classList.add('light')
    localStorage.setItem('dark', false)
}

localStorage.getItem('dark') == 'true' ? setDark() : removeDark()

themeBtn.addEventListener('click', () => {
    document.body.classList.contains('light') ? setDark():removeDark()
})

inputTxt.forEach(input => input.addEventListener('focus', (e) => e.target.select()))

range.addEventListener('input', numvalue)
num.addEventListener('input', numvalue)
//atach the range with the numeric input
function numvalue(v) {
    const value = v.target.value
    range.value = value
    num.value = value
}

const form = document.getElementById('form') // get the element form
range.value = 4
num.value = 4
const upper = document.getElementById('upper')
const number = document.getElementById('number')
const sumbol = document.getElementById('sumbol')


const lower_case_code = ArrayFromLowToHigh(97, 122) //ascii
const upper_case_code = ArrayFromLowToHigh(65, 90) // the range of upper case characters in decimal
const number_char_code = ArrayFromLowToHigh(48, 57)
const symbol_char_code = ArrayFromLowToHigh(33, 47).concat(ArrayFromLowToHigh(58, 63))
    .concat(ArrayFromLowToHigh(91, 96)).concat(ArrayFromLowToHigh(123, 126)) // the range of symbol characters in decimal

//when click the button
form.addEventListener('submit', a => {
    a.preventDefault() // remove the default behavior

    const charAmount = range.value
    const includeUpper = upper.checked
    const includeNumber = number.checked
    const includeSumbol = sumbol.checked

    const name = generatepass(charAmount, includeUpper, includeNumber, includeSumbol) // call the function
    bucketName.value = name      //set the value
})
//return an array based on the low and high value
function ArrayFromLowToHigh(low, high) {
    const array = [] // empty array
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

//main function
function generatepass(characterAmount, UpperCase, Numbers, Symbols) {

    let charCode = lower_case_code // declare an array charCode = lower_case_code array ,  default are lower case characters
    if (UpperCase) charCode = charCode.concat(upper_case_code) // if checked add the upper case characters
    if (Numbers) charCode = charCode.concat(number_char_code)
    if (Symbols) charCode = charCode.concat(symbol_char_code)

    const pass = [] // empty array

    for (let i = 0; i < characterAmount; i++) { //characterAmount the value of the range or numeric input

        const character = charCode[Math.floor(Math.random() * charCode.length)] // random number times the length of the array charCode

        pass.push(String.fromCharCode(character)) // add the character converted to the equivalent ascii code to the pass array
    }
    return pass.join('') //wrapped the pass with a ' quote mark to become a valid string

}

/// add new input to save bucket name here
const addInput = () => {
    let input = document.createElement('input')

    input.placeholder = "save bucket name here"
    input.addEventListener('focus', (e) => e.target.select())
    wrapper.appendChild(input)
}

addInputBtn.addEventListener('click', addInput)

const selectOnFocus = () => {
    input.addEventListener('focus', (e) => e.target.select())
}