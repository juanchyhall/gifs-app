import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList:Gif[]=[]

  private _tagsHistory:string[] = []
  private appiKey:string = 'NdYDnwAifJo41j1WbmhJ6z7FQfM2Zb12'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private httpCliente:HttpClient) {
    this.loadLocalStorage()
    console.log("Gifs Service Ready!")
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory (tag:string){

    tag = tag.toLocaleLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !==tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    if(this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0])
  }

  async searchTag(tag:string):Promise<void>{
    tag = tag.trim()
    if(tag.length === 0 || tag === ' ') return;
    this.organizeHistory(tag)

    const params = new HttpParams()
    .set('api_key',this.appiKey)
    .set('limit', '10')
    .set('q', tag)
    this.httpCliente.get<SearchResponse>(`${this.serviceUrl}/search`, {params} )
    .subscribe(response =>{
      this.gifsList = response.data;
      console.log({gifs:this.gifsList})
    })
  }

}
