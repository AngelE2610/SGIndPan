import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { PanaderiaService } from '../../services/panaderia.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private userService: UserService,
    private panaderiaService: PanaderiaService, private router: Router) {

  }

  login() {
    if (this.username == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password
    }
    this.loading = true;
    this.userService.login(user).subscribe({
      next: (data: any) => {
        this.loading = false;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        const panaderia = this.panaderiaService.getPanaderia(data.userId).subscribe({
          next: (panaderia: any) => {
            if (!panaderia) {
              this.router.navigate(['/inicio']);
            } else {
              this.router.navigate(['/dashboard/home']);
            }
          },
          error: (e: HttpErrorResponse) => {
            this.toastr.error(e.error.msg ? e.error.msg : 'Error comuniquese con un administrador', 'Error');
          }
        });

      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.msg ? e.error.msg : 'Error comuniquese con un administrador', 'Error');
        this.loading = false;
      }
    })
  }
}
