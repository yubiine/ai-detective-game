import React, { useState, useEffect } from 'react';

// 1. 우리가 만든 컴포넌트들을 모두 임포트합니다.
import MainMenu from './components/MainMenu/MainMenu';
import CaseBriefing from './components/CaseBriefing/CaseBriefing';
// (나중에 LoadGame, Credits 화면도 여기에 추가)

import './App.css'; 

// 2. 화면 상태를 문자로 관리 (TypeScript의 장점)
type ScreenState = "MAIN_MENU" | "CASE_BRIEFING" | "LOAD_GAME" | "CREDITS";

// 3. CaseData 타입을 App.tsx (부모)에서도 알 수 있게 정의합니다.
interface CaseData {
  title: string;
  victim: string;
  location: string;
  report: string;
}

function App() {
  // 4. (중요) 현재 화면이 무엇인지 상태로 저장. 시작은 'MAIN_MENU'
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("MAIN_MENU");

  // CaseBriefing 컴포넌트가 사용할 상태들
  const [caseData, setCaseData] = useState<CaseData | null>(null); 
  const [isLoading, setIsLoading] = useState(false); // 처음엔 로딩 안 함

  // --- 백엔드 API 대신 사용할 가짜 데이터 로드 함수 ---
  const loadNewCase = () => {
    setIsLoading(true);
    
    const mockData: CaseData = {
      title: "CASE 101: THE SILICON SNATCHER",
      victim: "Dr. Aris Thorne",
      location: "Neo-Sector 7, Cyb-Tech Labs",
      report: "Prominent AI researcher found unconscious. Key research data (Project 'Chimera') stolen."
    };
    
    setTimeout(() => {
      setCaseData(mockData);
      setIsLoading(false);
      // (중요) 데이터 로드가 끝나면 화면을 브리핑으로 전환!
      setCurrentScreen("CASE_BRIEFING"); 
    }, 500);
  };
  
  // --- 버튼 클릭 핸들러 함수들 ---
  
  // 1. MainMenu가 "NEW GAME" 버튼 클릭 시 호출할 함수
  const handleNewGame = () => {
    console.log("새 게임 시작!");
    loadNewCase(); // 가짜 데이터 로드 시작
  };

  // 2. CaseBriefing이 "ACCEPT" 버튼 클릭 시 호출할 함수
  const handleAcceptCase = () => {
    if (caseData) {
      console.log("Case Accepted:", caseData.title);
      // TODO: '용의자 목록 화면'으로 이동하는 로직 구현
      // 예: setCurrentScreen("SUSPECT_LIST");
    }
  };

  // 3. CaseBriefing이 "DECLINE" 버튼 클릭 시 호출할 함수
  const handleDeclineCase = () => {
    console.log("Case Declined. Main Menu로 복귀.");
    setCurrentScreen("MAIN_MENU"); // 메인 메뉴로 돌아가기
  };

  // 4. MainMenu가 "LOAD GAME" 버튼 클릭 시 호출할 함수
  const handleLoadGame = () => {
    console.log("Load Game 클릭!");
    // setCurrentScreen("LOAD_GAME");
  };

  // 5. MainMenu가 "CREDITS" 버튼 클릭 시 호출할 함수
  const handleCredits = () => {
    console.log("Credits 클릭!");
    // setCurrentScreen("CREDITS");
  };

  
  // --- 현재 화면 상태에 따라 다른 컴포넌트를 렌더링 ---
  const renderScreen = () => {
    
    if (isLoading) {
      return <div className="loading-screen">Loading New Case...</div>;
    }

    switch (currentScreen) {
      case "MAIN_MENU":
        return (
          <MainMenu 
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
            onCredits={handleCredits}
          />
        );
        
      case "CASE_BRIEFING":
        // caseData가 아직 로드 안됐을 수도 있으니 방어 코드
        if (!caseData) {
          // 혹시 모를 오류 시 메인 메뉴로 복귀
          setCurrentScreen("MAIN_MENU");
          return null; 
        }
        return (
          <CaseBriefing 
            caseData={caseData} 
            onAccept={handleAcceptCase} 
            onDecline={handleDeclineCase} 
          />
        );
        
      // case "LOAD_GAME":
      //   return <LoadGameScreen />;
      // case "CREDITS":
      //   return <CreditsScreen />;
        
      default:
        // 혹시 모를 오류 시 메인 메뉴로 복귀
        return <MainMenu 
          onNewGame={handleNewGame}
          onLoadGame={handleLoadGame}
          onCredits={handleCredits}
        />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;