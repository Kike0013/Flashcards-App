const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question")
const answer = document.getElementById("answer")
let nodeBtn = flashcards.childNodes;
let contentArray = localStorage.getItem('fcards') ? JSON.parse(localStorage.getItem('fcards')) : [];
let editMode = false;

const delFlashcards = () => {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

contentArray.forEach(divMaker);
function divMaker(text) {
    let div = document.createElement("div");
    let h2_question = document.createElement("h2");
    let h2_answer = document.createElement("h2");

    //Edit card button code
    let editBtn = document.createElement("button");
    editBtn.innerHTML = 'Edit';
    editBtn.id = 'edit-card'
    editBtn.setAttribute('style', "display: none; position: absolute; padding: 5px; margin: 2px")
    div.appendChild(editBtn)

    //^^^^^^^^^^^^^^^^^^^

    div.className = 'flashcard';

    h2_question.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top: 30px;")
    h2_question.innerHTML = text.my_question;

    h2_answer.setAttribute('style', "text-align: center; display: none; color: red;")
    h2_answer.innerHTML = text.my_answer;
    h2_answer.id = 'id-answer';

    div.appendChild(h2_question)
    div.appendChild(h2_answer)

    div.addEventListener("click", function () {
        if (editMode == true)
            h2_answer.style.display = "block";
        else {
            if (h2_answer.style.display == "none")
                h2_answer.style.display = "block";
            else
                h2_answer.style.display = "none";
        }
    })

    flashcards.appendChild(div);
}

function addFlashcard() {
    let flashcard_info = {
        my_question: question.value,
        my_answer: answer.value
    }

    contentArray.push(flashcard_info)
    localStorage.setItem('fcards', JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length - 1]);
    question.value = '';
    answer.value = '';
}

function editFlashcards() {
    editMode ? editMode = false : editMode = true;
    console.log(editMode);

    nodeBtn.forEach(el => {
        el.childNodes.forEach(x => {
            if (x.id == 'edit-card') {
                x.style.display == 'none' ? x.style.display = 'block' : x.style.display = 'none'
            }
            if (editMode == true && x.id == 'id-answer') {
                x.style.display = 'block'
            }
            if (editMode == false && x.id == 'id-answer'){
                x.style.display = 'none'
            }
        });
    })
}

function showCreateCardBox() {
    createBox.style.display = "block"
}

function hideCreateBox() {
    createBox.style.display = "none"
}