import {Client} from "@elastic/elasticsearch";
import {Venue} from "@models/venue";
import {Event} from "@models/event";
import {Tag} from "@models/tag";
import {TagCategory} from "@models/tagcategory";
import {Vibes} from "@models/vibes";

// elasticsearch version 7.4 in aws
const client = new Client({
  node: 'https://search-venews-prod-2jl5ihazayyhqhqg367ciwffha.ap-southeast-2.es.amazonaws.com',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function sync({client, index, type}: { client: Client, index: string, type?: string }) {
  try {
    let data;
    if (index === 'venues') {
      data = await Venue.findAll({raw: true});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const {id, name, location, address} of data) {
        if (location) {
          location.lon = location.lng;
          delete location.lng;
        }

        await client.index({
          index,
          id,
          type,
          body: {
            id,
            name,
            location,
            address,
          },
        });
      }
    } else if (index === 'tags') {
      data = await Tag.findAll({
        include: [
          {
            model: TagCategory,
            as: 'category',
            where: {
              scope: 'venue',
            },
          },
        ],
        raw: true,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const {id, name} of data) {
        await client.index({
          index,
          id,
          type,
          body: {
            id,
            name,
          },
        });
      }
    } else if (index === 'events') {
      data = await Event.findAll({raw: true});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const {id, name, VenueId: hostId, date, rating, start} of data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const {name: hostName} = await Venue.findOne({
          where: {
            id: hostId,
          },
          raw: true,
        });

        await client.index({
          index,
          id,
          body: {
            name,
            host: hostName,
            date,
            start,
            rating,
          },
        });
      }
    } else if (index === 'vibes') {
      //!!!  VERY QUESTIONABLE if  this is right
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data = await Vibes.findAll({scope: 'vibes'});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const {id, name} of data) {
        await client.index({
          index,
          id,
          body: {
            id,
            name,
          },
          type,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}


sync({
  client,
  index: 'venues',
}).then();
sync({
  client,
  index: 'tags',
}).then();
sync({
  client,
  index: 'events'
}).then();
sync({ //!!
  client,
  index: 'vibes'
}).then();



