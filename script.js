const range = document.getElementById('range')
const num = document.getElementById('num')
const themeBtn = document.querySelector('.theme')
const bucketName = document.querySelector('.bucket-name')
const addInputBtn = document.querySelector('.add-input')
const wrapper = document.querySelector('.wrapper')
const inputTxt = document.querySelectorAll('input[type=text]')
const inputRadio = document.querySelectorAll('input[type=radio]')
const options = document.querySelectorAll('.option')

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
    document.body.classList.contains('light') ? setDark() : removeDark()
})


///set the bucket name only numbers or merged with other chars


const optionsFade = (bNameType) => {
    if (bNameType === 'merged') {
        options.forEach(option => {
            option.classList.remove('only_numbers')
            Array.from(option.querySelectorAll('input'), i => i.disabled = false)
        })
    }
    else if (bNameType === 'only_numbers') {
        options.forEach(option => {
            option.classList.add('only_numbers')
            Array.from(option.querySelectorAll('input'), i => i.disabled = true)
        })
    }
}


const setBucketNameType = () => {
    let bNameType = localStorage.getItem('b_name')

    if (bNameType === null) {
        return
    }
    else if (bNameType === 'merged') {
        inputRadio[1].checked = true
        optionsFade('merged')
    }
    else if (bNameType === 'only_numbers') {
        inputRadio[0].checked = true
        optionsFade('only_numbers')
    }
}

setBucketNameType()

inputRadio.forEach(input => input.addEventListener('change', e => {
    localStorage.setItem('b_name', e.target.id)
    setBucketNameType()
}))

inputTxt.forEach(input => input.addEventListener('focus', (e) => e.target.select()))

range.addEventListener('change', numvalue)
num.addEventListener('change', numvalue)

//atach the range with the numeric input
function numvalue(v) {
    const value = v.target.value
    range.value = value
    num.value = value

    if (value >= 30) bucketName.style.width = '360px'
    else if (value >= 20) bucketName.style.width = '280px'

}

const form = document.getElementById('form')

range.value = 20
num.value = 20

const upper = document.getElementById('upper')
const number = document.getElementById('number')

const lower_case_code = ArrayFromLowToHigh(97, 122) //ascii
const upper_case_code = ArrayFromLowToHigh(65, 90) // the range of upper case characters in decimal
const number_char_code = ArrayFromLowToHigh(48, 57)

//when click the button
form.addEventListener('submit', a => {
    a.preventDefault() // remove the default behavior of submit btn

    const charAmount = range.value
    const includeUpper = upper.checked
    const includeNumber = number.checked

    const name = generateName(charAmount, includeUpper, includeNumber) // call the function
    bucketName.value = name      //set the value
})

//return an array based on the low and high values of the specified decimal range
function ArrayFromLowToHigh(low, high) {
    const array = []

    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

//main function
function generateName(characterAmount, UpperCase, Numbers) {

    let charCode = lower_case_code // declare an array charCode = lower_case_code array ,  default are lower case characters
    if (UpperCase) charCode = charCode.concat(upper_case_code) // if checked add the upper case characters
    if (Numbers) charCode = charCode.concat(number_char_code)

    const name = [] // empty array

    for (let i = 0; i < characterAmount; i++) { //characterAmount the value of the range or numeric input

        const character = charCode[Math.floor(Math.random() * charCode.length)] // random number times the length of the array charCode

        name.push(String.fromCharCode(character)) // add the character converted to the equivalent ascii code to the name array
    }
    return name.join('') // convert array to string
}

/// add new input to save bucket name
const addInput = () => {
    let input = document.createElement('input')

    input.placeholder = "bucket name"
    input.addEventListener('focus', (e) => e.target.select())
    wrapper.appendChild(input)
}

addInputBtn.addEventListener('click', addInput)