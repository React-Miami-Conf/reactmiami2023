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

  return (
    <div>
      {data && data.map((data) => <p key={data.url} className="text-white/80">{data.url}</p>)}
    </div>
  );
}


