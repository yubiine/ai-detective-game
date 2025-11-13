import React from 'react';
import './MainMenu.css';
// 사용자가 제공한 파일 폴더 이미지를 임포트합니다.
// 이 이미지를 frontend/src/components/MainMenu/ 폴더 안에 복사해주세요.
import folderImage from './image_cae50c.png'; 

// TypeScript: 부모(App.tsx)로부터 받을 함수들의 타입을 정의
interface MainMenuProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onCredits: () => void;
}

function MainMenu({ onNewGame, onLoadGame, onCredits }: MainMenuProps) {
  return (
    // 'main-menu-container'는 책상/책장 배경입니다.
    <div className="main-menu-container">
      

      {/* 중앙의 파일 폴더와 메뉴 버튼들 */}
      <div className="menu-folder-area">
        
        {/* 뒤에 깔리는 파일 폴더 이미지 */}
        <img src={folderImage} className="folder-background" alt="File Folder" />

        {/* 파일 폴더 위에 겹쳐질 내용 (종이 부분) */}
        <div className="folder-content">
          
            <h1 className="menu-title-ko">사건 파일</h1>
            <h2 className="menu-subtitle-ko">진실을 파헤칠 시간입니다.</h2>
          
          <div className="menu-button-group">
            <button className="menu-button" onClick={onNewGame}>
              새 게임
            </button>
            <button className="menu-button" onClick={onLoadGame}>
                불러오기
            </button>
            <button className="menu-button" onClick={onCredits}>
                크레딧
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;