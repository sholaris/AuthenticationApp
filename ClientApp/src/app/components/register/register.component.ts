import { Component, OnInit} from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Declare component properties
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {

    // Create a new user object
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

     // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Please fill in all fields', { cssClass: 'alert-danger ', timeout: 3000 })
      return false
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data['success']) {
        this.flashMessages.show('You are now registered and you can log in', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/login'])
      } else {
        this.flashMessages.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/register'])
      }
    })
  }

 

}
