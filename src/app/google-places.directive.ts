import { Directive, ElementRef, OnInit } from '@angular/core';
// import { google } from '@types/googlemaps';

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit {

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    console.log(autocomplete);
  }

}
