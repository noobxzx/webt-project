<template>
  <div class="container text-center d-flex flex-column align-items-center vh-100 pt-5">
    <h1 class="quiz-header mt-5 custom-mb">Quiz Time</h1>
    <div v-if="!quizStarted" class="setup-container">
      <div class="custom-mb fade-in">
        <h2 class="quiz-settings">Select Number of Questions</h2>
        <div class="answers-q">
          <label>
            <input type="radio" value="3" v-model="numberOfQuestions" />
            3
          </label>
          <label>
            <input type="radio" value="5" v-model="numberOfQuestions" />
            5
          </label>
          <label>
            <input type="radio" value="10" v-model="numberOfQuestions" />
            10
          </label>
        </div>
      </div>
      <div class="custom-mb fade-in">
        <h2 class="quiz-settings">Select Category</h2>
        <div class="answers-q">
          <label>
            <input type="radio" value="9" v-model="category" />
            General Knowledge
          </label>
          <label>
            <input type="radio" value="18" v-model="category" />
            Science: Computers
          </label>
          <label>
            <input type="radio" value="27" v-model="category" />
            Animals
          </label>
        </div>
      </div>
      <div class="d-flex justify-content-center fade-in">
        <button class="btn start-button" @click="startQuiz">Start Quiz</button>
      </div>
    </div>
    <div v-else class="quiz-container">
      <div class="score-board">
        Question {{ currentQuestionIndex + 1 }}/{{ questions.length }} | Score: {{ score }}
      </div>
      <div class="quiz-content custom-mb d-flex flex-column align-items-center">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
          <div v-if="!showResults">
            <div class="question custom-mb">{{ decodeHTMLEntities(currentQuestion.question) }}</div>
            <div class="answers custom-mb">
              <button
                  v-for="(answer, index) in currentAnswers"
                  :key="index"
                  :class="[
                  'btn',
                  'answer-button',
                  showNextButton && answer === currentQuestion.correct_answer
                    ? 'btn-success'
                    : '',
                  showNextButton && answer === selectedAnswer && selectedAnswer !== currentQuestion.correct_answer
                    ? 'btn-danger'
                    : '',
                  showNextButton && answer !== selectedAnswer && answer !== currentQuestion.correct_answer
                    ? 'btn-default'
                    : '',
                ]"
                  @click="selectAnswer(answer)"
                  :disabled="showNextButton"
              >
                {{ answer }}
              </button>
            </div>
            <div class="button-container" v-if="showNextButton">
              <button class="btn next-button" @click="nextQuestion">Next</button>
            </div>
          </div>
          <div v-else class="results">
            <h2>Your Score: {{ score }}/{{ questions.length }}</h2>
            <div class="d-flex justify-content-center">
              <button class="btn restart-button" @click="restartQuiz">Restart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: null,
      currentAnswers: [],
      loading: false,
      showNextButton: false,
      showResults: false,
      score: 0,
      selectedAnswer: null,
      isCorrect: false,
      numberOfQuestions: '5',
      category: '9',
      quizStarted: false,
      retryCount: 0,
      maxRetries: 3,
      retryDelay: 1000, // 1 second delay
    };
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      try {
        const response = await axios.get(
            `https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${this.category}`
        );
        this.questions = response.data.results;
        this.setCurrentQuestion();
        this.loading = false;
        this.retryCount = 0;
      } catch (error) {
        if (this.shouldRetry(error)) {
          this.retryCount++;
          setTimeout(() => {
            this.fetchQuestions();
          }, this.retryDelay);
        } else {
          console.error(error);
          this.loading = false;
        }
      }
    },
    shouldRetry(error) {
      const status = error.response ? error.response.status : null;
      return (status >= 500 || status === 429) && this.retryCount < this.maxRetries;
    },
    setCurrentQuestion() {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.currentAnswers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer].sort(
          () => 0.5 - Math.random()
      );
      this.selectedAnswer = null;
      this.isCorrect = false;
    },
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      this.isCorrect = answer === this.currentQuestion.correct_answer;
      if (this.isCorrect) {
        this.score++;
      }
      setTimeout(() => {
        this.showNextButton = true;
      }, 1000);
    },
    nextQuestion() {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.setCurrentQuestion();
        this.showNextButton = false;
      } else {
        this.showResults = true;
      }
    },
    startQuiz() {
      this.quizStarted = true;
      this.fetchQuestions();
    },
    restartQuiz() {
      this.loading = true;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.showResults = false;
      this.showNextButton = false;
      this.selectedAnswer = null;
      this.isCorrect = false;
      this.questions = [];
      this.currentQuestion = null;
      this.currentAnswers = [];
      this.quizStarted = false;
    },
    decodeHTMLEntities(text) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container {
  animation: fadeIn 1s ease-in-out;
}

.setup-container{
  animation: fadeIn 2400ms ease-in-out;
}

.quiz-header {
  color: #fafaff;
  font-size: 2.2rem;
  animation: fadeIn 2400ms ease-in-out;
  position: relative;
}

.score-board {
  position: absolute;
  top: 200px;
  right: 30px;
  color: #f4effa;
  font-size: 1.2rem;
}

.quiz-content {
  width: 100%;
}

.loading {
  color: #fafaff;
  font-size: 1.5rem;
}

.question {
  color: #fafaff;
  font-size: 1.5rem;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answers-q {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  color: #fafaff;
  font-size: 1rem;
}

.quiz-settings {
  color: #fafaff;
  font-size: 1.2rem;
}

.answer-button {
  background-color: #273469;
  border: none;
  color: #fafaff;
  border-radius: 0.5em;
  padding: 15px 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-button.btn-default {
  background-color: #273469 !important;
  color: #f4effa !important;
}

.answer-button:not(.btn-success):not(.btn-danger):hover {
  background-color: transparent;
  border: 1px solid #273469;
  color: #f4effa;
  transform: scale(1.07);
}

.answer-button.btn-success {
  background-color: green !important;
  color: white !important;
}

.answer-button.btn-danger {
  background-color: red !important;
  color: white !important;
}

.answer-button.btn-success:hover {
  background-color: green !important;
  border: none;
  transform: none;
}

.answer-button.btn-danger:hover {
  background-color: red !important;
  border: none;
  transform: none;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.next-button,
.restart-button,
.start-button {
  color: #f4effa;
  padding: 1em 2.8em;
  background-color: #273469;
  border: 1px solid #273469;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 100ms ease, transform 300ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
}

.next-button:hover,
.restart-button:hover,
.start-button:hover {
  background-color: transparent;
  transform: scale(1.07);
  color: #f4effa;
  border: 1px solid #273469;
}

.results {
  color: #f4effa;
  font-size: 1.5rem;
  text-align: center;
}

.custom-mb {
  margin-bottom: 5rem;
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@media (max-width: 600px) {
  .container {
    padding-top: 2vh;
  }

  .quiz-header {
    font-size: 2rem;
  }

  .answer-button,
  .next-button,
  .restart-button,
  .start-button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .score-board {
    top: 50px; /* Adjust this value as needed to move the score lower */
    left: 10px;
    font-size: 1rem;
  }
}
</style>
