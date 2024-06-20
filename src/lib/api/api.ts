import { ColorEnum, type Questionnaire } from "./models";
import { UserHealthChecks, UserStore } from "$lib/stores";
import { get } from "svelte/store";

const ApiUrl = "http://localhost:5032/"

async function UpdateUser(healthCheckUrl: string) {
    let user = await GetUserInfo(healthCheckUrl);
    UserStore.set(user);
    UserHealthChecks.set(await GetAllHealthChecks(user.userId))
}

export async function GetHealthCheck(id: string): Promise<Questionnaire> {
    let response = await fetch(ApiUrl + "healthcheck/get/" + id,
        {
            mode: 'cors',
            method: 'GET'
        });

    let js = await response.json();
    UpdateUser(id)
    return js;
}

export async function UpdateAnswer(data: {
    questionId: number, userId: number,
    answerColor: ColorEnum | null,
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
            body: JSON.stringify({
                questionId: data.questionId, userId: data.userId, answer: {
                    answerColor: data.answerColor,
                    comment: data.comment,
                    isFlagged: data.isFlagged
                }
            })
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

export async function GetAllHealthChecks(userId: number): Promise<Array<Questionnaire>> {
    let response = await fetch(ApiUrl + "healthcheck/getall?userId=" + userId,
        {
            mode: 'cors',
            method: 'GET'
        });

    let js = await response.json();
    return js;
}

export async function GetLinkFromIdAndVersion(id: number, version: number) {
    let response = await fetch(ApiUrl + "healthcheck/id_to_link?HealthCheckId=" + id + "&Version=" + version + "&UserId=" + get(UserStore)?.userId,
        {
            mode: 'cors',
            method: 'GET'
        });

    let js = await response.json();
    return js;
}

export async function SubmitHealthCheck(id: number, version: number) {
    let response = await fetch(ApiUrl + "healthcheck/submit/" + id,
        {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                "id": id,
                "version": version,
                "userId": get(UserStore)?.userId
            })
        });
}