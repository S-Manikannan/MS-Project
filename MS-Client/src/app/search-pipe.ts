
import { Pipe } from '@angular/core'
import { MedicineDetails } from './app.model'

@Pipe({
    name: 'searchMedicines'
})

export class SearchMedicinesPipe {
    transform(map: MedicineDetails[], keyword: string) {
        if (keyword == null) {
            return map;
        }
        return map.filter(md => md.medicineName.toLowerCase().indexOf(keyword) != -1);
    }
}
