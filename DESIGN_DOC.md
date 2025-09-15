# 📑 Design Document & Approach Strategy  
**Project:** Excel AI Interviewer  
**Author:** [Teesha Srivastava]  
**Date:** September 15, 2025  

---

## 1. Introduction & Problem Statement
The goal of this project is to build a **mock AI interviewer** that simulates an Excel interview.  
The system should:  
- Conduct a structured, multi-turn interview.  
- Evaluate candidate responses intelligently.  
- Manage interview flow like a real interviewer.  
- Provide constructive feedback and a final performance summary.  

This Proof-of-Concept (PoC) demonstrates how such a system can be designed, evaluated, and improved over time.

---

## 2. Design Approach

### 2.1 Interview Flow
1. **Introduction** → The interviewer introduces itself and explains the process.  
2. **Questioning** → One question is asked at a time.  
3. **Answer Evaluation** → Candidate responses are checked against expected keywords.  
4. **Feedback** → If correct → positive feedback; if incorrect → constructive tip.  
5. **Progress Tracking** → Score and progress bar update in real-time.  
6. **Conclusion** → Interview ends with a summary report (score + feedback).  

### 2.2 Evaluation Logic
- Current PoC uses **keyword matching** for correctness.  
- Example: For *“What is a cell in Excel?”*, keywords include `basic unit`.  
- Feedback is generated accordingly:
  - Correct → “Correct! 👍”  
  - Incorrect → “Tip: A cell is the basic unit in Excel where you can enter data.”  

This ensures fast and deterministic evaluation without needing external APIs.  

---

## 3. Technology Stack & Justification

| Technology     | Why Chosen                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **React + Vite** | Fast, modern frontend development with hot-reload and optimized builds.   |
| **TypeScript** | Strong typing ensures maintainability and fewer runtime errors.             |
| **StackBlitz** | Enables instant cloud deployment and shareable live demo.                   |
| **GitHub**     | Provides version control and professional submission format.                |

---

## 4. State Management
- **React Hooks** (`useState`, `useEffect`, `useRef`) handle:  
  - Current question & turn.  
  - Conversation history.  
  - User answers.  
  - Interview score & summary.  

This ensures a smooth, conversational experience without external state libraries.

---

## 5. Cold Start Problem & Strategy
Since no dataset of Excel interviews exists, this system starts with a **small curated question bank**.  
- **Bootstrapping:** Handcrafted Q&A pairs with keywords.  
- **Improvement Strategy:**  
  1. Collect transcripts from user sessions.  
  2. Expand question set iteratively.  
  3. Introduce **semantic similarity models** (LLMs) later for richer evaluation.  
  4. Fine-tune models with collected transcripts to improve accuracy.  

This approach ensures the system can evolve over time, even without an initial dataset.

---

## 6. Future Improvements
- 🤖 **LLM Integration** → Use GPT-based models for more natural evaluation.  
- 📚 **Dynamic Question Bank** → Broader coverage of Excel concepts.  
- 🌐 **Cloud Deployment** → Deploy on Vercel/Netlify for production.  
- 🎯 **Adaptive Interviews** → Adjust difficulty based on candidate’s performance.  
- 📊 **Analytics Dashboard** → Track performance across multiple interviews.  

---

## 7. Conclusion
The Excel AI Interviewer PoC demonstrates how structured interviews can be simulated using React and simple evaluation logic.  
While basic in its current form, the design sets a clear pathway for iterative improvement—eventually scaling into a fully AI-driven interviewer powered by LLMs.  

---

**Deliverables Covered:**  
- Design Document (DESIGN_DOC.md)  
- Runnable Source Code (https://github.com/TeeshaSrivastava/Excel-AI-Interviewer)  
- Deployed Demo (https://stackblitz.com/edit/vitejs-vite-nndvebsu?file=src%2FApp.tsx)  
- Sample Transcripts (see `TRANSCRIPTS.md`)  
