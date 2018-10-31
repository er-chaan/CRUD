import { Component } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallsService } from './api-calls.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  errorMsg = 'x';

  constructor(private fb:FormBuilder, private _apiCallsService: ApiCallsService){}

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
  get photo() {
    return this.registrationForm.get('photo');
  }

  registrationForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(8)]],
    sex: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ] ],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')] ],
    continent: ['', Validators.required],
    skills: this.fb.group({
      FullStack: [false],
      JokerEngineer: [false],
      SDLC: [false],
    }),
    photo: ['', Validators.required]
  });
 
  selectedFile = null;
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let inputFile = new FormData(); 
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    inputFile.append('photo', this.selectedFile);
      this._apiCallsService.uploadImage(inputFile, headers).
      subscribe(
        response => console.log('Success!', response),
        // error => console.log('Error!', error),
        error => {this.errorMsg = error.statusText;
          alert(this.errorMsg);
                  if(this.errorMsg == "OK"){
                    this._apiCallsService.createEntry(this.registrationForm.value, headers).
                    subscribe(
                      response => console.log('Success!', response),
                      // error => console.log('Error!', error)
                      error => this.errorMsg = error.statusText
                    );
                  }
                  else{
                    this.errorMsg = error.statusText;
                  }
        }
      );
      
      if(call == "OK"){
        
      }
  }

}
