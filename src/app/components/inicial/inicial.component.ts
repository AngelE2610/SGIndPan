import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanaderiaService } from '../../services/panaderia.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  imports: [FormsModule, NgIf],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent implements OnInit {
  nombre = '';
  user = localStorage.getItem('userId');
  constructor(private panderiaService: PanaderiaService,
    private router: Router, private toastr: ToastrService) {
    console.log('Constructor nombre:', this.nombre, typeof this.nombre);
  }
  ngOnInit(): void {
    console.log('Nombre inicial:', this.nombre);
  }
  aceptar(): void {
    this.panderiaService.crearPanaderia(this.nombre, parseInt(this.user ? this.user : '0')).subscribe({
      next: () => {
        this.toastr.success('Panaderia creada correctamente');
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        this.toastr.error('Error al crear la panaderia');
      }
    })
  }
}
