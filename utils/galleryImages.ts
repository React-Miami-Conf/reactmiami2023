export default async function getImages() {

    const fetchedResults = await fetch('https://reactmiami2023.vercel.app/api/images')
      .then((res) => res.json())

    return fetchedResults
}