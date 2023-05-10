import { useState, useEffect } from 'react';
import Image from "next/image";

export default function List() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/list')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className="text-white/80">Loading...</p>;
  if (!data) return <p className="text-white/80">No profile data</p>;

  console.log({data})

  return (
    <div>
      {data && data.map((d) => <p className="text-white/80" key={d.url}>{d.url}</p>)}
      {data && data.map((d) => <img key={d.url} src={d.url} alt="React Miami photo" width="720" height="480" />)}
    </div>
  );
}

/*
{data && data.map((data) => <Image
  key={data.url}
  alt={"React Miami photo"}
  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
  style={{ transform: 'translate3d(0, 0, 0)' }}
  placeholder="blur"
  blurDataURL={data.url}
  src={data.url}
  width={720}
  height={480}
  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
/>)}*/
