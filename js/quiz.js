const questions = [
    {
        question: "What is a popular method for students to earn money while sharing their knowledge?",
        answers: [
            {text: "Dog walking", correct: "false"},
            {text: "Tutoring", correct: "true"},
            {text: "Food delivery", correct: "false"},
            {text: "Retail jobs", correct: "false"},
        ]
    },
    {
        question: "Which platform is designed to offer freelance services in various areas like writing, design, and programming?",
        answers: [
            {text: "Facebook", correct: "false"},
            {text: "LinkedIn", correct: "false"},
            {text: "Fiverr", correct: "true"},
            {text: "Indeed", correct: "false"},
        ]
    },
    {
        question: "What type of job allows students to create content remotely for blogs, websites, or publications?",
        answers: [
            {text: "Retail jobs", correct: "false"},
            {text: "Internships", correct: "false"},
            {text: "Freelance writing", correct: "true"},
            {text: "Delivery driver", correct: "false"},
        ]
    },
    {
        question: "Which industry often offers part-time jobs suitable for students in cafes, restaurants, or stores?",
        answers: [
            {text: "Hospitality", correct: "true"},
            {text: "IT", correct: "false"},
            {text: "Finance", correct: "false"},
            {text: "Healthcare", correct: "false"},
        ]
    },
    {
        question: "What is a flexible way for students to earn income by providing administrative support or managing social media for businesses?",
        answers: [
            {text: "Web development", correct: "false"},
            {text: "Virtual assistance", correct: "true"},
            {text: "Graphic design", correct: "false"},
            {text: "Fitness instructor", correct: "false"},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn-quiz");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else {selectBtn.classList.add("incorrect");}
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 5!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {showScore();}
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{startQuiz();}
});


startQuiz();