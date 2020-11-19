import { Component, OnInit, Input, OnChanges } from '@angular/core';

export type Color = 'red' | 'white' | 'blue';
const colorClassList: Array<Color> = ['red', 'white', 'blue'];

export type Size = 'small' | 'medium' | 'large';
const sizeClassList: Array<Size> = ['small', 'medium', 'large'];

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit, OnChanges {
  @Input() spinnerColor: Color ;
  @Input() spinnerSize: Size ;

  spinnerColorClass: string;
  spinnerSizeClass: string;

  constructor() { }

  private updateSpinnerSize() {
    const isValid = sizeClassList.includes(this.spinnerSize);
    this.spinnerSizeClass = (isValid ? this.spinnerSize : 'large');
  }

  private updateSpinnerColor() {
    const isValid = colorClassList.includes(this.spinnerColor);
    this.spinnerColorClass = (isValid ? this.spinnerColor : 'red');
  }

  ngOnChanges(){
    this.updateSpinnerColor();
    this.updateSpinnerSize();
  }

  ngOnInit() {
    this.updateSpinnerColor();
    this.updateSpinnerSize();
  }

}
