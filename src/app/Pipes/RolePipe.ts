// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//     name: 'RolePipe',
//     pure: false
// })
// export class UserRolePipe implements PipeTransform {
//     transform(items: any[], filter: Object): any {
//         let keys = [];
//         for (let key in items) {
//             keys.push({ key: key, value: value[key] });
//         }
//         return keys;

//     }
// }
import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'RolePipe'
})

@Injectable()
export class UserRolePipe implements PipeTransform {

    transform(value: any, args: string[]): any {
        debugger;
        if (!args) {
            return value;
        } else {
            let a = [];
            let b = value.filter(
                (item) => {
                    // return item.roles.toLowerCase().indexOf(args.toString().toLowerCase()) > -1
                    item.roles.forEach(element => {
                        if (element.name === args) {
                            a.push(item);
                        }
                    });
                }
            );
            return a;
        }
    }
}
