import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ShortUrl } from '../shortUrl';
import { AuthService } from '../services/auth.service';
import { UriService } from '../services/uri.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerationForm: FormGroup;
  urlList: ShortUrl[];
  loadError = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private uriService: UriService, private router: Router) {
    this.registerationForm = this.fb.group({
      newurl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  toggleDisplay = () => {
    Array.from(document.querySelectorAll('.toggle-link')).forEach((elem) => {
      elem.classList.toggle('active');
    });
    Array.from(document.querySelectorAll('.toggle-display')).forEach((elem) => {
      elem.classList.toggle('d-none');
    });
  }

  fetchAll = () => {
    this.uriService.fetchAll().subscribe((data) => {
      if (data['status'] === 200) {
        this.urlList = data['data'];
      } else if (data['status'] !== 201) {
        this.loadError = true;
      }
    });
  }

  delete = (event) => {
    const index = event.target.id.toString().substr(4);
    document.getElementById('index-' + index).hidden = false;
    document.getElementById('can-' + index).hidden = false;
  }

  cancelDelete = (event) => {
    const index = event.target.id.toString().substr(4);
    document.getElementById('index-' + index).hidden = true;
    document.getElementById('can-' + index).hidden = true;
  }

  confirmDelete = (event) => {
    const index = parseInt(event.target.id.toString().substr(6), 10);
    this.uriService.deleteUri({
      _id: this.urlList[index]._id,
      shortUri: this.urlList[index].shortUri.substr(environment.apiEndoint.length)
    }).subscribe((data) => {
      if (data['status'] === 200) {
        this.urlList.splice(index, 1);
      } else if (data['status'] === 201) {
        alert('Error Occured while deleting');
      }
    });
  }

  onsubmit = () => {
    if (this.registerationForm.valid) {
      const newuri = this.registerationForm.get('newurl').value;
      this.uriService.newUri({uri: newuri}).subscribe((data) => {
        if (data['status'] === 200) {
          document.getElementById('new-reg-title').innerText = data['message'];
          document.getElementById('new-short-uri').innerText = data['shortUri'];
          document.getElementById('new-original-uri').innerText = data['originalUri'];
          this.fetchAll();
        } else if (data['status'] === 201) {
          document.getElementById('new-reg-title').innerText = data['message'];
          document.getElementById('new-short-uri').innerText = data['shortUri'];
          document.getElementById('new-original-uri').innerText = data['originalUri'];
        } else if (data['status'] === 203) {
          document.getElementById('new-reg-message').innerText = 'INVALID URL ERROR: Enter a valid URL';
        } else {
          document.getElementById('new-reg-message').innerText = 'Error Occured while registering the new URL';
        }
        document.getElementById('new-reg-message').hidden = false;
      });
    } else {
      document.getElementById('error').hidden = false;
    }
  }

  logout = () => {
    document.getElementById('logout').classList.add('active');
    this.auth.logout().subscribe((data) => {
      if (data['status'] === 200) {
        this.router.navigate(['/']);
      }
    });
  }

}
