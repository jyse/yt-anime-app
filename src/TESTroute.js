let cacheServerSide = {};

export async function GET() {
  const { category } = req.query;
  console.log("HERE IN HANDLER 🍬");

  // Check if we have cached data for this category and it's still fresh
  // if (
  //   cacheServerSide[category] &&
  //   Date.now() - cacheServerSide[category].timestamp < 3600000
  // ) {
  //   // 1 hour cache validity
  //   console.log(`Serving ${category} from cache.`);
  //   return res.status(200).json(cacheServerSide[category].data); // Serve from cache
  // }

  // try {
  //   const apiResponse = await fetch(
  //     `https://api.jikan.moe/v4/top/anime?filter=${category}`
  //   );
  //   if (!apiResponse.ok) {
  //     throw new Error(
  //       `Failed to fetch from Jikan API: ${apiResponse.statusText}`
  //     );
  //   }

  //   const { data } = await apiResponse.json(); // Make sure this destructuring matches the API response structure

  //   // Update server-side cache with new data
  //   cacheServerSide[category] = {
  //     timestamp: Date.now(),
  //     data: data
  //   };

  //   console.log(`Caching new data for ${category}.`);
  //   return res.status(200).json(data); // Serve the new data
  // } catch (error) {
  //   console.error(`Error fetching data for ${category}:`, error);
  //   return res.status(500).json({ message: error.message });
  // }
}
