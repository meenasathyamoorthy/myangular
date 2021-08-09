import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { userModel } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // GetAll() {
  //   throw new Error('Method not implemented.');
  // }

  private readonly URL: string = "http://localhost:3000/create";
  private readonly URLfind: string = "http://localhost:3000/find";
  private readonly URLgetone: string = "http://localhost:3000/read";
  private readonly URLupdate: string = "http://localhost:3000/update";
  private readonly URLdelete: string = "http://localhost:3000/delete";
  constructor(private http: HttpClient) { }

  create(data: userModel): Observable<userModel> 
  {
    return this.http.post<userModel>(this.URL, data);
  }

  update(data: userModel): Observable<userModel> 
  {
    console.log("data print");
    console.log(data);
    return this.http.put<userModel>(this.URLupdate + "/" + data._id, data);
  }

  GetAll(): Observable<userModel[]> {
    return this.http.get<userModel[]>(this.URLfind);
  }
  Getone(id: any): Observable<userModel> {
    console.log(this.URLgetone + "/" + id);
    return this.http.get<userModel>(this.URLgetone + "/" + id);

  }
  delete(id: any): Observable<userModel> {
    return this.http.delete<userModel>(this.URLdelete + "/" + id);

  }

}



