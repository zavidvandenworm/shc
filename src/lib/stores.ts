import { writable } from "svelte/store";
import type { Questionnaire, User } from "./api/models";

export let UserStore = writable<User | null>();
export let UserHealthChecks = writable<Array<Questionnaire> | null>();