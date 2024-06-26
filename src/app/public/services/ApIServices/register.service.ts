// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomEncoder } from '../../custom-encoder';
import { RegisterUserCommand } from '../../Interfaces/User/RegisterUserCommand';
import { EmailConfirmationResponseDto } from '../../Interfaces/User/EmailConfirmationResponseDto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.baseUrl}`; // Replace with your API URL
  private apiUrl2 = 'http://localhost:5068/api/Identity/register'; // Adjust URL as per your API endpoint

  constructor(private http: HttpClient) { }

  registerUser(formData: FormData): Observable<EmailConfirmationResponseDto> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<EmailConfirmationResponseDto>(this.apiUrl2, formData, { headers: headers })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
    }

  confirmEmail(token: string, email: string): Observable<any> {
    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('useremailtoconfirm', email);
    params = params.append('token', token);
    return this.http.get<any>(`${this.apiUrl}Identity/confirmemail`, { params });
  }

  
}
