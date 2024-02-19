import React, {useState} from 'react';

const LeftBar = ({ onChapterClick }) => {

  const [selectedChapter, setSelectedChapter] = useState('');

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    onChapterClick(chapter);
  };

  return (
    <div className ="chapters" style={{ position: 'sticky', top: '90px' }}>
      <div className="list-group">
        <h4 className="list-group-item rounded shadow-sm" style={{ backgroundColor: '#e3f2fd' }}><i className="bi bi-journal-bookmark-fill"></i> Chapters </h4>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick('')}>All Chapters</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(1)}>Chapter 1 - Introduction to Artificial Intelligence (AI)</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(2)}>Chapter 2 - Fundamentals of AI</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(3)}>Chapter 3 - See</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(4)}>Chapter 4 - Hear</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(5)}>Chapter 5 - Speak</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(6)}>Chapter 6 - Read</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(7)}>Chapter 7 - AI Reasoning</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(8)}>Chapter 8 - Simulation</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(9)}>Chapter 9 - Think and Create </span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(10)}>Chapter 10 - Social Good, Social Impacts and Challenges of AI</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(11)}>Chapter 11 - AI and Ethics</span>
        <span  className="list-group-item list-group-item-action" onClick={() => handleChapterClick(12)}>Chapter 12 - AI and Future of Work</span>
      </div>
    </div>
  );
};

export default LeftBar;