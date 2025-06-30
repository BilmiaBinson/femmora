/**
 * @file BrainQuizzesScreen.tsx
 * @description A fun and interactive quiz game screen.
 * It presents users with batches of multiple-choice questions from various categories.
 * The component manages the quiz state, tracks the user's score, and uses
 * localStorage to ensure that users don't see the same questions repeatedly
 * until all unique questions have been attempted.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { QuizQuestion, QuizAnswerOption } from '../../types';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// Key for storing seen question IDs in localStorage.
const SEEN_QUESTIONS_STORAGE_KEY = 'femmoraSeenQuizQuestions';
// Number of questions to present in each quiz batch.
const QUESTIONS_PER_BATCH = 5;

// A static array of all available mock questions for the quiz.
// In a real application, this would likely be fetched from an API.
const allMockQuestions: QuizQuestion[] = [
  // General Knowledge
  {
    id: 'gk1',
    questionText: 'What is the capital of India?',
    options: [ { text: 'Mumbai', isCorrect: false }, { text: 'New Delhi', isCorrect: true }, { text: 'Kolkata', isCorrect: false }, { text: 'Chennai', isCorrect: false } ],
    category: 'General Knowledge', difficulty: 'easy', explanation: 'New Delhi is the capital of India.'
  },
  {
    id: 'gk2',
    questionText: 'Which is the longest river in India?',
    options: [ { text: 'Godavari', isCorrect: false }, { text: 'Ganges (Ganga)', isCorrect: true }, { text: 'Yamuna', isCorrect: false }, { text: 'Brahmaputra', isCorrect: false } ],
    category: 'General Knowledge', difficulty: 'medium', explanation: 'The Ganges (Ganga) is the longest river in India.'
  },
  {
    id: 'gk3',
    questionText: 'Who is known as the "Father of the Nation" in India?',
    options: [ { text: 'Jawaharlal Nehru', isCorrect: false }, { text: 'Sardar Patel', isCorrect: false }, { text: 'Mahatma Gandhi', isCorrect: true }, { text: 'B.R. Ambedkar', isCorrect: false } ],
    category: 'General Knowledge', difficulty: 'easy', explanation: 'Mahatma Gandhi is known as the Father of the Nation in India.'
  },
  {
    id: 'gk4',
    questionText: 'How many states are there in India (as of 2023)?',
    options: [ { text: '28', isCorrect: true }, { text: '29', isCorrect: false }, { text: '30', isCorrect: false }, { text: '27', isCorrect: false } ],
    category: 'General Knowledge', difficulty: 'medium', explanation: 'India has 28 states and 8 Union Territories.'
  },
  {
    id: 'gk5',
    questionText: 'What is the national animal of India?',
    options: [ { text: 'Lion', isCorrect: false }, { text: 'Tiger', isCorrect: true }, { text: 'Elephant', isCorrect: false }, { text: 'Leopard', isCorrect: false } ],
    category: 'General Knowledge', difficulty: 'easy', explanation: 'The Royal Bengal Tiger is the national animal of India.'
  },

  // Logic
  {
    id: 'logic1',
    questionText: 'Which number comes next in the series: 2, 4, 6, 8, __?',
    options: [ { text: '9', isCorrect: false }, { text: '10', isCorrect: true }, { text: '12', isCorrect: false }, { text: '7', isCorrect: false } ],
    category: 'Logic', difficulty: 'easy', explanation: 'The series increases by 2 each time. So, 8 + 2 = 10.'
  },
  {
    id: 'logic2',
    questionText: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?',
    options: [ { text: 'Yes', isCorrect: true }, { text: 'No', isCorrect: false }, { text: 'Maybe', isCorrect: false }, { text: 'Not enough information', isCorrect: false } ],
    category: 'Logic', difficulty: 'medium', explanation: 'This is a transitive property. If A=B and B=C, then A=C.'
  },
  {
    id: 'logic3',
    questionText: 'A B C D E. Which letter is two to the right of the letter immediately to the left of D?',
    options: [ { text: 'C', isCorrect: false }, { text: 'D', isCorrect: false }, { text: 'E', isCorrect: true }, { text: 'B', isCorrect: false } ],
    category: 'Logic', difficulty: 'medium', explanation: 'Letter to the left of D is C. Two letters to the right of C is E.'
  },
  {
    id: 'logic4',
    questionText: 'A mother is twice as old as her daughter. If the mother is 40, how old is the daughter?',
    options: [ { text: '10', isCorrect: false }, { text: '20', isCorrect: true }, { text: '30', isCorrect: false }, { text: '15', isCorrect: false } ],
    category: 'Logic', difficulty: 'easy', explanation: 'If the mother is twice as old, the daughter is half her age. 40 / 2 = 20.'
  },
  {
    id: 'logic5',
    questionText: 'Which shape usually has the most sides: Triangle, Square, Pentagon, Hexagon?',
    options: [ { text: 'Triangle (3)', isCorrect: false }, { text: 'Square (4)', isCorrect: false }, { text: 'Pentagon (5)', isCorrect: false }, { text: 'Hexagon (6)', isCorrect: true } ],
    category: 'Logic', difficulty: 'easy', explanation: 'A hexagon has 6 sides, which is more than a triangle (3), square (4), or pentagon (5).'
  },
  
  // Math
  {
    id: 'math1',
    questionText: 'What is 5 + 7?',
    options: [ { text: '10', isCorrect: false }, { text: '12', isCorrect: true }, { text: '11', isCorrect: false }, { text: '13', isCorrect: false } ],
    category: 'Math', difficulty: 'easy', explanation: '5 + 7 equals 12.'
  },
  {
    id: 'math2',
    questionText: 'How many sides does a triangle have?',
    options: [ { text: 'Three', isCorrect: true }, { text: 'Four', isCorrect: false }, { text: 'Five', isCorrect: false }, { text: 'Six', isCorrect: false } ],
    category: 'Math', difficulty: 'easy', explanation: 'A triangle is a polygon with three edges and three vertices.'
  },
  {
    id: 'math3',
    questionText: 'What is 2 + 2 * 2?',
    options: [ { text: '8', isCorrect: false }, { text: '6', isCorrect: true }, { text: '4', isCorrect: false }, { text: '10', isCorrect: false } ],
    category: 'Math', difficulty: 'medium', explanation: 'Order of operations (multiplication first): 2 * 2 = 4, then 2 + 4 = 6.'
  },
  {
    id: 'math4',
    questionText: 'If you have 3 apples and you give away 1, how many do you have left?',
    options: [ { text: '1', isCorrect: false }, { text: '2', isCorrect: true }, { text: '3', isCorrect: false }, { text: '0', isCorrect: false } ],
    category: 'Math', difficulty: 'easy', explanation: '3 - 1 = 2.'
  },
  {
    id: 'math5',
    questionText: 'What is 10 divided by 2?',
    options: [ { text: '2', isCorrect: false }, { text: '5', isCorrect: true }, { text: '8', isCorrect: false }, { text: '4', isCorrect: false } ],
    category: 'Math', difficulty: 'easy', explanation: '10 / 2 = 5.'
  },

  // Basic Science
  {
    id: 'sci1',
    questionText: 'What do plants need to grow, apart from water and soil?',
    options: [ { text: 'Moonlight', isCorrect: false }, { text: 'Sunlight', isCorrect: true }, { text: 'Electricity', isCorrect: false }, { text: 'Wind', isCorrect: false } ],
    category: 'Basic Science', difficulty: 'easy', explanation: 'Plants use sunlight for photosynthesis to make their food.'
  },
  {
    id: 'sci2',
    questionText: 'What is H2O commonly known as?',
    options: [ { text: 'Salt', isCorrect: false }, { text: 'Sugar', isCorrect: false }, { text: 'Water', isCorrect: true }, { text: 'Air', isCorrect: false } ],
    category: 'Basic Science', difficulty: 'easy', explanation: 'H2O is the chemical formula for water.'
  },
  {
    id: 'sci3',
    questionText: 'Which planet is known as the Red Planet?',
    options: [ { text: 'Jupiter', isCorrect: false }, { text: 'Mars', isCorrect: true }, { text: 'Venus', isCorrect: false }, { text: 'Saturn', isCorrect: false } ],
    category: 'Basic Science', difficulty: 'medium', explanation: 'Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.'
  },
  {
    id: 'sci4',
    questionText: 'What pulls objects towards the Earth?',
    options: [ { text: 'Magnetism', isCorrect: false }, { text: 'Gravity', isCorrect: true }, { text: 'Friction', isCorrect: false }, { text: 'Wind', isCorrect: false } ],
    category: 'Basic Science', difficulty: 'easy', explanation: 'Gravity is the force that attracts objects with mass towards each other, like Earth pulling objects down.'
  },
  {
    id: 'sci5',
    questionText: 'How many colors are in a rainbow typically?',
    options: [ { text: '5', isCorrect: false }, { text: '7', isCorrect: true }, { text: '9', isCorrect: false }, { text: '3', isCorrect: false } ],
    category: 'Basic Science',
    difficulty: 'easy',
    explanation: 'A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV).'
  },
];

const BrainQuizzesScreen: React.FC = () => {
  const { translate } = useLanguage();
  const [quizState, setQuizState] = useState<'idle' | 'active' | 'finished'>('idle');
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswerOption | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | 'unanswered'>('unanswered');

  const getUnseenQuestions = useCallback((): QuizQuestion[] => {
    let seenIds: string[] = [];
    try {
      const stored = localStorage.getItem(SEEN_QUESTIONS_STORAGE_KEY);
      if (stored) {
        seenIds = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse seen questions from localStorage", e);
      seenIds = [];
    }

    const unseen = allMockQuestions.filter(q => !seenIds.includes(q.id));
    
    if (unseen.length < QUESTIONS_PER_BATCH) {
      // Not enough unseen questions, reset the seen list.
      localStorage.removeItem(SEEN_QUESTIONS_STORAGE_KEY);
      return allMockQuestions;
    }
    return unseen;
  }, []);

  const startNewQuiz = useCallback(() => {
    const unseenQuestions = getUnseenQuestions();
    const shuffled = unseenQuestions.sort(() => 0.5 - Math.random());
    const newBatch = shuffled.slice(0, QUESTIONS_PER_BATCH);

    setCurrentQuestions(newBatch);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerStatus('unanswered');
    setQuizState('active');
  }, [getUnseenQuestions]);

  const handleAnswerSelect = (option: QuizAnswerOption) => {
    if (answerStatus === 'unanswered') {
      setSelectedAnswer(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer.isCorrect) {
      setScore(prev => prev + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNextQuestion = () => {
    // Add the current question to the seen list in localStorage
    const seenIdsStr = localStorage.getItem(SEEN_QUESTIONS_STORAGE_KEY);
    const seenIds = seenIdsStr ? JSON.parse(seenIdsStr) : [];
    const currentQuestionId = currentQuestions[currentQuestionIndex].id;
    if (!seenIds.includes(currentQuestionId)) {
      seenIds.push(currentQuestionId);
      localStorage.setItem(SEEN_QUESTIONS_STORAGE_KEY, JSON.stringify(seenIds));
    }

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerStatus('unanswered');
    } else {
      setQuizState('finished');
    }
  };

  if (quizState === 'idle') {
    return (
      <div className="text-center">
          <SectionTitle title={translate('brainQuizzesTitle')} subtitle={translate('brainQuizzesSubtitle')} />
          <Card className="max-w-md mx-auto">
              <i className="fas fa-brain text-6xl text-teal-500 mb-4"></i>
              <p className="text-lg text-gray-700 mb-6">Ready to test your knowledge and have some fun? A new quiz will start with {QUESTIONS_PER_BATCH} questions.</p>
              <Button onClick={startNewQuiz} size="lg">
                  {translate('startQuiz')}
              </Button>
          </Card>
      </div>
    );
  }

  if (quizState === 'finished') {
    return (
      <div className="text-center">
           <SectionTitle title={translate('quizCompleted')} />
           <Card className="max-w-md mx-auto">
              <i className="fas fa-trophy text-6xl text-amber-500 mb-4"></i>
              <p className="text-2xl text-gray-700 mb-2">{translate('yourScore')}:</p>
              <p className="text-5xl font-bold text-teal-600 mb-6">
                  {score} / {currentQuestions.length}
              </p>
              <Button onClick={startNewQuiz} size="lg">
                  {translate('playAgain')}
              </Button>
           </Card>
      </div>
    )
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <div>
      <SectionTitle title={translate('brainQuizzesTitle')} />
      <Card className="max-w-2xl mx-auto shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 text-gray-600">
              <span className="font-semibold">{currentQuestion.category}</span>
              <span className="font-semibold">{translate('question')} {currentQuestionIndex + 1} {translate('of')} {currentQuestions.length}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 min-h-[6rem] flex items-center">{currentQuestion.questionText}</h3>
          
          <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                  <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={answerStatus !== 'unanswered'}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 
                          ${selectedAnswer?.text === option.text ? 'ring-4 ring-teal-300' : ''}
                          ${answerStatus === 'unanswered' ? 'hover:bg-teal-50 border-gray-300' : ''}
                          ${answerStatus !== 'unanswered' && option.isCorrect ? 'bg-green-100 border-green-500 text-green-800 font-semibold' : ''}
                          ${answerStatus !== 'unanswered' && !option.isCorrect && selectedAnswer?.text === option.text ? 'bg-red-100 border-red-500 text-red-800 font-semibold' : ''}
                      `}
                  >
                      {option.text}
                  </button>
              ))}
          </div>

          {answerStatus !== 'unanswered' ? (
              <div className="text-center">
                  <p className={`text-xl font-bold mb-2 ${answerStatus === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                      {answerStatus === 'correct' ? translate('correctAnswer') : translate('incorrectAnswer')}
                  </p>
                  {currentQuestion.explanation && (
                      <div className="bg-gray-100 p-3 rounded-md text-gray-700 text-sm mb-4">
                         <strong>{translate('quizExplanation')}:</strong> {currentQuestion.explanation}
                      </div>
                  )}
                  <Button onClick={handleNextQuestion} size="lg" fullWidth>
                      {currentQuestionIndex === currentQuestions.length - 1 ? translate('quizCompleted') : translate('nextQuestion')}
                  </Button>
              </div>
          ) : (
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} size="lg" fullWidth>
                  {translate('submitAnswer')}
              </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BrainQuizzesScreen;
