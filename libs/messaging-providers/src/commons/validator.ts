import { Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function extractErrorMessages(
  errors: ValidationError[],
  parentPath = '',
): string[] {
  const messages: string[] = [];

  for (const error of errors) {
    const propertyPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints)
      for (const msg of Object.values(error.constraints))
        messages.push(`${propertyPath}: ${msg}`);

    if (error.children && error.children.length > 0)
      messages.push(...extractErrorMessages(error.children, propertyPath));
  }

  return messages;
}

export async function validateInput<T extends object>(
  input: T,
  object: Type<T>,
): Promise<void> {
  const dto = plainToInstance(object, input);
  const errors = await validate(dto, {
    whitelist: true,
    forbidUnknownValues: false,
  });

  if (errors.length === 0) return;

  const errorMessages = extractErrorMessages(errors);

  throw new Error(
    `Validation failed: ${errorMessages.length ? errorMessages.join('; ') : 'Unknown validation error'}`,
  );
}
