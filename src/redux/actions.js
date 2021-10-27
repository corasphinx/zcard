import { Client } from './api';
import {
    SET_CURRENT_USER,
} from './types';

function convertParams(req) {
    var params = new URLSearchParams();
    Object.keys(req).forEach(function (k) {
        params.append(k, req[k]);
    });
    return params;
}

export function SetCurrentUser(dispatch, user) {
    dispatch({
        type: SET_CURRENT_USER,
        user: user
    })
}

export function CallController(controller, req, successcb, errorcb, getData = false) {
    Client.post(controller, convertParams(req))
        .then(res => {
            if (res.data.success) {
                if (successcb) {
                    if (getData)
                        successcb(res.data.data)
                    else
                        successcb(res.data.message)
                }
            } else {
                if (errorcb) errorcb(res.data.message);
            }
        })
        .catch(error => {
            console.error(`ACTION : ${controller} error => `, error);
            if (errorcb) errorcb(error);
        });
}

export function CallClassFunction(className, funcName, reqArray, successcb, errorcb) {
    Client.post(`/Chatter/App/call_class_function.php`,
        convertParams({
            class: className,
            func: funcName,
            params: JSON.stringify(reqArray)
        }))
        .then(res => {
            if (res.data.success) {
                if (successcb) successcb(res.data.data);
            } else {
                if (errorcb) errorcb(res.data.message);
            }
        })
        .catch(error => {
            console.error(`ACTION : ${funcName} error => `, error);
            if (errorcb) errorcb(error);
        });
}

export function SignIn(dispatch, req, successcb, errorcb) {
    Client.post(`/Login/login.php`, convertParams(req))
        .then(res => {
            if (res.data.success) {
                SetCurrentUser(dispatch, res.data.data.Account);
                if (successcb) successcb(res.data.data.Account);
            } else {
                if (errorcb) errorcb(res.data.msg);
            }
        })
        .catch(error => {
            console.error("ACTION : SignIn error => ", error);
            if (errorcb) errorcb("server error");
        });
}

export function SignOut() {
    Client.post(`/Login/logout.php`)
        .then(res => {
        })
        .catch(error => {
            console.error("ACTION : SignOut error => ", error);
        });
}