// model Tag

// tagsHandler
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

// deleteTagFromES
export async function deleteTagFromES({id}: { id: number }) {
  console.log(id);
  // await client.delete({
  //   index: INDEX_TAGS,
  //   id,
  // });
}


