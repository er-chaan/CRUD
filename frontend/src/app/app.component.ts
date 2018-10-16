import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private fb:FormBuilder){}

  get fullName() {
    return this.registrationForm.get('fullName');
  }
  get sex() {
    return this.registrationForm.get('sex');
  }
  get birthDate() {
    return this.registrationForm.get('birthDate');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get mobile() {
    return this.registrationForm.get('mobile');
  }
  get continent() {
    return this.registrationForm.get('continent');
  }
  // get skills() {
  //   return this.registrationForm.get('fullName');
  // }
  get photo() {
    return this.registrationForm.get('photo');
  }

  registrationForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(8)]],
    sex: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, /*Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')*/ ] ],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) /*Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')*/] ],
    continent: ['', Validators.required],
    skills: this.fb.group({
      FullStack: [''],
      JokerEngineer: [''],
      SDLC: [''],
    }),
    photo: ['', Validators.required]
  });

  // registrationForm = new FormGroup({
  //   fullName: new FormControl(''),
  //   sex: new FormControl(''),
  //   birthDate: new FormControl(''),
  //   email: new FormControl(''),
  //   mobile: new FormControl(''),
  //   continent: new FormControl(''),
  //   skills: new FormGroup({
  //     FullStack: new FormControl(''),
  //     JokerEngineer: new FormControl(''),
  //     SDLC: new FormControl('')
  //   }),
  //   photo: new FormControl(''),
  // });

}
