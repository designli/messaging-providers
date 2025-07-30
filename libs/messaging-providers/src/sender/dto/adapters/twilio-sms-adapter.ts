import { IsNotEmpty, IsString } from "class-validator";

export class TwilioSMSAdapterOptions {
	@IsString()
	@IsNotEmpty()
	accountSid: string;

	@IsString()
	@IsNotEmpty()
	authToken: string;
}