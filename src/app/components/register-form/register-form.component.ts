import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { calculateAge } from '../../utils/calculateAge';
import { LocationFinderService } from '../../services/location-finder.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrintErrorComponent } from '../print-error/print-error.component';
import { City, Country, State } from '../../models/location.model';
import { User } from '../../models/user.model';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, PrintErrorComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  @Input() user!: User
  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  constructor(private uploadService: FileUploadService,
    private locationService: LocationFinderService, private userService: UserDataService,
    @Optional() private activeModal: NgbActiveModal){}

  allCountries: Country[] = []
  allStates: State [] = []
  allCities: City [] = []

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('+91', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    designation: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', [Validators.required]),
    age: new FormControl(),
    photo: new FormControl('', !this.user ? Validators.required : null),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")])
  })

  async ngOnInit() {
    if(this.user){
      this.profileForm.controls['photo'].clearValidators();
    }
    this.allCountries = await this.locationService.getAllCountries()

    if (this.user) {
      this.profileForm?.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        contactNumber: this.user.contactNumber,
        designation: this.user.designation,
        gender: this.user.gender,
        dob: new Date(this.user.dob).toISOString().split('T')[0],
        age: this.user.age,
        // photo: this.user.photo,
        country: this.user.country, // Assuming this.user.country is an ISO code or name
        state: this.user.state,     // Assuming this.user.state is an ISO code or name
        city: this.user.city,       // Assuming this.user.city is a city name
        pinCode: this.user.pinCode.toString(),
      });
      // Fetch states and cities based on the selected country and state
      if (this.user.country) {
        this.allStates = await this.locationService.getAllStates(this.user.country);
      }

      if (this.user.country && this.user.state) {
        this.allCities = await this.locationService.getAllCities(this.user.country, this.user.state);
      }
    }
  }


  calculateAgeFromDob(event:any){
    const dateOfBirth = event.target.value
    const age = calculateAge(dateOfBirth)
    this.profileForm.patchValue({age: age})
  }

  onImageChange(event: any) {
    const file = event.target.files[0]
    this.profileForm.patchValue({photo: file})
  }

  async onCountryChange() {
    this.allStates = []
    this.allCities = []
    const countryValue = this.profileForm.get('country')?.value
    this.allStates = await this.locationService.getAllStates(countryValue)
  }

  async onStateChanged() {
    this.allCities = []
    const countryValue = this.profileForm.get('country')?.value
    const stateValue = this.profileForm.get('state')?.value
    this.allCities = await this.locationService.getAllCities(countryValue, stateValue)
  }

  async onSubmit(){
    const formData = new FormData();

    // Append form values to the FormData
    Object.keys(this.profileForm.value).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value);
    });

    const response = await this.uploadService.uploadFile(formData)
    const {result} = await response.json()
    if (result) {
      this.userService?.updateUsers(result);
    }
    // Append the photo separately
  }

  updateUser() {
    const formData = new FormData()
    Object.keys(this.profileForm.value).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value);
    });
    formData.append('id', this.user.id.toString())
    this.passEntry.emit(formData);
    this.activeModal.close(this.user);
  }
}
