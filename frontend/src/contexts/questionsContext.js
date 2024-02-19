import React, { createContext, useReducer } from 'react';

export const QuestionsContext = createContext();

export const questionsReducer = (state, action) => { 
  switch(action.type){
    case 'SET_ALLQUESTIONS':
      return {
        questions: action.payload // an array of question is passed into the dispatch fucntion
      }
    case 'CREATE_QUESTION':
      return {
        questions: [action.payload, ...state.questions] // a single new question object
      }
    case 'DELETE_QUESTION':
      return {
        questions: [state.questions.filter((q) => q._id !== action.payload._id )]
      }
    default:
      return state
  }
}

export const QuestionsContextProvider = (props) => {
  const [state, dispatch] = useReducer(questionsReducer, { questions: [] });

  return(
    <QuestionsContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </QuestionsContext.Provider>
  );
}

