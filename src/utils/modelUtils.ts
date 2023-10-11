import {Op} from 'sequelize';

import {SendNotificationInterface} from "@/utils/types";
import {DeviceTokenUser} from "@models/devicetokenuser";
import admin from 'firebase-admin';
import {TokenMessage} from "firebase-admin/lib/messaging/messaging-api";
import {TagCategory} from "@models/tagcategory";

export async function sendNotification({ids, notification}: SendNotificationInterface) {
  try {
    if (Object.keys(ids)) {
      const deviceTokens = await DeviceTokenUser.findAll({
        where: {
          userId: {[Op.in]: Object.keys(ids)},
        },
        attributes: ['userId', 'deviceToken'],
      });

      const notificationData = notification.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const notificationMessage: TokenMessage[] = deviceTokens.map(({deviceToken, userId}) => {
        return {
          token: deviceToken,
          notification: {
            title: notification.title,
            body: notification.body,
          },
          data: {
            ...notificationData,
            notificationId: `${ids[userId]}`,
          },
          android: {
            priority: 'high',
            notification: {
              channelId: notification.channelId,
            },
          },
        };
      });
      const sentNotifications = [];
      const errorTokens: string[] = [];

      for (let i = 0; i < notificationMessage.length; i++) {
        sentNotifications.push(
          admin
            .messaging()
            .send(notificationMessage[i])
            .then((send) => {
              return send;
            })
            .catch((err) => {
              if (
                err.code === 'messaging/registration-token-not-registered'
              ) {
                errorTokens.push(notificationMessage[i].token);
              }
            })
        );
      }

      await Promise.all(sentNotifications);

      if (errorTokens.length) {
        await DeviceTokenUser.destroy({
          where: {
            deviceToken: {[Op.in]: errorTokens},
          },
        });
      }
    }
  } catch (e: unknown) {
    // throw new Error(e);
  }
}


export async function deleteCategoriesByIds({ids}: {
    ids: number[]
}) {
  return TagCategory.destroy({
    where: {
      id: ids
    }
  });
}

