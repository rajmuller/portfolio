import { GetStaticProps } from "next";
import Head from "next/head";

import { Categories, Loader, PostCard, PostWidget } from "../components";
import { FeaturedPosts } from "../components";
import { PostsDocument, usePostsQuery } from "../graphql/generated";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const Home = () => {
  const { data, loading, error } = usePostsQuery();

  if (!data || loading || error) {
    return <Loader />;
  }

  const { posts } = data;

  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Blogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: { first: 100 },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
