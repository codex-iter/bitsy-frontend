import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      username: ['codex-iter', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onsubmit = () => {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.auth.login(credentials).subscribe((data) => {
        if (data['status'] && data['status'] === 200) {
          this.router.navigate(['/dashboard']);
        } else {
          document.getElementById('error').innerText = 'Invalid Username or password';
          document.getElementById('error').hidden = false;
        }
      }, (error) => {
        document.getElementById('error').innerText = 'Invalid Username or password';
        document.getElementById('error').hidden = false;
      });
    } else {
      document.getElementById('error').innerText = 'Username or password is missing';
      document.getElementById('error').hidden = false;
    }
  }

}
