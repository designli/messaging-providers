import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SesTransportDto {
  /**
   * The email address of the sender.
   */
  @IsString()
  @IsNotEmpty()
  awsHost: string;

  /**
   * The port number to use for the connection.
   */
  @IsNumber()
  @IsNotEmpty()
  awsPort: number;

  /**
   * The username for authentication.
   */
  @IsString()
  awsUsername: string;

  /**
   * The password for authentication.
   */
  @IsString()
  awsPassword: string;

  /**
   * Should debugging be enabled?
   * default: false
   */
  @IsOptional()
  @IsBoolean()
  debug?: boolean;
}
