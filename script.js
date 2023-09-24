const range = document.getElementById('range')
const num = document.getElementById('num')
const themeBtn = document.querySelector('.theme_btn')
const bucketName = document.querySelector('.bucket-name')
const addInputBtn = document.querySelector('.add-input')
const wrapper = document.querySelector('.wrapper')
const inputTxt = document.querySelectorAll('input[type=text]')
const inputRadio = document.querySelectorAll('input[type=radio]')
const options = document.querySelectorAll('.option')

const imgOne = document.querySelector('#img1')
const imgTwo = document.querySelector('#img2')


///open close localStorage options
const arrow1 = document.querySelector('.arrow1')
const local_storage = document.querySelector('.local_storage')

///change color
const inputColor = document.querySelector('input[type=color]')
///localStorage

const deleteBuckets = document.querySelector('#delete')
const saveBuckets = document.querySelector('#save')

// set the theme state
const setDark = () => {
    document.body.classList.remove("light",'light_theme')
    localStorage.setItem('dark', true)
}
const removeDark = () => {
    document.body.classList.add('light', 'light_theme')
    localStorage.setItem('dark', false)
}

localStorage.getItem('dark') == 'true' ? setDark() : removeDark()

///change theme : sun
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

    if (value >= 40) bucketName.style.width = '380px'
    else if (value >= 30) bucketName.style.width = '340px'
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
const addInput = (value) => {
    let input = document.createElement('input')

    input.placeholder = "bucket name"
    input.value = value

    input.addEventListener('focus', (e) => e.target.select())
    wrapper.appendChild(input)

    addInputBtn.animate({
        transform: "rotate(90deg)"
    }, {
        duration: 300, iterations: 1
    })

}

addInputBtn.addEventListener('click', () => addInput(''))

///////////// load buckets from local storage

localStorage.getItem('buckets') ? (
    JSON.parse(localStorage.getItem('buckets')).forEach(bucket => {
        addInput(bucket)
    })

) : console.log('nothing found')

///delete buckets
deleteBuckets.addEventListener('click', () => {
    let buckets = localStorage.getItem('buckets')
    let deleteBtn = confirm('Delete buckets from local Storrage!!')

    if (deleteBtn) {

        if (buckets) {

            localStorage.removeItem('buckets')
            window.location.reload()

        }
    }
})


///save buckets

saveBuckets.addEventListener('click', () => {
    let myBuckets = Array.from(wrapper.querySelectorAll('input'), elem => elem.value)
    let saveBtn = confirm('save buckets to local Storrage!!')

    if (saveBtn) {
        localStorage.setItem('buckets', JSON.stringify(myBuckets))
    }
})

const imgs1 = ["img.jpg", "img0.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.png", "img6.jpeg", "img6.jpg"]
const imgs2 = ["img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg"]

imgOne.setAttribute('src', `./imgs/${imgs1[Math.floor(Math.random() * imgs1.length)]}`)
imgTwo.setAttribute('src', `./imgs/${imgs2[Math.floor(Math.random() * imgs2.length)]}`)



///  display buckets*


arrow1.addEventListener("click", () => {
    arrow1.classList.contains('arrow1_close') ?
        (
            arrow1.classList.remove('arrow1_close'),
            local_storage.classList.remove('show_local_storage'),
            local_storage.style.zIndex = -1
        )
        :
        (
            arrow1.classList.add('arrow1_close'),
            local_storage.classList.add('show_local_storage'),
            setTimeout(() => local_storage.style.zIndex = 0, 500)

        )
})

console.clear()
///change color

inputColor.addEventListener('change', e =>  document.querySelector('body').style.setProperty("--ui_blue",e.target.value)   )  