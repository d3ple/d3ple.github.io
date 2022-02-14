import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious