import {
  CategoriesQuery,
  PostQuery,
  PostsQuery,
  SimilarPostsQuery,
} from "./generated";

// export type PostType = Exclude<PostQuery["post"], null | undefined>;
export type PostType = PostQuery["post"];

export type PostsType = PostsQuery["posts"];

export type SimilarPostsType = SimilarPostsQuery["posts"];

export type SimilarPostType = SimilarPostsQuery["posts"][0];

export type CategoriesType = CategoriesQuery["categories"];
