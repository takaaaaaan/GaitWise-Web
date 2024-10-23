'use client';

import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

// 드래그 타입 정의
const ItemType = 'QUESTION';

// 설문 항목 타입 정의
interface Question {
  id: string;
  content: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// 설문 항목 초기 데이터
const initialQuestions: Question[] = [
  { id: '1', content: 'What is your name?' },
  { id: '2', content: 'What is your age?' },
  { id: '3', content: 'What is your occupation?' },
  { id: '4', content: 'Where do you live?' },
  { id: '5', content: 'What are your hobbies?' }
];

// 드래그 가능한 설문 항목 컴포넌트
const QuestionItem: React.FC<{
  question: Question;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
}> = ({ question, index, moveQuestion }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: DragItem) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveQuestion(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: question.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <StyledQuestionItem
      ref={ref}
      $isDragging={isDragging} // 스타일에 전달할 때 $를 붙여 DOM으로 전달되지 않게 함
    >
      {question.content}
    </StyledQuestionItem>
  );
};

// SurveyPage 컴포넌트
export default function SurveyPage() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const updatedQuestions = [...questions];
    const [movedItem] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedItem);
    setQuestions(updatedQuestions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <h2>Reorder Survey Questions</h2>
        <QuestionList>
          {questions.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              index={index}
              moveQuestion={moveQuestion}
            />
          ))}
        </QuestionList>
      </Container>
    </DndProvider>
  );
}

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const QuestionList = styled.div`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const StyledQuestionItem = styled.div<{ $isDragging: boolean }>`
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${({ $isDragging }) => ($isDragging ? '#e0e0e0' : '#fff')};
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
`;
