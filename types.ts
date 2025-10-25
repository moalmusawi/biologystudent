
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface NavLink {
  key: string;
  path: string;
}

export interface QuizResult {
  unitKey: string;
  score: number;
  total: number;
  date: string;
  questions: QuizQuestion[];
  selectedAnswers: (number | null)[];
}
