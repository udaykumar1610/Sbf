import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userData: any = {
    email: '',
    designation: '',
    mobilenumber: '',
    division: '',
    office: '',
    level: '',
    payband: '',
    running_allowance: '',
    familyData: [] // Only this array will be updated
  };

  employeeData: any;
  userId!: number;
  isLoading: boolean = false;
  errorMessage: string = '';
  hrms: any;
  user_id: any;

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.hrms = localStorage.getItem('hrmsId');
    console.log("HRMS Edit:", this.hrms);

    this.getId();
  }

  // Fetch the user ID based on HRMS ID
  getId() {
    this.authService.getUsers().subscribe(
      (data) => {
        const filteredUsers = data.filter((user: any) => user.hrms_id === this.hrms);
        if (filteredUsers.length > 0) {
          this.user_id = filteredUsers[0].id;
          this.getUserDetails();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No User Found', detail: 'No user found with the specified HRMS ID' });
        }
      },
      (error) => {
        console.error("Error fetching users:", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch users' });
      }
    );
  }

  // Fetch user details
  getUserDetails() {
    this.isLoading = true;
    this.authService.getUserById(this.user_id).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.userData = response.data;
          this.messageService.add({ severity: 'success', summary: 'Data Loaded', detail: 'User data fetched successfully' });
        }
        this.isLoading = false;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch user data' });
        this.isLoading = false;
      }
    );
  }

  // Add a new family member
  addFamilyMember() {
    const newFamilyMember = {
      dependent_name: '',
      relationship: '',
      age_dob: '',
      remarks: '',
      isNew: true
    };
    this.userData.familyData.push(newFamilyMember);
  }

  // Delete a family member (only removes from UI, doesn't delete from DB)
  deleteFamily(index: number) {
    this.userData.familyData.splice(index, 1);
    this.messageService.add({ severity: 'info', summary: 'Removed', detail: 'Family member removed' });
  }

  // Update user details
 // Update user details, including family data
updateUser() {
  this.isLoading = true;

  // Only include the fields required by the backend
  const userDataToUpdate = {
    email: this.userData.email,
    designation: this.userData.designation,
    mobilenumber: this.userData.mobilenumber,
    division: this.userData.division,
    office: this.userData.office,
    level: this.userData.level,
    payband: this.userData.payband,
    running_allowance: this.userData.running_allowance,
    familyData: this.userData.familyData
  };

  this.authService.updateUser(this.user_id, userDataToUpdate).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User and family details updated successfully' });
      this.isLoading = false;

      // ✅ Reload the page after 1 second for better UX
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user data' });
      this.isLoading = false;
    }
  );
}


  // Delete a family member from the database
  // Delete a family member from the database and update UI immediately
deleteUser(id: any) {
  // alert('Are you sure you want to delete this family member?')
    this.authService.deleteFamilyData(id).subscribe(
      (response) => {
        // Remove the deleted family member from the UI
        this.userData.familyData = this.userData.familyData.filter((member: any) => member.deatils_id !== id);

        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Family member deleted successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete family member' });
      }
    );
  
}

}
