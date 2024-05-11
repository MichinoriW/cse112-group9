class User {
    constructor(username = "" , email = ""){
        this.username = username;
        this.email = email;
    }

    getUser() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }
}