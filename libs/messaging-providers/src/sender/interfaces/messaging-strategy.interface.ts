export interface MessagingStrategy<T> {
  sendMessage(message: T): Promise<void>;
}
