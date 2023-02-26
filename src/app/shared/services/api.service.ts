import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiOptions } from '../interfaces/api-options.interface';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient, private _loader: LoaderService) {}

  call(options: ApiOptions): Observable<any> {
    this._loader.show();
    return this._http[options.method](
      environment.apiUrl + options.endpoint,
      options.data
    ).pipe(tap(() => this._loader.hide()));
  }
}
