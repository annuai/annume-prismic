import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";

import { Bounded } from "../../components/Bounded";

const Text = ({ slice }) => {
  return (
    <Bounded as="section" className="mb-12 first:mt-0 last:mb-0">
      {prismicH.isFilled.richText(slice.primary.text) && (
        <div className="font-sans leading-relaxed break-words md:text-md md:leading-relaxed">
          <PrismicRichText field={slice.primary.text}
          components={{
            paragraph: ({ children }) => <p className="mt-4">{children}</p> }}
             />
        </div>
      )}
    </Bounded>
  );
};

export default Text;
