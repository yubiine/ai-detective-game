import React, { useState, useEffect } from 'react';

// MainMenu 컴포넌트만 임포트합니다. (CaseBriefing은 MainMenu 안으로 합쳐집니다)
import MainMenu from './components/MainMenu/MainMenu';
import './App.css'; 

// CaseData 타입을 App.tsx (부모)에서도 알 수 있게 정의합니다.
// (나중에 types.ts 같은 별도 파일로 빼도 좋습니다)
export interface CaseData {
  title: string;
  victim: string;
  location: string;
  report: string;
}

function App() {
  // 1. (수정) currentScreen 상태가 제거됩니다.
  
  // 2. "사라지는" 애니메이션이 재생 중인지 관리 (이 상태는 MainMenu가 사용)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // 3. CaseBriefing가 아니라 MainMenu가 사용할 사건 데이터
  const [caseData, setCaseData] = useState<CaseData | null>(null); 
  // const [isLoading, setIsLoading] = useState(false); // <-- (1. 삭제) isLoading 상태가 더 이상 필요 없습니다.

  // --- 백엔드 API 대신 사용할 가짜 데이터 로드 함수 ---
  const loadNewCase = () => {
    // setIsLoading(true); // <-- (2. 삭제)
    
    const mockData: CaseData = {
      title: "CASE 101: THE SILICON SNATCHER",
      victim: "Dr. Aris Thorne",
      location: "Neo-Sector 7, Cyb-Tech Labs",
      report: "Prominent AI researcher found unconscious. Key research data (Project 'Chimera') stolen."
    };
    
    // (CSS 애니메이션 시간 500ms + 데이터 로딩 시간 500ms)
    // setTimeout(() => { // <-- (3. 삭제) "가짜" API 로딩 시간을 제거합니다.
      // 4. (중요) 화면을 바꾸는 대신, caseData 상태만 설정합니다.
      setCaseData(mockData); 
      // setIsLoading(false); // <-- (4. 삭제)
      
      // 5. (중요) isAnimatingOut을 true로 유지하여 "사건 일지"가 보이도록 합니다.
      //    (만약 false로 바꾸면 메뉴가 다시 나타납니다)
    // }, 500); // 0.5초 <-- (5. 삭제)
  };
  
  // --- 버튼 클릭 핸들러 함수들 ---
  
  // (수정됨) MainMenu가 "NEW GAME" 버튼 클릭 시 호출할 함수
  const handleNewGame = () => {
    console.log("새 게임 시작! 애니메이션 시작...");
    
    setIsAnimatingOut(true); 

    setTimeout(() => {
      console.log("애니메이션 종료. 사건 로딩 시작...");
      loadNewCase();
    }, 500); // CSS 애니메이션 시간
  };

  // (새로 추가) '사건 일지'의 "ACCEPT" 버튼 클릭 시
  const handleAcceptCase = () => {
    if (caseData) {
      console.log("Case Accepted:", caseData.title);
      // TODO: '용의자 목록 화면'으로 이동하는 로직 구현
      // 예: setCurrentScreen("SUSPECT_LIST"); (새로운 상태 추가)
    }
  };

  // (새로 추가) '사건 일지'의 "DECLINE" 버튼 클릭 시 (메인 메뉴로 복귀)
  const handleDeclineCase = () => {
    console.log("Case Declined. Main Menu로 복귀.");
    // 1. 사건 데이터를 null로 만들어 '사건 일지'를 숨깁니다.
    setCaseData(null); 
    // 2. 애니메이션 상태를 false로 바꿔 '메뉴'가 다시 나타나게 합니다.
    setIsAnimatingOut(false); 
  };

  const handleLoadGame = () => { console.log("Load Game 클릭!"); };
  const handleCredits = () => { console.log("Credits 클릭!"); };

  
  // --- 렌더링 ---
  
  /* (6. 삭제) isLoading을 체크하는 if 블록 전체를 삭제합니다.
  if (isLoading) {
    return null; 
  }
  */

  // (수정) 이제 App.tsx는 *항상* MainMenu 컴포넌트만 렌더링합니다.
  // 대신, 모든 상태와 데이터를 props로 전달합니다.
  return (
    <div className="App">
      <MainMenu 
        onNewGame={handleNewGame}
        onLoadGame={handleLoadGame}
        onCredits={handleCredits}
        
        isAnimatingOut={isAnimatingOut}
        
        caseData={caseData} // (새로 전달!)
        
        onAcceptCase={handleAcceptCase} // (새로 전달!)
        onDeclineCase={handleDeclineCase} // (새로 전달!)
      />
    </div>
  );
}

export default App;