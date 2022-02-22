import Image from "next/image";
import moment from "moment";
import { default as NextLink } from "next/link";

import { PostsType } from "../graphql";

import { Link } from ".";

type PostCardProps = {
  post: PostsType[0];
};

const PostCard = ({ post }: PostCardProps) => {
  const { author } = post;

  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-t-lg shadow-lg lg:rounded-lg">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-700 line-clamp-3 hover:-translate-y-1 hover:text-cyan-600">
        <NextLink href={`/post/${post.slug}`}>{post.title}</NextLink>
      </h1>
      <div className="flex flex-col items-center justify-evenly gap-4 text-center sm:flex-row">
        <div className="relative flex items-center justify-center">
          <Image
            alt={author!.name}
            height={30}
            width={30}
            src={author!.photo!.url}
            className="rounded-full align-middle"
          />
          <p className="ml-2 inline align-middle text-lg text-gray-700">
            {author!.name}
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-cyan-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="my-8 px-4 text-center text-lg font-normal text-gray-700">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>Continue Reading</Link>
      </div>
    </div>
  );
};

export default PostCard;
