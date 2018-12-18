import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const text = args ? args.toLowerCase().trim() : null;

    if (!text) {
      return value;
    }

    return value.filter((item) => {
      return item.title.toLowerCase().indexOf(text) !== -1;
    });
  }

}
