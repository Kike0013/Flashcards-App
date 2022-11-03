const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const saveEditBtn = document.getElementById("save-update")
const closeBtn = document.getElementById("close")
let nodeBtn = flashcards.childNodes;
let contentArray = localStorage.getItem('fcards') ? JSON.parse(localStorage.getItem('fcards')) : [];
let editMode = false;
let currentId = 0;

contentArray.forEach(divMaker);

function divMaker(text) {
    let div = document.createElement("div");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let h2_question = document.createElement("h2");
    let h2_answer = document.createElement("h2");

    div.id = text.id;
    div.className = 'flashcard';

    editBtn.id = 'edit-card'
    editBtn.innerHTML = 'Edit';
    editBtn.setAttribute('style', "display: none; float: left; padding: 5px; margin: 2px")

    deleteBtn.id = 'delete-card'
    deleteBtn.innerHTML = 'X';
    deleteBtn.setAttribute('style', "display: none; float: right; padding: 5px; margin: 2px")

    h2_question.id = 'id-question';
    h2_question.innerHTML = text.my_question;
    h2_question.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top: 30px;")

    h2_answer.id = 'id-answer';
    h2_answer.innerHTML = text.my_answer;
    h2_answer.setAttribute('style', "text-align: center; display: none; color: red; padding-left: 8px; padding-right: 8px;")

    div.appendChild(editBtn)
    div.appendChild(deleteBtn)
    div.appendChild(h2_question)
    div.appendChild(h2_answer)

    //Show/hide answer
    div.addEventListener("click", function () {
        if (editMode == true) {
            h2_answer.style.display = "block";
        }
        else {
            if (h2_answer.style.display == "none")
                h2_answer.style.display = "block";
            else
                h2_answer.style.display = "none";
        }
    })

    //Edit Flashcard
    editBtn.addEventListener('click', () => {
        currentId = div.id;
        question.value = h2_question.textContent
        answer.value = h2_answer.textContent
    })

    //Delete Flashcard
    deleteBtn.addEventListener('click', () => {
        contentArray.map(el => {
            if (el.id == div.id) {
                contentArray = contentArray.filter(x => x != el);
            }
        })

        localStorage.setItem('fcards', JSON.stringify(contentArray));
        div.remove();
    })

    flashcards.appendChild(div);
}

function addFlashcard() {
    if (editMode == false) {
        let flashcard_info = {
            id: Date.now(),
            my_question: question.value,
            my_answer: answer.value
        }

        contentArray.push(flashcard_info)
        localStorage.setItem('fcards', JSON.stringify(contentArray));
        divMaker(contentArray[contentArray.length - 1]);
        question.value = '';
        answer.value = '';
    } else {
        contentArray.map(el => {
            if (el.id == currentId) {
                el.my_question = question.value;
                el.my_answer = answer.value;
            }
        })

        nodeBtn.forEach(node => {
            if (node.id == currentId) {
                node.childNodes.forEach(x => {
                    if (x.id == 'id-question') {
                        x.textContent = question.value;
                    }
                    if (x.id == 'id-answer') {
                        x.textContent = answer.value;
                    }
                })
            }
        })

        localStorage.setItem('fcards', JSON.stringify(contentArray));

        question.value = '';
        answer.value = '';

        currentId = 0;
    }
}

function editFlashcards() {
    showCreateCardBox();
    if (editMode) {
        editMode = false
        closeBtn.removeAttribute("disabled")
        saveEditBtn.innerText = 'Save'
        question.value = '';
        answer.value = '';
        currentId = 0;
    } else {
        editMode = true;
        closeBtn.setAttribute("disabled", "")
        saveEditBtn.innerText = 'Update'
        question.value = '';
        answer.value = '';
        currentId = 0;
    }

    nodeBtn.forEach(el => {
        el.childNodes.forEach(x => {
            if (x.id == 'edit-card') {
                x.style.display == 'none' ? x.style.display = 'block' : x.style.display = 'none'
            }
            if (x.id == 'delete-card') {
                x.style.display == 'none' ? x.style.display = 'block' : x.style.display = 'none'
            }
            if (editMode == true && x.id == 'id-answer') {
                x.style.display = 'block'
            }
            if (editMode == false && x.id == 'id-answer') {
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

const delFlashcards = () => {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

const generateSampleData = () => {
    fetch('./sampleData.json')
        .then(res => res.json())
        .then(json => {for (const elem of json) {
            divMaker(elem);
        }})
}