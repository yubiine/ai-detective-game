import React from 'react';
import './MainMenu.css';
import folderImage from './image_cae50c.png';
// App.tsx로부터 CaseData 타입을 임포트합니다.
import type { CaseData } from '../../App'; 

// TypeScript: 부모(App.tsx)로부터 받을 함수들의 타입을 정의
interface MainMenuProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onCredits: () => void;
  isAnimatingOut: boolean;
  
  // (새로 추가!) App.tsx로부터 이 prop들을 받습니다.
  caseData: CaseData | null;
  onAcceptCase: () => void;
  onDeclineCase: () => void;
}

// 1. (새로 추가) '사건 일지' 뷰를 위한 별도 컴포넌트
// (MainMenu.css의 스타일을 재사용합니다)
const BriefingContent: React.FC<{ 
  caseData: CaseData;
  onAccept: () => void;
  onDecline: () => void;
}> = ({ caseData, onAccept, onDecline }) => {
  return (
    <div className="briefing-view content-fade-in">
      <h1 className="briefing-title">{caseData.title}</h1>
      <h2 className="briefing-subtitle">CASE FILE / CONFIDENTIAL</h2>
      
      <div className="briefing-content">
        <p>
          <strong>Victim:</strong> {caseData.victim}
        </p>
        <p>
          <strong>Location:</strong> {caseData.location}
        </p>
        <p>
          <strong>Initial Report:</strong>
          <span className="report-text">
            {caseData.report}
          </span>
        </p>
      </div>
      
      <div className="briefing-actions">
        <button className="accept-button" onClick={onAccept}>
          수락 
        </button>
        <button className="decline-button" onClick={onDecline}>
          거절 
        </button>
      </div>
    </div>
  );
};

// 2. (새로 추가) '메뉴' 뷰를 위한 별도 컴포넌트
const MenuContent: React.FC<{
  onNewGame: () => void;
  onLoadGame: () => void;
  onCredits: () => void;
}> = ({ onNewGame, onLoadGame, onCredits }) => {
  return (
    <div className="menu-view content-fade-in">
      <h1 className="menu-title-ko">사건 파일</h1>
      <h2 className="menu-subtitle-ko">진실을 파헤칠 시간입니다.</h2>

      <div className="menu-button-group">
        <button className="menu-button" onClick={onNewGame}>
          새 게임 시작 
        </button>
        <button className="menu-button" onClick={onLoadGame}>
          이어하기 
        </button>
        <button className="menu-button" onClick={onCredits}>
          제작진 
        </button>
      </div>
    </div>
  );
};


function MainMenu({ 
  onNewGame, 
  onLoadGame, 
  onCredits, 
  isAnimatingOut,
  caseData,
  onAcceptCase,
  onDeclineCase
}: MainMenuProps) {

  // (수정) isAnimatingOut은 이제 *폴더 줌* 효과만 제어합니다.
  const folderAreaClasses = `menu-folder-area ${
    isAnimatingOut ? 'folder-zoom-active' : ''
  }`;
  
  // (수정) isAnimatingOut은 이제 *메뉴 사라짐* 효과만 제어합니다.
  const menuContentClasses = `folder-content ${
    isAnimatingOut ? 'content-fade-out' : ''
  }`;
  
  return (
    <div className="main-menu-container">
      <div className={folderAreaClasses}>
        <img src={folderImage} className="folder-background" alt="File Folder" />

        {/* (중요!) 
          caseData가 있으면 '사건 일지'를,
          caseData가 null이면 '메뉴'를 렌더링합니다.
        */}
        {caseData ? (
          // 3. '사건 일지' 렌더링
          <div className="folder-content">
            <BriefingContent 
              caseData={caseData} 
              onAccept={onAcceptCase} 
              onDecline={onDeclineCase} 
            />
          </div>
        ) : (
          // 4. '메인 메뉴' 렌더링 (애니메이션 클래스 적용)
          <div className={menuContentClasses}>
            <MenuContent 
              onNewGame={onNewGame} 
              onLoadGame={onLoadGame} 
              onCredits={onCredits} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainMenu;