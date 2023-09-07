import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useEffect, useRef, useState} from 'react'
import Bridge from '../components/Icons/Bridge'
import Logo from '../components/Icons/Logo'
import Modal from '../components/Modal'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>React Miami 2023 Photos</title>
        <meta
          property="og:image"
          content="https://public.blob.vercel-storage.com/79xekGMNQ8jAucrM/React%20Miami-61f47XcsH4NjdL1OfjHexouW4vzQZz.png"
        />
        <meta
          name="twitter:image"
          content="https://public.blob.vercel-storage.com/79xekGMNQ8jAucrM/React%20Miami-61f47XcsH4NjdL1OfjHexouW4vzQZz.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <Logo />
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              2023 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              A 2 day celebration in Miami of all things React featuring 28 expert speakers, the latest web insights, and unparalleled networking!
            </p>
            <a
              className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://www.reactmiami.com/"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
          {images.map(({id, url, description}) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={description}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                // placeholder="blur"
                // blurDataURL={blurDataUrl}
                src={url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{' '}
        <a
          href="https://twitter.com/schutzsmith"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Daniel Schutzsmith
        </a>
        {' '}and{' '}
        <a
          href="https://twitter.com/Beccalytics"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Rebecca Bakels
        </a>{' '}
        for the pictures.
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  let reducedResults: ImageProps[] = []

  const results = await fetch('https://reactmiami2023.vercel.app/api/images')
  const data = await results.json()

  const newImages = data.images.rows

  let i = 0
  for (let image of newImages) {
    reducedResults.push({
      id: i,
      url: image.url,
      description: image.description,
      category: image.category
    })
    i++
  }

  /*
  // Blurred images are skipped due to performance warnings from Next

  const blurImagePromises = newImages.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }
  */


  return {
    props: {
      images: reducedResults,
    },
  }
}
