let cacheServerSide = {};

export default async function handler(req, res) {
  const { category } = req.query;

  console.log(req, "what is in request? 🐲🐼 ");

  // Check if the data is already in the cacheServerSide and not stale
  if (
    cacheServerSide[category] &&
    Date.now() - cacheServerSide[category].timestamp < 3600000
  ) {
    // 1 hour cacheServerSide validity
    return res.status(200).json(cacheServerSide[category].data);
  }

  try {
    const apiResponse = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${category}`
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch from Jikan API");
    }
    const data = await apiResponse.json();
    console.log(
      data,
      " what is in data here? 🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲🐲"
    );
    // Update the cacheServerSide
    cacheServerSide[category] = { timestamp: Date.now(), data: data };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
