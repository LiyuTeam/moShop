import tcb from "tcb-admin-node";

const app = tcb.init({
    env: 'shake-game-44c2a5',
    credentials: '{"private_key_id":"1e55d22b-81a9-4088-8b0b-def68e79177d","private_key":"-----BEGIN RSA PRIVATE KEY-----\\nMIICXAIBAAKBgQCm+zfn45+aIw5fcUGopN5CzwUnwHb1SNTe9W9fC1mH2TOHTLpe\\nLWFzPBimQ8Y8fn28DXpbLSh17J7kZA6+uMJCOCwLRKesjiGU6WhuHoMqq7jRVFqt\\nRcb2cYuiQrjWQCSX9T52se8REnxO0CTEuyXIl4+Mu/8rJambWlXkxNynAQIDAQAB\\nAoGAAgiBD8PHx7qxjBv27rTDOBEJQQio6ieu3+AhMQkUWAEfDYCzrD3lN9/9dNjS\\nax4nLckEOmP8YCM3dBR70XqyctLt55on7M7vZAoGXPV4b9a/W6La9qDZaRaH74OX\\nsI9CjRwBZuIOkwQd2xI2F5sQsxNDK/07AxFD56gTEfOEKdkCQQDYkyEWIVrDx45R\\n3jrGWlNYMB7GZJHiswBrUOnoYrIDOBcLw0ENtASbTlnfNEHB2mLoz+gfCVHYTnJk\\nR08rhC+jAkEAxWDsuovI2lPwUsJYnF0IWZDqTkAOnXOUhPBHlPpX5zvxp9+oBUl2\\nG8rEzKLvrNiBSKeAjeHdEBd+8VUnDhSpCwJAKGEOKy0e2h/LxjHT7YWLwoZ+Rmkb\\n1hOfwWJ9qgk0vWroyRWnfGGS9k3ebcI1fGo2RMf2tEqtitHdfBrbhPaJVwJBALtA\\nDpWTU4M9Krt4wNPmtqsx/fcqcjMRmY7c3SwKrCYlCkc2uZH6dWA8Z6Oz2ClkZJJm\\nxmDULAK+J6IQJLMJCq0CQFKXZDkhmdsSD5vWKMKp1XbJmgr2pgCrGHLMXagAn2D8\\nJKUycsIlQ4lhsqWQYCJONzoWAQDCcmpSKOPN/Ik+quA=\\n-----END RSA PRIVATE KEY-----\\n"}'
});

const auth = app.auth();

async function login() {
    // 1. 建议登录前先判断当前是否已经登录
    const loginState = await auth.getLoginState();
    if (!loginState) {
        // 2. 调用微信登录API
        await auth.weixinAuthProvider({
            appid: "wx3612408ef20b9a23",
            scope: "eccedd6d81c3bb64222ec866be80b974"
        }).signIn();
    }
}