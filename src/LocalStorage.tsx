const REGISTERED_USERS = "registeredUsers";

export interface IUserModel {
    username: string;
    email: string;
    password: string;
}

const addNewUser = (user: IUserModel) => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || "[]";
    const users = JSON.parse(userStr) as IUserModel[];
    users.push(user);
    localStorage.setItem(REGISTERED_USERS, JSON.stringify(users));
};

const isUserRegistered = (username: string) => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if (userStr == null) return false;
    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(x => x.username == username);
    return foundUser != null;
};

export { addNewUser, isUserRegistered };