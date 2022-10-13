export interface Resolvable<T> extends Promise<T> {
    resolve: (t: T) => void;
    reject: (e: any) => void;
}
export declare function resolvablePromise<T = void>(): Resolvable<T>;
