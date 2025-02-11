import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup;
  constructor(private fb : FormBuilder ){
    this.myForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear',Validators.required],
        ['Death Stranding',Validators.required],
      ]) ,
    })
  }

  public newFavoriteItem: FormControl = new FormControl('',Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray)  = this.fb.array([]);

  }

  onAddFavorite():void {
    if(this.newFavoriteItem.invalid) return

    const newGame = this.newFavoriteItem.value
    this.favoriteGames.push( this.fb.control( newGame  ,Validators.required) )

    this.newFavoriteItem.reset();
  }

  onDeleteFavorite( i:number){
    this.favoriteGames.removeAt(i);
  }

  isValidField( field : string ):boolean | null{
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray : FormArray , i: number) {
    return formArray.controls[i].errors
        &&  formArray.controls[i].touched;

  }

  getFieldError(field: string):string | null {

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors) ){
      switch( key){
        case 'required':
          return 'Este campo es requerido';
          case 'minlength':
            return `Requiere mas de ${errors['minlength'].requiredLength } caracteres`;
      }
    }

    return '';
  }



}
