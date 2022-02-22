import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  Loader,
  PostDetail,
  PostWidget,
} from "../../components";
import { PostsType, PostType } from "../../graphql";
import { PostDocument, PostsDocument } from "../../graphql/generated";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  if (!post) {
    return <div>Post does not exist!</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    query: PostsDocument,
    variables: { first: 100 },
  });

  const posts: PostsType = data.data.posts;
  const params = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const data = await apolloClient.query({
    query: PostDocument,
    variables: { slug: params?.slug },
  });

  const post = data.data.post;

  return addApolloState(apolloClient, {
    props: { post },
  });
};

export default Post;
