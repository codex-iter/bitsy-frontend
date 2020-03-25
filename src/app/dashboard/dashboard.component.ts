import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShortUrl } from '../shortUrl';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerationForm: FormGroup;
  urlList: ShortUrl[] = [
    {
      _id: 'someRandomId',
      createdAt: new Date(),
      originalUri: 'https://www.google.com',
      shortUri: 'codex-iter.herokuapp.com/sdadfe'
    },
    {
      _id: 'someRandomId',
      createdAt: new Date(),
      originalUri: 'https://www.google.com',
      shortUri: 'codex-iter.herokuapp.com/sdadfe'
    },
    {
      _id: 'someRandomId',
      createdAt: new Date(),
      originalUri: 'https://www.google.com',
      shortUri: 'codex-iter.herokuapp.com/sdadfe'
    },
  ];

  constructor(private fb: FormBuilder) {
    this.registerationForm = this.fb.group({
      newurl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  toggleDisplay = () => {
    Array.from(document.querySelectorAll('.toggle-link')).forEach((elem) => {
      elem.classList.toggle('active');
    });
    Array.from(document.querySelectorAll('.toggle-display')).forEach((elem) => {
      elem.classList.toggle('d-none');
    });
  }

  onsubmit = () => {
    if (this.registerationForm.valid) {
      console.log(this.registerationForm.value);
    } else {
      document.getElementById('error').hidden = false;
    }
  }

  logout = () => {
    document.getElementById('logout').classList.add('active');
    console.log('Logout');
  }

}
