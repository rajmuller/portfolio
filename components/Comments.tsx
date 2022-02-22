import moment from "moment";
import { ReactNode } from "react";
import parse from "html-react-parser";

import { useCommentsQuery } from "../graphql/generated";
import { Loader } from ".";

type CommentsProps = {
  children?: ReactNode;
  slug: string;
};

const Comments = ({ slug }: CommentsProps) => {
  const { data, loading, error } = useCommentsQuery({
    variables: { slug },
  });

  if (loading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Error! {error}</p>;
  }

  if (!data.comments.length) {
    return null;
  }

  return (
    <>
      <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
        <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
          {data.comments.length} Comments
        </h3>
        {data.comments.map(({ comment, name, id, createdAt }) => {
          return (
            <div key={id} className="mb-8 border-b border-gray-100">
              <p className="mb-1">
                <span className="font-semibold">{name}</span>
                <span className="font-normal">
                  {" "}
                  on {moment(createdAt).format("MMM DD, YYYY")}
                </span>
              </p>
              <p className="whitespace-pre-line rounded-md text-gray-700">
                {parse(comment)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
