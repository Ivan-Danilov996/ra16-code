import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { CHANGE_SEARCH_FIELD, CLEAR_LIST, SEARCH_SKILLS_REQUEST } from '../actions/actionTypes';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, clearListSuccess, changeSearchField, clearList } from '../actions/actionCreators';
import {  of, throwError } from 'rxjs';

export const changeSearchEpic = action$ => action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(o =>o !== ''),
    debounceTime(100),
    map(o => {
        return searchSkillsRequest(o)
    })
)

export const clearListEpic = action$ => action$.pipe(
    ofType(CLEAR_LIST),
    switchMap(() => of(searchSkillsEpic())).pipe(
        map(o => throwError(new Error('cancel'))),
        catchError(e => of(searchSkillsFailure(e)))
    )
)


export const searchSkillsEpic = action$ => action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map(o => o.payload.search),
    map(o => new URLSearchParams({ q: o })),
    switchMap(o => ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
        map(o => searchSkillsSuccess(o)),
        catchError(e => of(searchSkillsFailure(e))),
    )),
);
