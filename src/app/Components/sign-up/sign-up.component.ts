import {Component} from '@angular/core';
import {
  Validators, FormGroup, FormBuilder,
} from '@angular/forms';

import {Router, RouterLink} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../Model/user";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  //standalone: true,
  //imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatCheckboxModule, MatAutocompleteModule, RouterLink],
})
export class SignUpComponent{
  protected signUpForm: FormGroup;
  private signedUpUsers : User[] = [];

  constructor(private appComponent: AppComponent, private fb: FormBuilder, private router: Router) {
    this.appComponent.showNavbar = false;

    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword : ['', Validators.required]
    });
  }
  protected get userNameControl() {
    return this.signUpForm.get('userName');
  }
  protected get userEmailControl(){
    return this.signUpForm.get('userEmail');
  }
  protected get userPasswordControl() {
    return this.signUpForm.get('userPassword');
  }

  private setSignUpFormData(signUpFormData: User):void {
    let user: User = new User(signUpFormData.userName, signUpFormData.userEmail, signUpFormData.userPassword )
    this.signedUpUsers.push(user);
    console.log(this.signedUpUsers)
  }
  private storeSignedUpUserInLocalStorage(signed_up_users : Array<User>){
    localStorage.setItem('signedUpUsers', JSON.stringify(signed_up_users))

  }
  protected onSubmit() : void {
    console.log("btn clicked", this.signUpForm.value);
    this.setSignUpFormData(this.signUpForm.value)
    this.storeSignedUpUserInLocalStorage(this.signedUpUsers);
    this.router.navigate(['/sign_in']);
  }
}

