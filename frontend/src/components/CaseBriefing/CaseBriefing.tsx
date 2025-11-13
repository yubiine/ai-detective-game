import React from 'react';
import './CaseBriefing.css'; // 3단계에서 만들 CSS 파일

// TypeScript: 이 컴포넌트가 받을 props의 타입을 정의합니다.
interface CaseData {
  title: string;
  victim: string;
  location: string;
  report: string;
}

interface CaseBriefingProps {
  caseData: CaseData;
  onAccept: () => void; // 클릭 시 아무것도 반환하지 않는 함수
  onDecline: () => void;
}

/*
 * 이 컴포넌트는 부모로부터 3개의 props를 받습니다.
 * 1. caseData: 백엔드(AI)가 생성한 사건 정보 객체
 * 2. onAccept: '사건 수락' 버튼을 눌렀을 때 실행될 함수
 * 3. onDecline: '거절' 버튼을 눌렀을 때 실행될 함수
 */
function CaseBriefing({ caseData, onAccept, onDecline }: CaseBriefingProps) {
  return (
    <div className="case-briefing-container">
      <div className="briefing-box">
        
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
            ACCEPT CASE
          </button>
          <button className="decline-button" onClick={onDecline}>
            Decline
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default CaseBriefing;