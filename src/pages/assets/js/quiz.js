fetch("assets/json/quizData.json")
  .then(response => response.json())
  .then(data => {
    const quizData = data;
    const questionContainer = document.getElementById("question-container");
    const submitBtn = document.getElementById("submit-btn");
    const resultContainer = document.getElementById("result-container");
    const nextBtn = document.getElementById("next-btn");

    let currentQuestion = 0;
    let score = 0;

    // Mengacak urutan soal dalam array quizData
    function shuffleQuestions() {
      for (let i = quizData.quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData.quizData[i], quizData.quizData[j]] = [quizData.quizData[j], quizData.quizData[i]];
      }
    }

    // Memuat pertanyaan ke dalam kontainer
    function loadQuestion() {
      const currentQuiz = quizData.quizData[currentQuestion];
      questionContainer.innerHTML = "";
      questionContainer.innerHTML += `<h2 class="py-4">${currentQuiz.question}</h2>`;
      for (let i = 0; i < currentQuiz.answers.length; i++) {
        questionContainer.innerHTML += `<input type="radio" name="answer" value="${i}">${currentQuiz.answers[i]}<br>`;
      }
    }

    function checkAnswer() {
      const answerInputs = document.getElementsByName("answer");
      let selectedAnswer;
      for (let i = 0; i < answerInputs.length; i++) {
        if (answerInputs[i].checked) {
          selectedAnswer = parseInt(answerInputs[i].value);
          break;
        }
      }
      if (selectedAnswer === quizData.quizData[currentQuestion].correctAnswer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < 5) {
        loadQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      questionContainer.style.display = "none";
      submitBtn.style.display = "none";
      nextBtn.style.display = "block";
      const percentage = (score / 5) * 100;
      resultContainer.innerHTML = `<h2 class="font-semibold py-4">Quiz Selesai</h2>`;
      resultContainer.innerHTML += `<p class="bg-black h-7 rounded-t-lg text-center self-center place-self-center ">Skor kamu: ${score}/5 (${percentage}%)</p>`;
      if (percentage >= 80) {
        resultContainer.innerHTML += `<p class="rounded-b-lg self-center p-3 bg-green-600">Selamat kamu bisa lanjut ke materi selanjutnya</p>`;
        nextBtn.disabled = false;
      } else {
        resultContainer.innerHTML += `<p class="bg-red-500 rounded-b-lg p-3 text-center">Maaf, kamu harus mengulang quiz</p>`;
        nextBtn.disabled = true;
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("retry-btn").style.display = "block";

      }
    }

    function resetQuiz() {
      currentQuestion = 0;
      score = 0;
      questionContainer.style.display = "block";
      submitBtn.style.display = "block";
      nextBtn.style.display = "none";
      resultContainer.innerHTML = "";
      shuffleQuestions();
      loadQuestion();
    }

    submitBtn.addEventListener("click", checkAnswer);
    nextBtn.addEventListener("click", resetQuiz);

    // Mengacak urutan soal sebelum memuat pertanyaan pertama
    shuffleQuestions();
    loadQuestion();
  })
  .catch(error => console.log(error));
