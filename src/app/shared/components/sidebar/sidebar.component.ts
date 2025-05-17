import { Component, Output } from '@angular/core';

import { GifsService } from '../../../gifs/service/gifs.service';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){
  }

  get tagList(){
    return this.gifsService.tagsHistory
  }

  public searchTag(tag:string){
    this.gifsService.searchTag(tag)
  }
}
