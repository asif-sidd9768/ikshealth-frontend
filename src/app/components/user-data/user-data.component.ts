import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})

export class UserDataComponent implements OnInit {
  // private modalService = inject(NgbModal);
  modalRef: any
  closeResult = '';
  allUsers: User [] = []
  showModal = false
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  constructor(private userService: UserDataService, private modalService: NgbModal){}

  async ngOnInit() {
    this.sub = this.userService.users$.subscribe((users) => {
      this.allUsers = users;
    });
  }

  open(content: any) {
    this.modalRef = this.modalService.open(RegisterFormComponent, {size: 'lg', windowClass: 'modal-xl'})
    this.modalRef.componentInstance.user = content;

    this.modalRef.componentInstance.passEntry.subscribe(async (updatedUser: User) => {
      // Handle the updated user data as needed
      await this.userService.updateUserService(updatedUser)
      // You can update your user list or perform other actions here
    });

    this.modalRef.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

}
