export class DataResult<T> {
    isSuccess!:boolean;
    Code!:number;
    Message!:string;
    Data!:T;
}
