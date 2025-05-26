import { Type } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateInput<T extends object>(input: T, object: Type<T>): Promise<void> {
  const dto = plainToInstance(object, input);
  const errors = await validate(dto);

  if (errors.length === 0) return;

  const errorMessages = errors.map((error) =>
    Object.values(error.constraints ?? {}).join(', '),
  );

  throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
}
