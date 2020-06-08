import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UriService {

  apiEndpoint: string;

  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiEndoint;
  }

  fetchAll() {
    const uriListEndpoint = this.apiEndpoint + 'uri/all';
    return this.http.get(uriListEndpoint, {withCredentials: true});
  }

  deleteUri(obj: any) {
    const deleteEndpoint = this.apiEndpoint + 'delete';
    return this.http.post(deleteEndpoint, obj, {withCredentials: true});
  }

  newUri(obj: any) {
    const newUriRegEndpoit = this.apiEndpoint + 'new';
    return this.http.post(newUriRegEndpoit, obj, {withCredentials: true});
  }
}
