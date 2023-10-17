export class User {
  userName : string;
  userEmail : string;
  userPassword : string;
  constructor(user_name : string,
              user_email : string,
              user_password : string) {
    this.userName = user_name;
    this.userEmail = user_email;
    this.userPassword = user_password;
  }
}
