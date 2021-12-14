import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus',
})
export class FilterStatusPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    return value.filter((el: any) => el.status === arg).length;
  }
}
