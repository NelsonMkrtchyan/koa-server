export interface NotificationInterface {
    title: string;
    body: never;
    channelId: string;
    data?: never;
}

export interface SendNotificationInterface {
    ids: number[],
    notification: NotificationInterface
}