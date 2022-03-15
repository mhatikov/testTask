import { Pipe, PipeTransform } from '@angular/core';
import { basicCustomPipesMethods } from './main-custom.pipes';

@Pipe({
  name: 'charLimit'
})
export class CharLimitPipe implements PipeTransform {

  transform(value: string, limitNumber: number): string {
    if(limitNumber === 0) return value;
    if(value.length > limitNumber){
      const endChar: string = '.';
      let result: string = value.slice(0, limitNumber);
      return basicCustomPipesMethods.addChar(result, endChar);
    }else{
      return value;
    }
  }

}
