import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    contrasena: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  submit() {
    const correo = this.form.value.correo ?? '';
    const contrasena = this.form.value.contrasena ?? '';

    this.authService.login({ correo, contrasena }).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Correo o contraseña incorrectos');
      },
    });
  }
}
