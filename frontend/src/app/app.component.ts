import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm = new FormGroup({
    fullName: new FormControl(''),
    sex: new FormControl(''),
    birthDate: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    continent: new FormControl(''),
    skills: new FormControl(''),
    photo: new FormControl(''),
  });
}
