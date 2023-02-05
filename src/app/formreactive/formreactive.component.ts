import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from "./password-validators";

@Component({
  selector: 'app-formreactive',
  templateUrl: './formreactive.component.html',
  styleUrls: ['./formreactive.component.css']
})
export class FormreactiveComponent implements OnInit {
  listData: any;
  form = new FormGroup({
    acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    title: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required,Validators.pattern('[A-Za-z]+')]),
    lastName: new FormControl('', [Validators.required,Validators.pattern('[A-Za-z]+')]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]),
    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.maxLength(10),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
    ]),
    gender: new FormControl (
      'male/female'
      ),
    dob: new FormControl('', 
    [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    ]),
    password: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(15),
        PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ])
    ),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(15)
    ])
  },
  {
    validators: PasswordValidators.MatchValidator
  }
   );
    constructor() {
      this.listData = [];
     }
  
    get firstname(){
      return this.form.get('firstName')
    }
    get f() {
      return this.form.controls;
    }
  
    get passwordValid() {
      return this.form.controls["password"].errors === null;
    }
  
    get requiredValid() {
      return !this.form.controls["password"].hasError("required");
    }
  
    get minLengthValid() {
      return !this.form.controls["password"].hasError("minlength");
    }
  
    get requiresDigitValid() {
      return !this.form.controls["password"].hasError("requiresDigit");
    }
  
    get requiresUppercaseValid() {
      return !this.form.controls["password"].hasError("requiresUppercase");
    }
  
    get requiresLowercaseValid() {
      return !this.form.controls["password"].hasError("requiresLowercase");
    }
  
    get requiresSpecialCharsValid() {
      return !this.form.controls["password"].hasError("requiresSpecialChars");
    }
  
    ngOnInit() {
    }
  
    onSubmit(){
      alert(JSON.stringify(this.form.value));
      console.log('form.valid',this.form)
    }
    public addItem(): void {
      this.listData.push(this.form.value);
      this.form.reset();
    }
    
    clearForm() {
      this.form.reset();
     }
    removeItem(element) {
      alert('Do you want to delete this field?');
    this.listData.forEach((value, index) => {
      if (value == element) {
        this.listData.splice(index, 1);
      }
      });
    }

}