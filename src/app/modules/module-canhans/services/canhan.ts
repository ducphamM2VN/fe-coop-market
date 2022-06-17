import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



import { ICaNhans } from "../data-access/models/canhan.model";
import { environment } from "../../../../environments/environment";

const baseUrl = `${environment.apiServer}/canhans`;

@Injectable({ providedIn: "root" })
export class CaNhanService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ICaNhans[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<ICaNhans>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    console.log(baseUrl)
    debugger
    return this.http.post(baseUrl, params);
  
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
