export const userService = {
    signUp,
    login,
    editProfile,
    changePassword,
    getProfileData,
    forgotPassword,
    getMyPostsList,
    addPost,
    searchUsers,
    getOtherUserProfileData,
    sendResume
};

const header = {
    'Content-Type': 'application/json',
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

const headerWithToken = {
    'Content-Type': 'application/json',
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

const headerWithTokenForMultipart = {
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

const baseURL = "http://localhost:8010/StartupHub/api/";

function signUp(formData) {
    return fetch(baseURL + "signUp", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

function login(formData) {
    return fetch(baseURL + "login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

function getProfileData() {
    return fetch(baseURL + "viewProfile", {
        method: "POST",
        body: JSON.stringify({"secretId" : localStorage.getItem("access_token")}),
        headers: header
    });
}

function getMyPostsList() {
    return fetch(baseURL + "getUserPost", {
        method: "POST",
        body: JSON.stringify({"secretId" : localStorage.getItem("access_token")}),
        headers: header
    });
}

function editProfile(formData) {
    return fetch(baseURL + "editProfile", {
        method: "POST",
        body: formData,
        headers: headerWithTokenForMultipart
    });
}

function changePassword(formData) {
    return fetch(baseURL + "changePassword", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: headerWithToken
    });
}

function forgotPassword(formData) {
    return fetch(baseURL + "forgotPassword", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

function addPost(formData) {
    return fetch(baseURL + "addPost", {
        method: "POST",
        body: formData,
        headers: headerWithTokenForMultipart
    });
}

function searchUsers(formData) {
    return fetch(baseURL + "searchUser", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

function getOtherUserProfileData(formData) {
    return fetch(baseURL + "otherUserProfile", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

function sendResume(formData) {
    return fetch(baseURL + "sendResume", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}