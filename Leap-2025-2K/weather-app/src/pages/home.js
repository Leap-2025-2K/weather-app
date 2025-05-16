import { useEffect, useState } from "react";

export default function Page() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  return <div>home page</div>;
}
