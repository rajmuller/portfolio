import { ReactNode } from "react";
import Image from "next/image";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { NodeRendererType } from "@graphcms/rich-text-types";

import { PostType } from "../graphql";
import Link from "next/link";

type PostDetailProps = {
  children?: ReactNode;
  post: PostType;
};

const renderers: NodeRendererType = {
  h1: ({ children }) => <h1 className="text-4xl font-semibold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-medium">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-medium">{children}</h3>,
  a: ({ children, openInNewTab, href, rel, ...rest }) => {
    if (href!.match(/^https?:\/\/|^\/\//i)) {
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          href={href}
          target={openInNewTab ? "_blank" : "_self"}
          rel={rel || "noopener noreferrer"}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href!}>
        <a {...rest}>{children}</a>
      </Link>
    );
  },
};

const PostDetail = ({ post }: PostDetailProps) => {
  if (!post) {
    return <div>Post does not exist!</div>;
  }

  return (
    <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 aspect-video overflow-hidden rounded-t-lg shadow-md">
        <Image
          src={post.featuredImage.url}
          alt="featured image"
          priority
          layout="fill"
          objectFit="cover"
          className="shadow-lg lg:rounded-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="mb-8 flex w-full items-center">
          <div className="relative mr-8 hidden items-center justify-center md:flex lg:mb-0 lg:w-auto">
            <Image
              alt={post.author!.name}
              height="30px"
              width="30px"
              className="rounded-full align-middle"
              src={post!.author!.photo!.url}
            />
            <p className="ml-2 inline align-middle text-lg font-medium text-gray-700">
              {post.author!.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-6 w-6 text-cyan-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 border-b border-b-cyan-500 border-opacity-40 pb-2 text-3xl font-semibold">
          {post.title}
        </h1>
        <div className="text- flex flex-col gap-4 leading-loose">
          <RichText content={post.content.raw} renderers={renderers} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
