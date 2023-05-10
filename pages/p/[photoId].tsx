import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import getResults from '../../utils/cachedImages'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type { ImageProps } from '../../utils/types'
import {useEffect, useState, Suspense} from "react";

const Home: NextPage = () => {
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)

  useEffect(() => {

    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        const newImages = data.images.rows

        let reducedResults: ImageProps[] = []
        let i = 0
        for (let image of newImages) {
          reducedResults.push({
            id: i,
            url: image.url,
            description: image.description
          })
          i++
        }

        const currentPhoto = reducedResults.find(
          (img) => img.id === index
        )

        // currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

        setCurrentPhoto(currentPhoto);
      });
  }, [index]);

  const currentPhotoUrl = currentPhoto?.url

  return (
    <>
      <Head>
        <title>React Miami 2023 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Suspense>
          <Carousel currentPhoto={currentPhoto} index={index} />
        </Suspense>
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getResults()

  return {
    props: {
      images: data,
    },
  }
}

export async function getStaticPaths() {

  const data = await getResults()

  let fullPaths = []
  for (let i = 0; i < data.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}


