import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Loader() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/src/assets/loading.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="loader-container">
      <Lottie animationData={data} loop />
    </div>
  );
}
