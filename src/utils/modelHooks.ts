import {sequelize} from "@/index";
import {QueryTypes} from 'sequelize';

// model ---> Tag
export async function tagsHandler({id, name, categoryId}: {
    id: number,
    name: string,
    categoryId: number
}) {
  console.log(id, name, categoryId);
  // const venueTypeCategoryIds = await TagCategory.findAll({
  //     where: {
  //         scope: 'venue',
  //     },
  // }).map((tagCategory) => tagCategory.id);
  //
  // if (venueTypeCategoryIds.includes(categoryId)) {
  //     await client.index({
  //         index: INDEX_TAGS,
  //         id,
  //         body: {
  //             id,
  //             name,
  //         },
  //     });
  // }
}

export async function deleteTagFromES({id}: {
    id: number
}) {
  console.log(id);
  // await client.delete({
  //   index: INDEX_TAGS,
  //   id,
  // });
}

//model ---> Event
export async function addEventToEs({
  id,
  name,
  VenueId,
  date,
  rating,
  display,
  period,
  start,
  end,
}: {
    id: number,
    name: string,
    VenueId: number,
    date: Date,
    rating: number,
    display: boolean,
    period: string,
    start: Date,
    end: Date
}) {
  console.log(id,
    name,
    VenueId,
    date,
    rating,
    display,
    period,
    start,
    end);
  // const venue = await Venue.findOne({
  //   where: { id: VenueId },
  //   raw: true,
  // });
  //
  // await client.index({
  //   index: INDEX_EVENTS,
  //   id,
  //   body: {
  //     id,
  //     name,
  //     host: venue.name,
  //     date,
  //     start,
  //     end,
  //     rating,
  //     display,
  //     period,
  //   },
  // });
}

export async function deleteEventFromEs({id}: {
    id: number
}) {
  console.log(id);
  // await client.delete({
  //   index: INDEX_EVENTS,
  //   id,
  // });
}

// model ---> Vibes
export async function vibesHandler({id, name}: {
    id: number,
    name: string
}) {
  console.log(id, name);
  // await client.index({
  //     index: INDEX_VIBES,
  //     id,
  //     body: {
  //         id,
  //         name,
  //     },
  // });
}

export async function deleteVibesFromES({id}: {
    id: number
}) {
  console.log(id);
  // await client.delete({
  //     index: INDEX_VIBES,
  //     id,
  // });
}

// model ---> Friends
export async function deleteInvitationUser({userId, friendId}: {
    userId: number,
    friendId: number
}) {
  return await sequelize.query(
    `UPDATE "InvitationsUsers"
         SET "deletedAt" = now()
         FROM "Invitations"
         WHERE "InvitationsUsers"."invitationId" = "Invitations"."id"
           AND "InvitationsUsers"."userId" = ${userId}
           AND "Invitations"."hostId" = ${friendId}`,
    {
      logging: console.log,
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    }
  );

}


