import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallsService } from './api-calls.service';
import { environment } from '../environments/environment';
import { CompileTemplateMetadata } from '@angular/compiler';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public apiUrl = environment.apiUrl;
  public errorMsg:any;
  public apiToken:any;
  public retrievedData = [];
  public registrationForm:any;
  public timer:any;
  public selectedFile:any;
  public newFileName:any;
  public isEdit:boolean;
  public headers:any;

  constructor(private fb:FormBuilder, private _apiCallsService: ApiCallsService){}
  ngOnInit() {
    this.errorMsg = 'x';
    this.apiToken = 'x';
    this.isEdit = false;
    this.headers = new Headers();
    this.selectedFile = null;
    this.newFileName = null;
    this.registrationForm = this.fb.group({
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
        OpenSource: [false]
      }),
      photo: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$')]],
      photoID: ['']
    });
    this.headers.append('apiToken', this.apiToken);
    this.retrieveEntry();
  //   this.loaderTrigger = true;
  //   this.getPastProcessedMetadata();
  //   this.getCurrentlyProcessingMetadata();
  //   this.getKeysModalValues();
  //   // this.loaderTrigger = false;
  //   this.interval = setInterval(() => {
  //       if(window.location.pathname == "/meta-data-reports"){
  //           this.getCurrentlyProcessingMetadata();
  //       }
  //  }, 5000);
}

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

  formReset(){
    // $('#form_id').trigger("reset");
    this.isEdit = false;
    this.registrationForm.reset();
    this.timer = setInterval(() => {
        this.errorMsg = 'x';
   }, 10000);
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  createEntry() {
    this.newFileName = Math.floor(Math.random() * 9999999999)+".jpg";
    this.registrationForm.patchValue({ photoID: String(this.newFileName) });
    let inputFile = new FormData(); 
    this.headers.append('Content-Type', 'multipart/form-data');
    inputFile.append('photo', this.selectedFile, this.newFileName);
      this._apiCallsService.uploadImage(inputFile, this.headers).
      subscribe(
        response => console.log('Success!', response),
        // error => console.log('Error!', error),
        error => {this.errorMsg = error.statusText;
                  if(this.errorMsg == "OK"){
                    this._apiCallsService.createEntry(this.registrationForm.value, this.headers).
                    subscribe(
                      response => console.log('Success!', response),
                      // error => console.log('Error!', error)
                      error => {this.errorMsg = error.statusText;
                        if(this.errorMsg == "OK"){
                        this.retrieveEntry();
                        this.formReset();
                        }
                        else{
                          this.errorMsg = error.statusText;
                        }
                      }
                    );
                  }
                  else{
                    this.errorMsg = error.statusText;
                  }
        }
      );
  }

  retrieveEntry(id=0){
    var parameters= id;
    this._apiCallsService.retrieveEntry(parameters, this.headers).
    subscribe(
      // response => console.log('Success!', response),
      response => {
        if(id == 0){
          this.isEdit = false;
          this.retrievedData = response;
        }
        if(id != 0){
          this.isEdit = true;
          var skillsArray = response[0].skills.split(",");
          // console.log($.inArray("FullStackss", skillsArray))
          var FullStackValue = true;
          if(skillsArray.indexOf("FullStack") == -1){FullStackValue=false;}
          var JokerEngineerValue = true;
          if(skillsArray.indexOf("JokerEngineer") == -1){JokerEngineerValue=false;}
          var SDLCValue = true;
          if(skillsArray.indexOf("SDLC") == -1){SDLCValue=false;}
          var OpenSourceValue = true;
          if(skillsArray.indexOf("OpenSource") == -1){OpenSourceValue=false;}
          this.formReset();
          this.registrationForm = this.fb.group({
            fullName: [response[0].fullName, [Validators.required, Validators.minLength(8)]],
            sex: [response[0].sex, Validators.required],
            birthDate: [response[0].birthDate, Validators.required],
            email: [response[0].email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ] ],
            mobile: [response[0].mobile, [Validators.required, Validators.pattern('^[0-9]{10}$')] ],
            continent: [response[0].continent, Validators.required],
            skills: this.fb.group({
              FullStack: [FullStackValue],
              JokerEngineer: [JokerEngineerValue],
              SDLC: [SDLCValue],
              OpenSource: [OpenSourceValue]
            }),
            photo: [response[0].photo, [Validators.required, Validators.pattern('([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$')]],
            photoID: [response[0].photo],
            id: [response[0].id]
          });
          // this.retrievedData = response;
        }
      },
      // error => console.log('Error!', error)
      error => this.errorMsg = error.statusText,
    );
  }

  deleteEntry(id){
    var parameters= id;
    this._apiCallsService.deleteEntry(parameters, this.headers).
    subscribe(
      // response => console.log('Success!', response),
      response => {
        if(response == "success"){
          this.retrieveEntry();
        } },
      // error => console.log('Error!', error)
      // error => this.errorMsg = error.statusText,
      error => {this.errorMsg = error.statusText;
        if(this.errorMsg == "OK"){
          this.retrieveEntry();
        }
        else{
          this.errorMsg = error.statusText;
        }
      }
    );
  }

}
