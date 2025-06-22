export interface MessageReceiverHandler<T> {
  handleMessage(payload: T): Promise<void>;
  handle(req: any, body: any): Promise<any>;
}
