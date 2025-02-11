import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'auth-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public myForm: FormGroup;
  constructor(private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(validatorsService.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(validatorsService.emailPattern)],[this.emailValidator ]],
      username: ['', [Validators.required, validatorsService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],

    },{
      validators:[
        this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
      ]
    })
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field)
  }


  onSubmit() {
    this.myForm.markAllAsTouched();
  }



}
