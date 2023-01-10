import clsx from "clsx";

export const Bounded = ({
  as: Comp = "div",
  size = "base",
  className,
  children,
}) => {
  return (
    <>
    {/* <Comp className={clsx("px-4 py-8 md:py-10 md:px-6 lg:py-12", className)}> */}
    <Comp className={clsx(className)}>
      {/* <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl"
        )}
      > */}
      <div className="max-w-screen-lg mx-auto w-full">
        {children}
      </div>
     </Comp>
    </>
  );
};
