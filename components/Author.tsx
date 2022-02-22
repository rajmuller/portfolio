import Image from "next/image";
import { ReactNode } from "react";
import { PostType } from "../graphql";

type AuthorProps = {
  children?: ReactNode;
  author: Exclude<PostType, undefined | null>["author"];
};

const Author = ({ author }: AuthorProps) => {
  return (
    <div className="relative mt-20 mb-8 rounded-lg bg-sky-800 bg-opacity-[0.95] p-12 text-center">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          className="z-10 rounded-full align-middle"
          width={100}
          height={100}
          alt={author!.name}
          src={author!.photo!.url}
          objectFit="cover"
        />
      </div>
      <h3 className="my-4 text-xl font-bold text-white">{author?.name}</h3>
      <p className="text-lg text-white">{author?.bio}</p>
    </div>
  );
};

export default Author;
