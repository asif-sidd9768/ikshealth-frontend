import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants/resource';

@Injectable({
  providedIn: 'root'
})
export class LocationFinderService {

  constructor() { }

  async getAllCountries (): Promise<any> {
    try{
      const response =  await fetch(`${CONSTANTS.API_URL}/countries`)
      const {countries} = await response.json()
      return countries
    }catch(error){
      console.error(error)
    }
  }

  async getAllStates(country: any): Promise<any> {
    try{
      const response =  await fetch(`${CONSTANTS.API_URL}/${country}/states`)
      const {states} = await response.json()
      return states
    }catch(error){
      console.error(error)
    }
  }

  async getAllCities(country: any, state: any): Promise<any> {
    try{
      const response =  await fetch(`${CONSTANTS.API_URL}/${country}/${state}/cities`)
      const {cities} = await response.json()
      return cities
    }catch(error){
      console.error(error)
    }
  }
}
