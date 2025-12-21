import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { AppError } from '../core/AppError';

export class Validator {
    static async validate<T extends object>(dtoClass: ClassConstructor<T>, body: any): Promise<T> {
        const dtoInstance = plainToInstance(dtoClass, body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            const message = errors.map((error) => Object.values(error.constraints || {})).join(', ');
            throw new AppError(message, 400);
        }

        return dtoInstance;
    }
}
