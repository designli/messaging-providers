export interface MessagingAdapter<T> {
  send(message: T): Promise<void>;
}
