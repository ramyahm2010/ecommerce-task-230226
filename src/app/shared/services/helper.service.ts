import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  truncate(text: string, length: number) {
    return text?.length > length ? `${text.slice(0, length)}...` : text;
  }
}
