export type NotificationType = {
    title: string;
    body: never;
    channelId: string;
    data?: any;
}

export interface SendNotificationInterface {
    ids: number[],
    notification: NotificationType
}