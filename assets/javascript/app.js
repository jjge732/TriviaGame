let count = 0;
let correct = 0;
let incorrect = 0;
let timeouts = 0;
let status;

let questionSet = [{
    question: 'What is the capital of Illinois?',
    answerSet: [ 'Springfield', 'Chicago', 'Naperville', 'Champaign'],
    name: 'cities',
},
{
    question: 'Which president appears on Illinois Licence Plates?',
    answerSet: ['Abraham Lincoln', 'John Adams', 'Barack Obama', 'Thomas Jefferson'],
    name: 'presidents',
},
{
    question: 'What is the name of the fourth book in the Harry Potter series?',
    answerSet: ['The Goblet of Fire', 'The Half-Blood Prince', 'The Order of the Phoenix', 'The Prisoner of Azkaban'],
    name: 'books',
},
{
    question: 'What is the name of the protagonist of the Hunger Games Series?',
    answerSet: ['Katniss Everdeen', 'Primm Everdeen', 'Peeta Melark', 'Hermoine Grainger'],
    name: 'fiction',
}]

// const insertQuestion = (radio, label, i) => {
//         radio.attr('name', questionSet[count].name);
//         radio.attr('id', `radio${i}`);
//         radio.val(i);
//         label.html(questionSet[count].answerSet[i]);
// }

// const checkAnswer = () => {
//     if ($('#radio0').prop('checked', true)) {
//         correct++;
//     }
//     if ($('#radio1').prop('checked', true) || $('#radio2').prop('checked', true) || $('#radio3').prop('checked', true)) {
//         incorrect++;
//     }
//     else {
//         timeouts++;
//     }    
// }

const createMainContent = () => {
    let prompt = $('<h2>').html(questionSet[count].question);
    let answerOption1 = $('<div>').html(questionSet[count].answerSet[0]);
    answerOption1.attr('class', 'clickable');
    answerOption1.attr('data-correct', 'true');
    let answerOption2 = $('<div>').html(questionSet[count].answerSet[1]);
    answerOption2.attr('class', 'clickable');
    answerOption2.attr('data-correct', 'false');
    let answerOption3 = $('<div>').html(questionSet[count].answerSet[2]);
    answerOption3.attr('class', 'clickable'); 
    answerOption3.attr('data-correct', 'false');
    let answerOption4 = $('<div>').html(questionSet[count].answerSet[3]);
    answerOption4.attr('class', 'clickable');
    answerOption4.attr('data-correct', 'false');
    $('main').html(prompt);
    $('main').append(answerOption1, answerOption2, answerOption3, answerOption4);

}

// const createForm = () => {
//     let newDiv = $('<div>');
//     let newButton = $('<button type="submit" form="question">Next Question!</button>');
//     //let newButton = $('<button id="submit">Next Question!</button>');
//     let newForm = $('<form id="question">').html(questionSet[count].question + '<br>');
//     for (let i = 0; i < 4; i++) {
//         let createRadioInput = $('<input>').attr('type', 'radio');
//         let newLabel = $('<label>');
//         insertQuestion(createRadioInput, newLabel, i);
//         newForm.append(createRadioInput);
//         newForm.append(newLabel);
//         newForm.append($('<br>'));
//         newForm.attr('onsubmit', 'checkAnswer()');
//         newDiv.append(newForm);
//     }
//     $('main').html(newDiv);
//     $('main').append(newButton);
// }

const nextQuestion = () => {
    if (count < questionSet.length) {
        timeouts++; //add timeouts every time; will subtract if submit is pressed
        $('main').html('<h2>Please wait for the next question to load</h2>');
        setTimeout(function() {
        //createForm();
        createMainContent();
        status = setTimeout(nextQuestion, 10000);
        count++;
    }, 3000)
    }
    else {
        $('main').html($('<div>').html(`Number of questions answered correctly = ${correct}`));
        $('main').append($('<div>').html(`Number of questions answered incorrectly = ${incorrect}`));
        $('main').append($('<div>').html(`Number of questions unanswered = ${timeouts}`));
    }
}

$(document).on('click', '#submit', function() {
    //checkAnswer();
    clearTimeout(status);
    // timeouts--;
    nextQuestion();
})

$(document).on('click', '.clickable', function() {
    clearTimeout(status);
    console.log($(this).attr('data-correct'));
    if ($(this).attr('data-correct') === 'true') {
        correct++;
    }
    else {
        incorrect++;
    }
    timeouts--; //decrease timeouts if it does not occur to balance out addition earlier
    nextQuestion();
})