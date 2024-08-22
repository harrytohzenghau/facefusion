import { useEffect, useState } from "react";

const Card = ({ additionalClassName, children }) => {
  const [className, setClassName] = useState("w-4/5 my-0 mx-auto py-10");

  useEffect(() => {
    if (additionalClassName) {
      const newClassName = className + ' ' + additionalClassName;
      setClassName(newClassName);
    }
  }, [additionalClassName]);

  return <div className={className}>{children}</div>;
};

export default Card;
