import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FileUploadService } from './services/file-upload.service';
import { UserDataComponent } from './components/user-data/user-data.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterFormComponent, UserDataComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  selectedFile : File | null = null

  constructor(private userService: UserDataService){}

  async ngOnInit() {
      await this.userService.loadUserData()
  }

  onFileSelected(event: any) : void {
    this.selectedFile = event.target.files[0]
  }
}
