export class DataResult<T> {
    isSuccess?: boolean;
    message?: string;
    code?: number;
    data!: T;
}
