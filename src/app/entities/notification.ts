import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientID: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
    this._id = id?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientID(recipientID: string) {
    this.props.recipientID = recipientID;
  }

  public get recipientID(): string {
    return this.props.recipientID;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
}
