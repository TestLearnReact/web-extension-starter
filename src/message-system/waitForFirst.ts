import { Observable, first } from "rxjs";

export const setupWaitForFirst =
  <T>(stream: Observable<T>) =>
  (predicate = (() => true) as (x: T) => boolean) =>
    stream.pipe(first(predicate)).toPromise();
