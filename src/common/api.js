const LOCAL_URL = `http://localhost:1212/api`
const request = require('supertest')(LOCAL_URL);



const makeRequest = (method) => (url, {token, body} = {}) => {
    return new Promise((resolve) => {
        request[method](url)
            .send(body)
            .set("Authorization", token ? `Bearer ${token}` : "")
            .end((err, res) => {
                resolve(res)
            })
    })
}

module.exports = {
    get: makeRequest("get"),
    post: makeRequest("post"),
    put: makeRequest("put"),
    deleted: makeRequest("delete")
}
