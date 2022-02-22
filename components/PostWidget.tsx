import { ReactNode, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSimilarPostsLazyQuery } from "../graphql/generated";
import moment from "moment";
import { Loader } from ".";

type PostWidgetProps = {
  children?: ReactNode;
  categories?: string[];
  slug?: string;
};

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
  const [getSimilarPosts, { loading, error, data }] =
    useSimilarPostsLazyQuery();

  useEffect(() => {
    if (slug && categories) {
      getSimilarPosts({ variables: { categories, slug } });
    } else {
      getSimilarPosts();
    }
  }, [categories, slug, getSimilarPosts]);

  if (loading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Error! {error}</p>;
  }

  const { similarPosts, posts } = data;
  const relevantPosts = similarPosts?.length ? similarPosts : posts;

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="text=xl mb-8 border-b pb-4 font-semibold">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      <div className="flex flex-col gap-4">
        {relevantPosts?.map((post) => (
          <div
            className="flex w-full flex-col items-start gap-2"
            key={post.title}
          >
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="relative flex h-16 w-16 flex-none">
                <Image
                  layout="fill"
                  alt={post.title}
                  objectFit="cover"
                  src={post.featuredImage.url}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center justify-center transition duration-700 line-clamp-3 hover:-translate-y-1 hover:text-cyan-600">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </div>
            </div>
            <p className="whitespace-nowrap text-center text-xs text-gray-500">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
