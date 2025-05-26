import { MessagingTransportRegistration } from './messaging-transports-registration.interface';

export interface SenderModuleOptions {
  transports: MessagingTransportRegistration[];
  config: Record<string, any>;
}
