import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appstyle]',
  standalone: true
})
export class styleItemsDirective {

  constructor(private myRef: ElementRef) { }

  @HostListener('mouseover') over() {
    this.myRef.nativeElement.className = 'alert alert-success prdsDisc'
  }

  @HostListener('mouseout') out() {
    this.myRef.nativeElement.className = 'alert alert-secondary prdsDisc'
  }

}
