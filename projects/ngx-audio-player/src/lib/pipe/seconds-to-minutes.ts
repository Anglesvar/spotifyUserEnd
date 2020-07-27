import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform seconds to minutes:seconds
 * Example : 270 -> 02:30
*/
@Pipe({ name: 'secondsToMinutes' })
export class SecondsToMinutesPipe implements PipeTransform {
    transform(time: number): string {
        const minutes = ('0' + Math.floor(time / 60)).slice(-2);
        const seconds = ('0' + time % 60).slice(-2);
        return `${minutes}:${seconds}`;
    }
}
