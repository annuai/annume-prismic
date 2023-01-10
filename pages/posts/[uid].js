import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import { HorizontalDivider } from "../../components/HorizontalDivider";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LatestArticle = ({ posts }) => {
  const date = prismicH.asDate(
    posts.data.publishDate || posts.first_publication_date
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicLink document={posts}>
          <PrismicText field={posts.data.title} />
        </PrismicLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date)}
      </p>
    </li>
  );
};

const Article = ({ post, latestPosts, navigation, settings }) => {
  const date = prismicH.asDate(
    post.data.publishDate || post.first_publication_date
  );
  
  const getExcerpt = (excerptArray) => {
    const text = excerptArray
    .filter((excerpt) => excerpt.type === "paragraph")
    .map((excerpt) => excerpt.text)
    .join(" ");
    return text;
  };

  const ogTitle = prismicH.asText(post.data.title)+ " - "+prismicH.asText(settings.data.name)
  const ogDesc = getExcerpt(post.data.excerpt);

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(post.data.title)} -{" "}
          {prismicH.asText(settings.data.name)}
        </title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
      </Head>
      <Bounded className="px-6 lg:px-0 max-w-screen-md mx-auto w-full mt-10 mb-10 md:mt-10 lg:mt-24">
        <PrismicLink
          href="/"
          className="font-semibold tracking-tight text-slate-400"
        >
          &larr; Back to articles
        </PrismicLink>
      </Bounded>
      <article className="px-6 lg:px-0 max-w-screen-md mx-auto w-full mb-10">
        <Bounded className="pb-10">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={post.data.title} />
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date)}
          </p>
        </Bounded>
        <SliceZone slices={post.data.slices} components={components} />
      </article>
      {/* {latestPosts.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest articles
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestPosts.map((post) => (
                  <LatestArticle key={post.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )} */}
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const post = await client.getByUID("posts", params.uid);
  // const latestArticles = await client.getAllByType("article", {
  //   limit: 3,
  //   orderings: [
  //     { field: "my.article.publishDate", direction: "desc" },
  //     { field: "document.first_publication_date", direction: "desc" },
  //   ],
  // });

  const latestPosts = await client.getAllByType("posts", {
    limit: 3,
    orderings: [
      { field: "my.posts.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      // article,
      post,
      // latestArticles,
      latestPosts,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  // const articles = await client.getAllByType("article");

  const posts = await client.getAllByType("posts");

  return {
    paths: posts.map((post) => prismicH.asLink(post)),
    fallback: false,
  };
}
