import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../Model/user";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  protected signInForm : FormGroup
  private signedInUsers : Array<User> = []

  constructor(private appComponent: AppComponent, private fb: FormBuilder, private router: Router) {
    this.appComponent.showNavbar = false;
    this.signInForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });

  }
  protected get userEmailControl(){
    return this.signInForm.get('userEmail');
  }
  protected get userPasswordControl(){
    return this.signInForm.get('userPassword');
  }

  private setSignInFormData(signInFormData: User):void {
    let user: User = new User(signInFormData.userName, signInFormData.userEmail, signInFormData.userPassword )
    const isUserExist: User | undefined = this.signedInUsers.find(usr => usr.userEmail == user.userEmail && usr.userPassword == user.userPassword);
    if(isUserExist != undefined){
      this.appComponent.showNavbar = true;
      this.router.navigate(['/homepage']);    }
    else {
      alert("Error : Email or Password incorrect")
    }
  }
  protected onSubmit():void{
    this.setSignInFormData(this.signInForm.value)
  }
  public ngOnInit(): void {
    const localData : string | null = localStorage.getItem('signedUpUsers');
    if(localData != null){
      this.signedInUsers = JSON.parse(localData)
      console.log("the user that signed in",this.signedInUsers);
    }
  }
}
