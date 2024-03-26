let cacheServerSide = {};
export async function GET(request, { params }) {
  const { category } = params;
  console.log(category, "🐲🐼🧸");

  if (
    cacheServerSide[category] &&
    Date.now() - cacheServerSide[category].timestamp < 3600000
  ) {
    console.log(`Serving ${category} from cache.`);
    return new Response(
      JSON.stringify({ data: cacheServerSide[category].data })
    );
  }

  try {
    const apiResponse = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${category}`
    );

    console.log(apiResponse, "🔥🚀 API-response!");
    if (!apiResponse.ok) {
      throw new Error(
        `Failed to fetch from Jikan API: ${apiResponse.statusText}`
      );
    }

    const { data } = await apiResponse.json();

    cacheServerSide[category] = {
      timestamp: Date.now(),
      data: data
    };

    return new Response(
      JSON.stringify({
        message: "🤖✨ Image file paths you have generated so far!",
        data: data
      })
    );
  } catch (error) {
    console.error(`Error fetching data for ${category}:`, error);
    return;
  }
}
