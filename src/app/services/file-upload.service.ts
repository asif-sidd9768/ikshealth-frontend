import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() { }

  async uploadFile(formData: FormData): Promise<any>{
    try {
      const response =  fetch('http://localhost:3000/api/file-upload', {
        method: "POST",
        body: formData
      })
      return response
    }catch(error){
      console.error(error)
    }
  }
}
