import { json } from "@sveltejs/kit";
import type { ColorEnum, Questionnaire } from "./models";
import { UserId } from "$lib/stores";

const ApiUrl = "http://localhost:5032/"

export async function GetHealthCheck(id: string): Promise<Questionnaire> {
    let response = await fetch(ApiUrl + "healthcheck/get/" + id,
        {
            mode: 'cors',
            method: 'GET'
        });

    let js = await response.json();
    UserId.set(js.userId)
    return js;
}

export async function UpdateAnswer(data: {
    questionId: number, userId: number,
    answerColor: ColorEnum,
    comment: string,
    isFlagged: boolean
}) {
    let response = await fetch(ApiUrl + "answer/set",
        {
            headers: {
                'Content-Type': "application/json"
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data)
        });
}

export async function CompleteComment(comment: string, questionTitle: string): Promise<string> {
    let response = await fetch(ApiUrl + "complete/comment", {
        headers: {
            'Content-Type': "application/json"
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ "comment": comment, "questionTitle": questionTitle })
    });
    return (await response.json()).commentaar;
}

export async function GetUserInfo(id: string): Promise<{ userId: number, name: string }> {
    let response = await fetch(ApiUrl + "healthcheck/user?link=" + id,
        {
            mode: 'cors',
            method: 'GET'
        });

    let js = await response.json();
    return js;
}