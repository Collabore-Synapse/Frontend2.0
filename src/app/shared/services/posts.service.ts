import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap, throwError } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly API = environment.API;
  // private userCity$ = new BehaviorSubject<string>('');
  userCity: any;

  constructor(private http: HttpClient, private authService: AuthService) { }


  async getGeolocation(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            await this.getCityName(position.coords.latitude, position.coords.longitude);
            resolve();
          });
        } else {
          console.log("Geolocalização não é suportada pelo seu navegador.");
          reject("Geolocalização não suportada");
        }
      } catch (error) {
        console.error("Erro: ", error);
        reject(error);
      }
    });
  }

  private async getCityName(latitude: number, longitude: number): Promise<string> {
    try {
      const city = await this.http
        .get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
        .pipe(
          map((result) => result.address.city_district),
          tap((result) => {
            console.log('Cidade => ', result);
            this.userCity = result;
          }),
        )
        .toPromise();

      return city;
    } catch (error) {
      console.error('Erro ao obter a cidade:', error);
      throw error;
    }
  }

  public getPosts(): Observable<Post[]> {
    const city = this.userCity;
    return this.http.get<Post[]>(`${this.API}/post/city/${city}`)
  }
}

// private getCityName(latitude: number, longitude: number): Promise<string> {
//   this.http.
//     get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
//     .pipe(
//       // tap((res) => console.log("Fluxo Tap: ", res)),
//       map((city) => city.address.city_district),
//       tap((city) => {
//         console.log('Cidade => ', city);
//         this.userCity = city;
//       }),
//     )
//     .subscribe();

//     return this.userCity
// }


//   public async getGeolocation1() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       await this.getCityName(position.coords.latitude, position.coords.longitude);
//     });
//   } else {
//     console.log("Geolocalização não é suportada pelo seu navegador.");
//   }
// }