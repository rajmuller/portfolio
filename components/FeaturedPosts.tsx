import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FeaturedPostCard from "./FeaturedPostCard";
import { useFeaturedPostsQuery } from "../graphql/generated";
import { PostType } from "../graphql";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const customLeftArrow = (
  <div className="arrow-btn absolute left-0 flex cursor-pointer items-center justify-center rounded-full bg-cyan-600 py-3 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </div>
);

const customRightArrow = (
  <div className="arrow-btn absolute right-0 flex cursor-pointer items-center justify-center rounded-full bg-cyan-600 py-3 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
);

const FeaturedPosts = () => {
  const { data, loading, error } = useFeaturedPostsQuery();

  console.log({ data });

  if (!data || loading || error) {
    return null;
  }

  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {data.posts.map((post) => (
          <FeaturedPostCard
            key={post.id}
            post={post as Exclude<PostType, undefined | null>}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
