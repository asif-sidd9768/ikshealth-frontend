import { Injectable} from '@angular/core';
import { CONSTANTS } from '../constants/resource';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() { }

  async uploadFile(formData: FormData): Promise<any>{
    try {
      const response =  fetch(`${CONSTANTS.API_URL}/file-upload`, {
        method: "POST",
        body: formData
      })
      return response
    }catch(error){
      console.error(error)
    }
  }
}
