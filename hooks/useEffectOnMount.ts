import { useEffect, useRef } from "react";

export default function useEffectOnMount(cb: any, dependencies: any[]) {
  const ref = useRef(true);

  useEffect(() => {
    if (!ref.current) {
      return cb();
    }

    ref.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
