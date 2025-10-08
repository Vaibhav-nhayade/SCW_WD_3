const quizData = [
  {
    type: "single",
    question: "Which company originally developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
    correct: ["Sun Microsystems"]
  },
  {
    type: "multi",
    question: "Which of the following are valid Java data types?",
    options: ["int", "String", "float", "number"],
    correct: ["int", "String", "float"]
  },
  {
    type: "fill",
    question: "Fill in the blank: The entry point for any Java program is the ______ method.",
    correct: ["main"]
  },
  {
    type: "single",
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implement", "extends", "inherits", "super"],
    correct: ["extends"]
  },
  {
    type: "multi",
    question: "Which of the following are Java access modifiers?",
    options: ["public", "private", "protected", "external"],
    correct: ["public", "private", "protected"]
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.classList.add("option");
      label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
      optionsEl.appendChild(label);
    });
  } 
  else if (q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.classList.add("option");
      label.innerHTML = `<input type="checkbox" value="${opt}"> ${opt}`;
      optionsEl.appendChild(label);
    });
  } 
  else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "fillAnswer";
    input.placeholder = "Type your answer here";
    input.style.width = "80%";
    input.style.padding = "10px";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid #ccc";
    input.style.textAlign = "center";
    optionsEl.appendChild(input);
  }
}

function checkAnswer() {
  const q = quizData[current];
  let userAnswer = [];

  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) userAnswer.push(selected.value);
  } 
  else if (q.type === "multi") {
    document.querySelectorAll('input[type="checkbox"]:checked')
      .forEach(cb => userAnswer.push(cb.value));
  } 
  else if (q.type === "fill") {
    const input = document.getElementById("fillAnswer");
    if (input) userAnswer.push(input.value.trim());
  }

  if (JSON.stringify(userAnswer.sort()) === JSON.stringify(q.correct.sort())) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  checkAnswer();
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    resultEl.textContent = `Your Score: ${score} / ${quizData.length}`;
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.onclick = restartQuiz;
    optionsEl.appendChild(restartBtn);
  }
});

function restartQuiz() {
  current = 0;
  score = 0;
  resultEl.textContent = "";
  nextBtn.style.display = "block";
  loadQuestion();
}

loadQuestion();
