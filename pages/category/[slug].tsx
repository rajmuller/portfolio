import React from "react";
import { useRouter } from "next/router";

import { PostCard, Categories, Loader } from "../../components";
import { GetStaticPaths, GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  CategoriesDocument,
  GetCategoryPostDocument,
  GetCategoryPostQueryResult,
} from "../../graphql/generated";
import { CategoriesType } from "../../graphql";

type CategoryPostProps = {
  posts: any;
};

const CategoryPost = ({ posts }: CategoryPostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    query: CategoriesDocument,
  });

  const categories: CategoriesType = data.data.categories;
  const params = categories.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const data = (await apolloClient.query({
    query: GetCategoryPostDocument,
    variables: { slug: params!.slug },
  })) as GetCategoryPostQueryResult;

  const posts = data.data?.postsConnection.edges;

  return {
    props: { posts },
  };
};

export default CategoryPost;
