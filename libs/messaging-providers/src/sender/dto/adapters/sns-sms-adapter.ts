import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AWSCredentials {
  @IsString()
  accessKeyId: string;

  @IsString()
  secretAccessKey: string;
}

export class SNSSMSAdapterOptions {
  /**
   * The AWS region where the SNS service is hosted.
   */
  @IsString()
  @IsNotEmpty()
  region: string;

  /**
   * AWS credentials for authentication.
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AWSCredentials)
  credentials: AWSCredentials;
}