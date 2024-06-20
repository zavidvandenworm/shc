export interface Company {
    name: string;
    logo: string;
}

export enum ColorEnum {
    Green = 2,
    Yellow = 1,
    Red = 3,
}

export interface Answer {
    id: number,
    answerColor: ColorEnum | null,
    comment: string,
    isFlagged: boolean
}

export interface Question {
    id: number;
    title: string;
    description: string | null;
    answer: Answer;
}

export interface Questionnaire {
    id: number;
    title: string;
    description: string;
    isSubmitted: boolean;
    versionId: number;
    company: Company;
    questions: Array<Question>;
}

export interface User {
    userId: number,
    name: string
}