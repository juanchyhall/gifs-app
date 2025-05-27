import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',

  templateUrl:'./lazy-image..component.html'

})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  public hasLoaded:boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('Url property is required.');
  }

  onLoad(){
    // agregamos timeout de 1 segundo solamente para visualizar el lazyimage
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
