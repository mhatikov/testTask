import { Pipe, PipeTransform } from '@angular/core';
import { basicCustomPipesMethods } from './main-custom.pipes';

@Pipe({
  name: 'addChar'
})
export class AddCharPipe implements PipeTransform {

  transform(value: any, str: string): string {
    return basicCustomPipesMethods.addChar(value, str);
  }

}
