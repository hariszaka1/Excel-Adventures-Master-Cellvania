
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GridData, AvatarExpression } from './types';
import { LEVELS } from './constants';
import Avatar from './components/Avatar';
import ProgressBar from './components/ProgressBar';
import Spreadsheet from './components/Spreadsheet';
import FeedbackModal from './components/FeedbackModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start_screen');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gridData, setGridData] = useState<GridData>(LEVELS[0].initialGrid);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [avatarExpression, setAvatarExpression] = useState<AvatarExpression>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [avatarMessage, setAvatarMessage] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentLevel = LEVELS[currentLevelIndex];

  const loadLevel = useCallback((levelIndex: number) => {
    if (levelIndex < LEVELS.length) {
      setCurrentLevelIndex(levelIndex);
      setGridData(JSON.parse(JSON.stringify(LEVELS[levelIndex].initialGrid))); // Deep copy
      setActiveCell(null);
      setAvatarExpression('thinking');
      setAvatarMessage(LEVELS[levelIndex].instruction);
      setHintUsed(false);
      setAnswerShown(false);
      setFeedbackMessage('');
      setIsTransitioning(false);
      setGameState('playing');
    } else {
      setGameState('game_complete');
      setAvatarExpression('happy');
    }
  }, []);

  const startGame = () => {
    loadLevel(0);
  };

  const retryGame = () => {
    loadLevel(0);
  };
  
  const goHome = () => {
    setGameState('start_screen');
  };

  const previousLevel = () => {
    if (currentLevelIndex > 0) {
      loadLevel(currentLevelIndex - 1);
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      loadLevel(currentLevelIndex + 1);
    } else {
      setGameState('game_complete');
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (isTransitioning || answerShown) return;
    setActiveCell({ row, col });

    if (currentLevel.id === 1) {
      setIsTransitioning(true);
      const isCorrect = currentLevel.validate(gridData, { row, col });
      if (isCorrect) {
        setAvatarExpression('correct');
        setAvatarMessage(currentLevel.successMessage);
        setTimeout(() => {
          nextLevel();
        }, 2000);
      } else {
        setAvatarExpression('incorrect');
        setFeedbackMessage('Bukan sel yang itu. Coba lagi!');
        setTimeout(() => {
          setAvatarExpression('thinking');
          setFeedbackMessage('');
          setIsTransitioning(false);
        }, 2000);
      }
    }
  };

  const handleCellValueChange = (row: number, col: number, value: string) => {
    const newGridData = [...gridData];
    newGridData[row][col] = { ...newGridData[row][col], value };
    setGridData(newGridData);
  };

  const checkAnswer = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const isCorrect = currentLevel.validate(gridData, activeCell);
    if (isCorrect) {
      setAvatarExpression('correct');
      setAvatarMessage(currentLevel.successMessage);
      setFeedbackMessage('');
      setTimeout(() => {
        nextLevel();
      }, 2000);
    } else {
      setAvatarExpression('incorrect');
      setFeedbackMessage('Hampir benar! Coba lagi.');
      setTimeout(() => {
        setAvatarExpression('thinking');
        setFeedbackMessage('');
        setAvatarMessage(hintUsed ? currentLevel.hint : currentLevel.instruction);
        setIsTransitioning(false);
      }, 2000);
    }
  };

  const showHint = () => {
    setHintUsed(true);
    setAvatarMessage(currentLevel.hint);
    setAvatarExpression('thinking');
  };

  const showAnswer = () => {
    setAnswerShown(true);
    setAvatarExpression('happy');
    setAvatarMessage("Ini dia jawabannya! Coba pahami cara kerjanya.");
    const newGridData = JSON.parse(JSON.stringify(gridData));

    switch (currentLevel.id) {
      case 1:
        setActiveCell({ row: 0, col: 0 });
        break;
      case 2:
        newGridData[0][0].value = '50';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 0 });
        break;
      case 3:
        newGridData[0][2].value = '=A1+B1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
      case 4:
        newGridData[0][2].value = '=A1-B1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
      case 5:
        newGridData[0][2].value = '=A1*B1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
      case 6:
        newGridData[0][2].value = '=A1/B1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
      case 7:
        newGridData[3][0].value = '=SUM(A1:A3)';
        setGridData(newGridData);
        setActiveCell({ row: 3, col: 0 });
        break;
      case 8:
        newGridData[3][1].value = '=AVERAGE(B1:B3)';
        setGridData(newGridData);
        setActiveCell({ row: 3, col: 1 });
        break;
      case 9:
        newGridData[3][2].value = '=MAX(C1:C3)';
        setGridData(newGridData);
        setActiveCell({ row: 3, col: 2 });
        break;
      case 10:
        newGridData[3][3].value = '=MIN(D1:D3)';
        setGridData(newGridData);
        setActiveCell({ row: 3, col: 3 });
        break;
      case 11:
        newGridData[5][0].value = '=COUNT(A1:A5)';
        setGridData(newGridData);
        setActiveCell({ row: 5, col: 0 });
        break;
      case 12:
        newGridData[5][1].value = '=COUNTA(B1:B5)';
        setGridData(newGridData);
        setActiveCell({ row: 5, col: 1 });
        break;
      case 13:
        newGridData[0][3].value = '=(A1+B1)*C1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 3 });
        break;
      case 14:
        newGridData[0][1].value = '=IF(A1>50,"Lulus","Gagal")';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 1 });
        break;
      case 15:
        newGridData[0][2].value = '=A1&" "&B1';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
      case 16:
        newGridData[0][1].value = '=LEN(A1)';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 1 });
        break;
      case 17:
        newGridData[0][1].value = '=LEFT(A1,4)';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 1 });
        break;
      case 18:
        newGridData[0][1].value = '=RIGHT(A1,5)';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 1 });
        break;
      case 19:
        newGridData[0][2].value = '=(A1+B1)/2';
        setGridData(newGridData);
        setActiveCell({ row: 0, col: 2 });
        break;
    }
  };
  
  useEffect(() => {
    if (gameState === 'playing' && !isTransitioning) {
       const timeoutId = setTimeout(() => {
        if(avatarExpression !== 'correct' && avatarExpression !== 'incorrect'){
           setAvatarExpression('idle');
        }
       }, 2000);
       return () => clearTimeout(timeoutId);
    }
  }, [gameState, avatarExpression, isTransitioning]);

  const renderStartScreen = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-pixel text-slate-800 mb-4">Excel Adventures: Master Cellvania</h1>
      <h2 className="text-xl md:text-3xl font-pixel text-blue-600 mb-12">by TanyaJawabExcel</h2>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12">
        Selamat datang, petualang pemberani! Negeri mistis Cellvania menanti. Asah logikamu, kuasai formula kuno, dan jadilah penyihir spreadsheet!
      </p>
      <button
        onClick={startGame}
        className="bg-green-500 text-white font-bold py-4 px-10 rounded-lg text-3xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-200 animate-pulse flex items-center gap-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5c.6.6 1 1.4 1 2.2V9l7 7-2.5 2.5L13 11.5v-2c0-.8-.4-1.6-1-2.2l-1.5-1.5L14.5 3.5z"></path><path d="m3 21 9-9"></path><path d="m15 3-2 2"></path></svg>
        Mulai Petualanganmu
      </button>
      <a
        href="https://saweria.co/tanyajawabexcel"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-lg text-lg shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-transform duration-200 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        Dukung Kami di Saweria
      </a>
    </div>
  );

  const renderGameScreen = () => (
    <div className="w-full p-4 md:p-8">
      <header className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 flex justify-start">
            <button
              onClick={goHome}
              disabled={isTransitioning}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-lg hover:bg-gray-600 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Kembali ke Menu
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button
              onClick={previousLevel}
              disabled={currentLevelIndex === 0 || isTransitioning}
              className="bg-purple-500 text-white font-bold p-2 rounded-lg text-sm shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <h1 className="text-lg md:text-xl font-pixel text-slate-800 text-center whitespace-nowrap px-2">{currentLevel.title}</h1>
            <button
              onClick={nextLevel}
              disabled={currentLevelIndex === LEVELS.length - 1 || isTransitioning}
              className="bg-purple-500 text-white font-bold p-2 rounded-lg text-sm shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <div className="flex-1"></div>
        </div>
        <ProgressBar current={currentLevelIndex + 1} total={LEVELS.length} />
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center p-6 bg-blue-100 rounded-xl shadow-lg border-4 border-blue-300">
          <Avatar expression={avatarExpression} />
          <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-inner w-full min-h-[8rem] flex items-center justify-center">
            <p className="text-slate-700 font-bold text-lg leading-relaxed">"{avatarMessage || currentLevel.instruction}"</p>
          </div>
        </div>

        <main className="md:col-span-2 flex flex-col items-center justify-center p-6 bg-green-100 rounded-xl shadow-lg border-4 border-green-300">
           <Spreadsheet
            gridData={gridData}
            activeCell={activeCell}
            onCellClick={handleCellClick}
            onCellValueChange={handleCellValueChange}
          />
          {feedbackMessage && (
            <div className={`mt-4 p-3 rounded-lg text-center font-bold text-white ${avatarExpression === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                {feedbackMessage}
            </div>
          )}
          <div className="flex items-center justify-center flex-wrap gap-4 mt-6">
            {currentLevel.id > 1 && (
              <button
                  onClick={checkAnswer}
                  disabled={answerShown || isTransitioning}
                  className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Periksa Jawaban
              </button>
            )}
             <button
                onClick={showHint}
                disabled={hintUsed || answerShown || isTransitioning}
                className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line><path d="M12 6a6 6 0 0 1 4.5 9.7L12 21l-4.5-5.3A6 6 0 0 1 12 6z"></path></svg>
                Petunjuk
            </button>
            <button
                onClick={showAnswer}
                disabled={answerShown || isTransitioning}
                className="bg-rose-600 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-rose-700 transform hover:scale-105 transition-transform duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Lihat Jawaban
            </button>
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
      <div className="container mx-auto max-w-7xl bg-white/50 rounded-2xl shadow-2xl my-8">
        {gameState === 'start_screen' && renderStartScreen()}
        {gameState === 'playing' && renderGameScreen()}
      </div>
      
      <FeedbackModal
        show={gameState === 'game_complete'}
        title="Petualangan Selesai!"
        message="Kamu telah menguasai dasar-dasar Cellvania! Perjalananmu sebagai Penyihir Spreadsheet baru saja dimulai."
        buttonText="Main Lagi"
        onButtonClick={retryGame}
      />
    </div>
  );
};

export default App;
