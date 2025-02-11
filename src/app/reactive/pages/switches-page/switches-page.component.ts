import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

   public myForm: FormGroup;

    constructor(private fb : FormBuilder ){
      this.myForm = this.fb.group({
        gender:                      ['M',Validators.required],
        wantNotifications:          [true,Validators.required],
        termsAndConditions:    [false,Validators.requiredTrue]

      })
    }

    ngOnInit(): void {
      this.myForm.reset(this.person);
    }

    public person = {
      gender: 'F',
      wantNotifications:false
    }


    onSave(){
      if(this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return;
      }

      console.log(this.myForm.value)
    }

    isValidField( field : string ):boolean | null{
      return this.myForm.controls[field].errors
          && this.myForm.controls[field].touched;
    }

}
