const API_URL = ''
var Fetch = {
    get(path) {
        return new Promise((resolve, reject) => {
            fetch(`${API_URL}/${path}`, {
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }).then(res => {
                return handleStatus(res);
            }).then(json => {
                resolve(json);
            }).catch(err => {
                reject(err);
            });
        });
    },
    post(params) {},
}

function handleStatus(res) {
    let errors;
    switch (res.status) {
        case 200:
            return res.json();
        case 500:
            console.log("500错误");
            message.error('服务器内部错误', 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 404:
            message.error("资源不存在", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
        case 401:
            message.error("登录会话过期,请重新登录", 5)
            localStorage.removeItem("my-custom-token")
            window.location.href = '/login'
            break;
        case 403:
            message.error("无权限访问", 5)
            errors = `${res.status}, ${res.statusText}`
            throw errors
      default:
    }
}