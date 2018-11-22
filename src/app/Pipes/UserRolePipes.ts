import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'UserRole',
    pure: false
})
export class UserRolePipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        let a = items.filter((item) => {
            item.roles.forEach(element => {
                // tslint:disable-next-line:triple-equals
                return element.id == filter;
            });
        });

    }
}
