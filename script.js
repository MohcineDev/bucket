const range = document.getElementById('range')
const num = document.getElementById('num')
const themeBtn = document.querySelector('.theme_btn')
const bucketName = document.querySelector('.bucket-name')
const addInputBtn = document.querySelector('.add-input')
const wrapper = document.querySelector('.wrapper')
const inputTxt = document.querySelectorAll('input[type=text]')
const inputRadio = document.querySelectorAll('input[type=radio]')
const options = document.querySelectorAll('.option')


///localStorage

const deleteBuckets = document.querySelector('#delete')
const saveBuckets = document.querySelector('#save')

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
        localStorage.setItem('b_name', 'merged')

        options.forEach(option => {
            option.classList.remove('only_numbers')
            Array.from(option.querySelectorAll('input'), i => i.disabled = false)
        })
    }
    else if (bNameType === 'only_numbers') {
        localStorage.setItem('b_name', 'only_numbers')

        options.forEach(option => {
            option.classList.add('only_numbers')
            Array.from(option.querySelectorAll('input'), i => i.disabled = true)
        })
    }
}


// radio btn input event listener 
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
const lower = document.getElementById('lower')

const lower_case_code = ArrayFromLowToHigh(97, 122) //ascii
const upper_case_code = ArrayFromLowToHigh(65, 90) // the range of upper case characters in decimal
const number_char_code = ArrayFromLowToHigh(48, 57) // numbers range

//when click the button
form.addEventListener('submit', a => {
    a.preventDefault() // remove the default behavior of submit btn

    const charAmount = range.value
    const includeUpper = upper.checked ? upper.checked : null
    const includeLower = lower.checked ? lower.checked : null

    const name = generateName(charAmount, includeLower, includeUpper) // call the function
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
function generateName(characterAmount, LowerCase, UpperCase) {
    Number

    let charCode = number_char_code // declare an array charCode = number_char_code array ,  default are numbers
    if (LowerCase) charCode = charCode.concat(lower_case_code)
    if (UpperCase) charCode = charCode.concat(upper_case_code) // if checked add the upper case characters

    const name = [] // empty array

    for (let i = 0; i < characterAmount; i++) { //characterAmount the value of the range or numeric input

        const character = charCode[Math.floor(Math.random() * charCode.length)] // random number times the length of the array charCode

        name.push(String.fromCharCode(character)) // add the character converted to the equivalent ascii code to the name array
    }
    return name.join('') // convert array to string
}

/// add new input to save bucket name
const addInput = (e) => {
    let input = document.createElement('input')

    input.placeholder = "bucket name"
    input.addEventListener('focus', (e) => e.target.select())
    wrapper.appendChild(input)

    addInputBtn.animate({
        transform: "rotate(90deg)"
    }, {
        duration: 300, iterations: 1
    })

}

addInputBtn.addEventListener('click', addInput)


