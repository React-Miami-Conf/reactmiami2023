import cloudinary from './cloudinary'
import {ImageProps} from "./types";

let cachedResults

export default async function getResults() {
  if (!cachedResults) {
    /*const fetchedResults = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/!*`)
      .with_field('context')
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()*/

    const fetchedResults = fetch('https://reactmiami2023.vercel.app/api/list')
      .then((res) => res.json())

    cachedResults = fetchedResults
  }

  return cachedResults
}
