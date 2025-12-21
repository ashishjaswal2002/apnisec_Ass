export class ApiResponse<T> {
    public success: boolean;
    public message: string;
    public data: T | null;
    public statusCode: number;

    constructor(statusCode: number, message: string, data: T | null = null, success: boolean = true) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
    }

    static success<T>(data: T, message: string = "Success", statusCode: number = 200): ApiResponse<T> {
        return new ApiResponse<T>(statusCode, message, data, true);
    }

    static error(message: string, statusCode: number = 500, data: any = null): ApiResponse<any> {
        return new ApiResponse<any>(statusCode, message, data, false);
    }
}
