const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const saveEditBtn = document.getElementById("save-update")
let nodeBtn = flashcards.childNodes;
let contentArray = localStorage.getItem('fcards') ? JSON.parse(localStorage.getItem('fcards')) : [];
let editMode = false;
let currentId = 0;

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
    editBtn.setAttribute('style', "display: none; float: left; padding: 5px; margin: 2px")
    div.appendChild(editBtn)

    editBtn.addEventListener('click', () => {
        question.value = h2_question.textContent
        answer.value = h2_answer.textContent
        currentId = div.id;
    })

    //^^^^^^^^^^^^^^^^^^^

    //Delete card button code
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = 'X';
    deleteBtn.id = 'delete-card'
    deleteBtn.setAttribute('style', "display: none; float: right; padding: 5px; margin: 2px")
    div.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        contentArray.map(el => {
            if (el.id == div.id) {
                contentArray = contentArray.filter(x => x != el);
            }
        })

        localStorage.setItem('fcards', JSON.stringify(contentArray));
        div.remove();
    })

    //^^^^^^^^^^^^^^^^^^^

    div.className = 'flashcard';
    div.id = text.id;

    h2_question.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top: 30px;")
    h2_question.innerHTML = text.my_question;
    h2_question.id = 'id-question';

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
        console.log('Update, modo edit.');

        contentArray.map(el => {
            if (el.id == currentId) {
                el.my_question = question.value;
                el.my_answer = answer.value;
            }
        })


        nodeBtn.forEach(node => {
            node.childNodes.forEach(x => {
                if (x.parentNode.id == currentId) {
                    console.log(x.parentNode);
                }
            })
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
        saveEditBtn.innerText = 'Save'
        question.value = '';
        answer.value = '';
        currentId = 0;
    } else {
        editMode = true;
        saveEditBtn.innerText = 'Update'
        question.value = '';
        answer.value = '';
        currentId = 0;
    }

    console.log(editMode);


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