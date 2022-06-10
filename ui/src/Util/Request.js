import axios from "axios";

function sendRequest(method, url, data) {
    return axios({
        method,
        url,
        data
    });
}

export default class Request {

    static get(path, query) {
        return sendRequest("get", path, query)
    }

    static post(path, data) {
        return sendRequest("post", path, data)
    }
}