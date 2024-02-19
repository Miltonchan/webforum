import { QuestionsContext } from "../contexts/questionsContext";
import { useContext } from "react";

export const useQuestionsContext = () => {
    const context = useContext(QuestionsContext);

    if (!context) {
        throw Error('useQuestionsContext must be used inside a questionsContextProvider')
    }

    return context
}