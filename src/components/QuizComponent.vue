<template>
  <div class="container text-center d-flex flex-column align-items-center justify-content-center vh-100 pt-5">
    <h1 class="quiz-header custom-mb">Quiz Time</h1>
    <div class="quiz-content custom-mb d-flex flex-column align-items-center">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="!showResults">
          <div class="question custom-mb">{{ currentQuestion.question }}</div>
          <div class="answers custom-mb">
            <button
                v-for="(answer, index) in currentAnswers"
                :key="index"
                class="btn answer-button"
                @click="selectAnswer(answer)"
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
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
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
    },
    selectAnswer(answer) {
      if (answer === this.currentQuestion.correct_answer) {
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
    }
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

.answer-button:hover {
  background-color: transparent;
  border: 1px solid #273469;
  transform: scale(1.07);
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
}
</style>
