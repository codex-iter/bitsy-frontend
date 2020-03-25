import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['codex-iter', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onsubmit = () => {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      document.getElementById('error').hidden = false;
    }
  }

}
