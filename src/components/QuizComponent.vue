<template>
  <div class="container text-center d-flex flex-column align-items-center vh-100 pt-5">
    <h1 class="quiz-header mt-5 custom-mb">Quiz Time</h1>
    <div class="score-board">
      Question {{ currentQuestionIndex + 1 }}/{{ questions.length }} | Score: {{ score }}
    </div>
    <div class="quiz-content custom-mb d-flex flex-column align-items-center">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="!showResults">
          <div class="question custom-mb">{{ decodeHTMLEntities(currentQuestion.question)}}</div>
          <div class="answers custom-mb">
            <button
                v-for="(answer, index) in currentAnswers"
                :key="index"
                :class="['btn', 'answer-button',
                showNextButton && answer === currentQuestion.correct_answer ? 'btn-success' : '',
                showNextButton && answer === selectedAnswer && selectedAnswer !== currentQuestion.correct_answer && answer === selectedAnswer ? 'btn-danger' : '',
                showNextButton && answer !== selectedAnswer && answer !== currentQuestion.correct_answer ? 'btn-default' : ''
              ]"
                @click="selectAnswer(answer)"
                :disabled="showNextButton"
            >{{ answer }}</button>
          </div>
          <button class="btn next-button" @click="nextQuestion" v-if="showNextButton">Next</button>
        </div>
        <div v-else class="results">
          <h2>Your Score: {{ score }}/{{ questions.length }}</h2>
          <button class="btn restart-button" @click="restartQuiz">Restart</button>
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
      loading: true,
      showNextButton: false,
      showResults: false,
      score: 0,
      selectedAnswer: null,
      isCorrect: false,
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=27');
        this.questions = response.data.results;
        this.setCurrentQuestion();
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
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
      this.showNextButton = true;
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
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.showResults = false;
      this.setCurrentQuestion();
      this.showNextButton = false;
    },
    decodeHTMLEntities(text) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    },
  }
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

.quiz-header {
  color: #f4effa;
  font-size: 2.2rem;
  animation: fadeIn 2400ms ease-in-out;
}

.score-board {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #f4effa;
  font-size: 1.2rem;
}

.quiz-content {
  width: 100%;
}

.loading {
  color: #f4effa;
  font-size: 1.5rem;
}

.question {
  color: #f4effa;
  font-size: 1.5rem;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer-button {
  background-color: #273469;
  border: none;
  color: #f4effa;
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

.next-button,
.restart-button {
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
.restart-button:hover {
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

@media (max-width: 600px) {
  .container {
    padding-top: 2vh;
  }

  .quiz-header {
    font-size: 2rem;
  }

  .answer-button,
  .next-button,
  .restart-button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .score-board {
    top: 10px;
    right: 10px;
    font-size: 1rem;
  }
}
</style>
