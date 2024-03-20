const fullscreenButton = document.getElementById("fullscreenButton");
const orderInput = document.getElementById("order");
const generateButton = document.getElementById("generate");
const hint = document.getElementById("hint");
const hintNumber = document.querySelector("#hint span");
const labelsComplexityRadioButtons = document.querySelectorAll("#complexity-level label")



labelsComplexityRadioButtons.forEach(label => {
    label.onfocus = (event) =>
        event.target.querySelector(".inner").style.setProperty("--change-opacity", "1")
    label.onblur = (event) =>
        event.target.querySelector(".inner").style.setProperty("--change-opacity", "0")
    label.onclick = () => { COMPLEXITY_TYPE = label.children[0].value }
})

// Change text at generate button
orderInput.onmousedown = () => {
    if (generateButton.innerHTML !== "Створити")
        changeTextInGenerateButton("Створити")
}

function showHint(max) {
    hintNumber.innerHTML = max;
    hint.style.display = "block";
}

function changeTextInGenerateButton(text, fontSize = "0.9em") {
    if (text === "Створити") {
        generateButton.innerHTML = text
        generateButton.style.width = 350 + "px"
        generateButton.style.fontSize = "1.2em"
        generateButton.style.margin = "0 25px"
        setTimeout(() => generateButton.style.width = 156 + "px", 0)

    } else {
        generateButton.innerHTML = text
        generateButton.style.width = 156 + "px"
        generateButton.style.fontSize = fontSize
        generateButton.style.margin = "0 5px"
        setTimeout(() => generateButton.style.width = 298/*298*/ + "px", 0)

        
    }
}

function clickOnInput(event) {

    if (event.button === 0 || event.type === 'touchstart') {
        const checkButton = document.getElementById("check")
        checkButton.classList.add("cta-primary")
        checkButton.classList.remove("wrong")
        checkButton.classList.remove("correct")
        checkButton.setAttribute("onclick", "check()")
        checkButton.innerHTML = "Перевірити"
        
    }
}