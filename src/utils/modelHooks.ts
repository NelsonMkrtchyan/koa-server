// model ---> Tag

export async function tagsHandler({id, name, categoryId}: { id: number, name: string, categoryId: number }) {
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

export async function deleteTagFromES({id}: { id: number }) {
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
  // }); // TODO: Remove this dependency problem
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

export async function deleteEventFromEs({id}: { id: number }) {
  console.log(id);
  // await client.delete({
  //   index: INDEX_EVENTS,
  //   id,
  // });
}