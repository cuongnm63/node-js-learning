const api = require("../common/api");

test('Get list user without permission', async () => {
    const response = await api.get("/user");
    expect(response.status).toBe(401);
});



test('Login with invalid username and password', async () => {

    const data = {
        username: "cuonggg",
        password: "111"
    }

    const response = await api.post(`/login`, {body: data});
    expect(response.status).toBe(401)
});

test('Login successfully and user token to received data', async () => {

    const data = {
        username: "cuongnguyen",
        password: "123123"
    }

    const response = await api.post(`/login`, {body: data});
    const token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
            name: expect.any(String),
            username: expect.any(String),
            id: expect.any(Number)
        })
    }));


    const responseUsers = await api.get("/user", {token: token});
    expect(responseUsers.status).toBe(200);
    expect(responseUsers.body).toEqual(expect.arrayContaining([expect.objectContaining({
        name: expect.any(String),
        username: expect.any(String),
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
    })]));


});

