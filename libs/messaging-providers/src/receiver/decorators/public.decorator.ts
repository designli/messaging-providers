import { SetMetadata } from '@nestjs/common';

export const Public = (key, value) => SetMetadata(key, value);
