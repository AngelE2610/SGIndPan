import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule,NgIf,SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName='';
  password='';
  loading:boolean = false;

  constructor(private toastr: ToastrService,private userService:UserService, private router:Router){

  }

  login(){
    if(this.userName=='' || this.password==''){
        this.toastr.error('Todos los campos son obligatorios','Error')
        return;
      }
       const user: User = {
              userName: this.userName,
              password: this.password
            }
            this.loading = true;
            this.userService.login(user).subscribe({
              next: (token) =>{
                this.loading=false;
                this.router.navigate(['/dashboard']);
                localStorage.setItem('token',token);
              },
              error:(e:HttpErrorResponse) =>{
                this.toastr.error(e.error.msg? e.error.msg:'Error comuniquese con un administrador','Error');
                this.loading=false;
              }
            })
  }
}
