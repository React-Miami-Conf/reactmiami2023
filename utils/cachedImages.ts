let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await fetch('https://reactmiami2023.vercel.app/api/images')
      .then((res) => res.json())

    cachedResults = fetchedResults
  }
  return cachedResults
}
