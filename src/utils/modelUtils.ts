import {SendNotificationInterface} from "@/utils/types";

export async function sendNotification({ids, notification}: SendNotificationInterface) {
  try {
    console.log(ids, notification);
    // if (Object.keys(ids)) {
    //     const deviceTokens = await DeviceTokensUser.findAll({
    //         where: {
    //             userId: { [Op.in]: Object.keys(ids) },
    //         },
    //         attributes: ['userId', 'deviceToken'],
    //     });
    //
    //     const notificationMessage = deviceTokens.map((item) => {
    //         return {
    //             token: item.deviceToken,
    //             notification: {
    //                 title,
    //                 body,
    //             },
    //             data: {
    //                 ...data,
    //                 notificationId: `${ids[item.userId]}`,
    //             },
    //             android: {
    //                 priority: 'high',
    //                 notification: {
    //                     channelId,
    //                 },
    //             },
    //         };
    //     });
    //     const sentNotifications = [];
    //     const errorTokens = [];
    //
    //     for (let i = 0; i < notificationMessage.length; i++) {
    //         sentNotifications.push(
    //             admin
    //                 .messaging()
    //                 .send(notificationMessage[i])
    //                 .then((send) => {
    //                     return send;
    //                 })
    //                 .catch((err) => {
    //                     if (
    //                         err.code === 'messaging/registration-token-not-registered'
    //                     ) {
    //                         errorTokens.push(notificationMessage[i].token);
    //                     }
    //                 })
    //         );
    //     }
    //
    //     await Promise.all(sentNotifications);
    //
    //     if (errorTokens.length) {
    //         DeviceTokensUser.destroy({
    //             where: {
    //                 deviceToken: { [Op.in]: errorTokens },
    //             },
    //         });
    //     }
    // }
  } catch (e) {
    // throw new Error(e);
  }
}

export async function deleteInvitationUser() {
  try {
    // return await sequelize.query(
    //   `UPDATE "InvitationsUsers"
    //          SET "deletedAt" = now()
    //          FROM "Invitations"
    //          WHERE "InvitationsUsers"."invitationId" = "Invitations"."id"
    //            AND "InvitationsUsers"."userId" = ${userId}
    //            AND "Invitations"."hostId" = ${friendId}`,
    //   {
    //     logging: console.log,
    //     plain: false,
    //     raw: false,
    //     type: QueryTypes.SELECT,
    //   }
    // );
  } catch (err) {
    // throw err;
  }
}


export async function deleteCategoriesByIds({ids}: { ids: number[] }) {
  console.log(ids);
  // return TagCategory.destroy({
  //   where: {
  //     id: ids
  //   }
  // });
}

