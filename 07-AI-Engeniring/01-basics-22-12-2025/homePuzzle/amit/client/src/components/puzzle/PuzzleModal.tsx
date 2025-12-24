import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCode, FaLightbulb, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Modal from '../ui/Modal';
import styles from './PuzzleModal.module.scss';

interface TestResult {
  passed: boolean;
  testCase: string;
  expected: any;
  received: any;
  error?: string;
}

interface Puzzle {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  functionName: string;
  difficulty: string;
  points: number;
  maxAttempts: number;
  hints?: string[];
  rewardItem: {
    name: string;
    description: string;
  };
}

interface PuzzleModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzle: Puzzle;
  onSubmit: (code: string) => Promise<{
    success: boolean;
    allTestsPassed?: boolean;
    testResults?: TestResult[];
    message?: string;
    executionError?: string;
    reward?: {
      points: number;
      item: {
        name: string;
        description: string;
      };
    };
  }>;
}

const PuzzleModal = ({ isOpen, onClose, puzzle, onSubmit }: PuzzleModalProps) => {
  const [code, setCode] = useState(puzzle.starterCode);
  const [attemptsRemaining, setAttemptsRemaining] = useState(puzzle.maxAttempts);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);

  useEffect(() => {
    if (isOpen) {
      setCode(puzzle.starterCode);
      setAttemptsRemaining(puzzle.maxAttempts);
      setTestResults([]);
      setShowSuccess(false);
      setShowFailure(false);
      setErrorMessage('');
      setCurrentHintIndex(-1);
    }
  }, [isOpen, puzzle]);

  const handleSubmit = async () => {
    if (attemptsRemaining <= 0) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await onSubmit(code);

      if (result.allTestsPassed) {
        setShowSuccess(true);
        setTestResults(result.testResults || []);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setShowFailure(true);
        setAttemptsRemaining(prev => prev - 1);
        setTestResults(result.testResults || []);
        setErrorMessage(result.executionError || result.message || 'Some tests failed');

        setTimeout(() => {
          setShowFailure(false);
        }, 500);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit solution');
      setShowFailure(true);
      setTimeout(() => {
        setShowFailure(false);
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNextHint = () => {
    if (puzzle.hints && currentHintIndex < puzzle.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'var(--accent-green)';
      case 'medium': return 'var(--accent-yellow)';
      case 'hard': return 'var(--accent-red)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={puzzle.title}>
        <motion.div
          className={styles.puzzleContainer}
          animate={showFailure ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.layout}>
            {/* Left Pane - Description */}
            <div className={styles.leftPane}>
              <div className={styles.header}>
                <div className={styles.difficulty} style={{ color: getDifficultyColor(puzzle.difficulty) }}>
                  <FaCode /> {puzzle.difficulty.toUpperCase()}
                </div>
                <div className={styles.points}>{puzzle.points} pts</div>
              </div>

              <div className={styles.description}>
                <h3>Mission Briefing</h3>
                <p>{puzzle.description}</p>
              </div>

              <div className={styles.attempts}>
                <div className={styles.attemptsLabel}>Attempts Remaining</div>
                <div className={styles.attemptsCount}>
                  {[...Array(puzzle.maxAttempts)].map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.attemptDot} ${i < attemptsRemaining ? styles.active : ''}`}
                    />
                  ))}
                </div>
                <div className={styles.attemptsNumber}>{attemptsRemaining} / {puzzle.maxAttempts}</div>
              </div>

              {puzzle.hints && puzzle.hints.length > 0 && (
                <div className={styles.hints}>
                  <button
                    className={styles.hintButton}
                    onClick={showNextHint}
                    disabled={currentHintIndex >= puzzle.hints.length - 1}
                  >
                    <FaLightbulb /> {currentHintIndex === -1 ? 'Show Hint' : 'Next Hint'}
                  </button>

                  <AnimatePresence>
                    {currentHintIndex >= 0 && (
                      <motion.div
                        className={styles.hintText}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        💡 {puzzle.hints[currentHintIndex]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className={styles.reward}>
                <h4>Reward</h4>
                <div className={styles.rewardItem}>
                  <strong>{puzzle.rewardItem.name}</strong>
                  <p>{puzzle.rewardItem.description}</p>
                </div>
              </div>

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className={styles.testResults}>
                  <h4>Test Results</h4>
                  {testResults.map((result, idx) => (
                    <div key={idx} className={`${styles.testResult} ${result.passed ? styles.passed : styles.failed}`}>
                      {result.passed ? <FaCheckCircle /> : <FaTimesCircle />}
                      <div className={styles.testInfo}>
                        <div className={styles.testCase}>{result.testCase}</div>
                        {!result.passed && (
                          <div className={styles.testDetails}>
                            <div>Expected: {JSON.stringify(result.expected)}</div>
                            <div>Received: {JSON.stringify(result.received)}</div>
                            {result.error && <div className={styles.error}>Error: {result.error}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {errorMessage && (
                <div className={styles.errorMessage}>
                  ⚠️ {errorMessage}
                </div>
              )}
            </div>

            {/* Right Pane - Editor */}
            <div className={styles.rightPane}>
              <div className={styles.editorHeader}>
                <span>TypeScript Editor</span>
                <span className={styles.functionName}>function: {puzzle.functionName}</span>
              </div>

              <div className={styles.editorContainer}>
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>

              <div className={styles.editorFooter}>
                <button
                  className={styles.submitButton}
                  onClick={handleSubmit}
                  disabled={isSubmitting || attemptsRemaining <= 0}
                >
                  {isSubmitting ? 'Running Tests...' : 'Submit Code'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className={styles.successOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.successContent}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCheckCircle className={styles.successIcon} />
              <h2>Puzzle Solved!</h2>
              <p>System repaired successfully</p>
              <div className={styles.successReward}>
                <div>+{puzzle.points} points</div>
                <div>Obtained: {puzzle.rewardItem.name}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PuzzleModal;
