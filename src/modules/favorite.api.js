

import instance from './../api/axios.server';

const favoriteEndpoints = {
  list: "/favorites",
  add: "/favorites",
  remove: ({ favoriteId }) => `/favorites/${favoriteId}`
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await instance.get(favoriteEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate
  }) => {
    try {
      const response = await instance.post(favoriteEndpoints.add, {
				mediaId,
				mediaType,
				mediaTitle,
				mediaPoster,
				mediaRate,
			});

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await instance.delete(
				favoriteEndpoints.remove({ favoriteId })
			);

      return { response };
    } catch (err) { return { err }; }
  }
};

export default favoriteApi;