import React, { useState, useRef, useEffect } from "react";
import "./App.css";

interface Turn {
  id: number;
  question: string;
  keywords: string[];
  tip: string;
}

const questionList: Turn[] = [
  {
    id: 0,
    question: "What is a cell in Excel?",
    keywords: ["the basic unit"],
    tip: "A cell is the basic unit in Excel where you can enter data.",
  },
  {
    id: 1,
    question: "What are Excel formulas and why are they important?",
    keywords: ["calculate values automatically"],
    tip: "Formulas help calculate values automatically, e.g., =SUM(A1:A5).",
  },
  {
    id: 2,
    question: "Explain VLOOKUP with an example.",
    keywords: ["vlookup", "lookup"],
    tip: "VLOOKUP searches for a value in a column and returns a corresponding value.",
  },
];

function App() {
  const [conversation, setConversation] = useState<
    { role: "ai" | "user"; text: string }[]
  >([{ role: "ai", text: "Hello! I am your Excel AI interviewer 🤖. Click 'Start Interview' to begin." }]);

  const [currentTurn, setCurrentTurn] = useState<Turn | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);

  const [answersSummary, setAnswersSummary] = useState<
    { question: string; answer: string; feedback: string; correct: boolean }[]
  >([]);

  const convRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (convRef.current) convRef.current.scrollTop = convRef.current.scrollHeight;
  }, [conversation]);

  const startInterview = () => {
    setInterviewStarted(true);
    setCurrentTurn(questionList[0]);
    setConversation((prev) => [
      ...prev,
      { role: "ai", text: "Let's start with the first question!" },
      { role: "ai", text: questionList[0].question },
    ]);
  };

  const handleAnswer = () => {
    if (!currentTurn) return;

    // Check for keywords
    const isCorrect = currentTurn.keywords.some((k) =>
      currentAnswer.toLowerCase().includes(k.toLowerCase())
    );
    if (isCorrect) setScore((prev) => prev + 1);

    const feedback = isCorrect ? "Correct! 👍" : `Incorrect. Tip: ${currentTurn.tip}`;

    // Update conversation
    setConversation((prev) => [
      ...prev,
      { role: "user", text: currentAnswer },
      { role: "ai", text: feedback },
    ]);

    // Add to summary
    setAnswersSummary((prev) => [
      ...prev,
      { question: currentTurn.question, answer: currentAnswer, feedback, correct: isCorrect },
    ]);

    // Move to next question
    const nextIndex = questionList.findIndex((q) => q.id === currentTurn.id + 1);
    if (nextIndex >= 0) {
      const nextTurn = questionList[nextIndex];
      setCurrentTurn(nextTurn);
      setConversation((prev) => [...prev, { role: "ai", text: nextTurn.question }]);
    } else {
      setCurrentTurn(null);
      setInterviewFinished(true);
      setConversation((prev) => [
        ...prev,
        { role: "ai", text: "Interview finished! Check your summary and score below." },
      ]);
    }

    setCurrentAnswer("");
  };

  const restartInterview = () => {
    setConversation([{ role: "ai", text: "Hello! I am your Excel AI interviewer 🤖. Click 'Start Interview' to begin." }]);
    setCurrentTurn(null);
    setCurrentAnswer("");
    setScore(0);
    setAnswersSummary([]);
    setInterviewStarted(false);
    setInterviewFinished(false);
  };

  const progress = ((answersSummary.length + 1) / questionList.length) * 100;

  return (
    <div className="App">
      <h1>Excel AI Interviewer</h1>

      {!interviewStarted && (
        <button className="start-btn" onClick={startInterview}>
          Start Interview
        </button>
      )}

      {interviewStarted && !interviewFinished && (
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="conversation" ref={convRef}>
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "ai" ? "ai-message" : "user-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {interviewStarted && !interviewFinished && currentTurn && (
        <div className="answer-box">
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
          <button onClick={handleAnswer} disabled={!currentAnswer.trim()}>
            Submit Answer
          </button>
        </div>
      )}

      {interviewFinished && (
        <div className="summary-card">
          <h2>Interview Summary</h2>
          <p><b>Final Score:</b> {score} / {questionList.length}</p>
          <ul>
            {answersSummary.map((item, idx) => (
              <li key={idx} className={item.correct ? "correct-answer" : "wrong-answer"}>
                <b>Q{idx + 1}:</b> {item.question} <br />
                <b>Your Answer:</b> {item.answer} <br />
                <b>Feedback:</b> {item.feedback}
              </li>
            ))}
          </ul>
          <button className="restart-btn" onClick={restartInterview}>
            Restart Interview
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
