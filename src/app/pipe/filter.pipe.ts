import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, selectedTag: string): any[] {
    if (!items) return [];
    if (!searchText && !selectedTag) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const matchesSearchText = item.title.toLowerCase().includes(searchText) || item.content.toLowerCase().includes(searchText);
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);
      return matchesSearchText && matchesTag;
    });
  }
}
