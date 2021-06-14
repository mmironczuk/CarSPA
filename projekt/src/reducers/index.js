import { combineReducers, createStore } from "redux";
import {car} from "./car";
import {client} from "./client";
import {borrow} from "./borrow";

export const reducers=combineReducers({
    car,
    client,
    borrow,
})