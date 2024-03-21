import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo',
  standalone: true
})
export class DemoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
