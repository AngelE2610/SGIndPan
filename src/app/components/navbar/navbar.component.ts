import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() titulo: string='';
  constructor (private router: Router){

  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('panaderiaId');
    this.router.navigate(['/login']);
  }
}
