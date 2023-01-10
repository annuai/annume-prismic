import Head from "next/head";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";
import { BsArrowRight } from "react-icons/bs";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Bounded } from "../components/Bounded";
import { Heading } from "../components/Heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const findFirstImage = (slices) => {
  const imageSlice = slices.find((slice) => slice.slice_type === "image");

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

// const getExcerpt = (slices) => {
//   const text = slices
//     .filter((slice) => slice.slice_type === "text")
//     .map((slice) => prismicH.asText(slice.primary.text))
//     .join(" ");

//   const excerpt = text.substring(0, 300);

//   if (text.length > 300) {
//     return excerpt.substring(0, excerpt.lastIndexOf(" ")) + "…";
//   } else {
//     return excerpt;
//   }
// };

const getExcerpt = (excerptArray) => {
  const text = excerptArray
  .filter((excerpt) => excerpt.type === "paragraph")
  .map((excerpt) => excerpt.text)
  .join(" ");
  return text;
};

const Article = ({ article }) => {
  const featuredImage =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  // const excerpt = getExcerpt(article.data.slices);
  const excerpt = getExcerpt(article.data.excerpt);

  return (
    <li className="mt-6">
      {/* <PrismicLink document={article} tabIndex="-1">
        <div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              fill={true}
              className="object-cover"
            />
          )}
        </div>
      </PrismicLink> */}
      {/* <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2">
          <PrismicLink document={article}>
            <PrismicText field={article.data.title} />
          </PrismicLink>
        </Heading>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date)}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
          </p>
        )}
      </div> */}
      <PrismicLink document={article} className="
      w-full group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br bg-opacity-5 from-gray-50 
      to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-none md:rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800">
            {/* <a
              key={post.id}
              className="group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br bg-opacity-5 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800"
            > */}
              <h3
                className={'text-gray-700 dark:text-white text-md lg:text-md font-semibold title-font mb-5 transition-all duration-150 ease-out group-hover:text-mainred dark:group-hover:text-mainred'}>
                <PrismicText field={article.data.title} />
                <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowRight className="inline-block h-8 -mt-1 ml-1 fill-mainred w-auto opacity-70" />
                </span>
              </h3>
              <div className="text-xs w-full max-w-none mb-5 opacity-70">
                {excerpt}
              </div>
              <div className="flex items-center">
                    <p className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                      {dateFormatter.format(date)}
                    </p>
              </div>
            {/* </a> */}
          </PrismicLink>
    </li>

  );
};

const Index = ({ posts, navigation, settings }) => {
  const ogDesc = prismicH.asText(settings.data.name) +" - "+ prismicH.asText(settings.data.subtitle);
  const ogTitle = prismicH.asText(settings.data.description);
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)} - {prismicH.asText(settings.data.subtitle)}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
      </Head>
      {/* <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ul>
      </Bounded> */}

      <Bounded size="widest">
        <ul className="max-w-screen-lg lg:px-10 mx-auto mt-10 lg:mt-24">
          {posts.map((post) => (
            <Article key={post.id} article={post} />
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const posts = await client.getAllByType("posts", {
    orderings: [
      { field: "my.posts.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      articles,
      posts,
      navigation,
      settings,
    },
  };
}
