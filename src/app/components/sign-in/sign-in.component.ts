import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, FormsModule, SpinnerComponent, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) {

  }

  addUser() {
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Las password ingresadas no coinciden', 'Error')
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password
    }
    this.loading = true;

    this.userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('Usuario creado con exito', 'Info');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.msg ? e.error.msg : 'Error comuniquese con un administrador', 'Error');
        this.loading = false;
      }
    })

  }
}

