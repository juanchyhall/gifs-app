import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()
  public gif!:Gif

  ngOnInit(): void {
    if(!this.gif){throw Error("Gif property is required")}
  }
}
