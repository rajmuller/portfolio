import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCommentsQuery,
  useCreateCommentMutation,
  usePublishCommentMutation,
} from "../graphql/generated";

type CommentsFormProps = {
  children?: ReactNode;
  slug: string;
};

type Inputs = {
  name: string;
  email: string;
  comment: string;
  saveUser: boolean;
};

const getStoredName = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("name") || "";
  }
};

const getStoredEmail = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("email") || "";
  }
};

const RequiredErrorMessage = ({ show }: { show: boolean }) => {
  if (!show) {
    return (
      <span className="select-none text-xs text-red-600 opacity-0">error</span>
    );
  }

  return (
    <span className="select-none text-xs text-red-600">
      This field is required
    </span>
  );
};

const CommentsForm = ({ slug }: CommentsFormProps) => {
  const [createComment, { data, loading }] = useCreateCommentMutation();
  const [publishComment, { data: publishData }] = usePublishCommentMutation();
  const { refetch } = useCommentsQuery({ variables: { slug } });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    comment,
    name,
    saveUser,
  }) => {
    if (saveUser) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    createComment({
      variables: { email, comment, name, slug },
    });

    reset();
  };

  useEffect(() => {
    if (data?.createComment?.id) {
      const publishCommentResult = publishComment({
        variables: { id: data.createComment.id },
      });

      toast.promise(
        publishCommentResult,
        {
          loading: "Submitting Comment",
          success: "Successfully submitted your comment!",
          error: "Error while submitting",
        },
        {
          success: {
            duration: 5000,
            icon: "🔥",
          },
        }
      );
    }
  }, [data, loading, publishComment]);

  useEffect(() => {
    refetch();
  }, [publishData, refetch]);

  const defaultName = getStoredName();
  const defaultEmail = getStoredEmail();

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Leave a Comment
      </h3>

      <form className="mb-4 grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-baseline">
          <label htmlFor="name" className="inline-block text-xl text-gray-700">
            Name<span className="align-top text-xs text-red-600">*</span>
          </label>
          <RequiredErrorMessage show={!!errors.name} />
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            id="name"
            type="text"
            // value={localStorage localStorage.getItem("name") ?? undefined}
            className="mb-6 w-full rounded-lg border bg-slate-200 p-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-sky-300"
            defaultValue={defaultName}
          />
        </div>

        <div className="flex flex-col items-baseline">
          <label htmlFor="email" className="inline-block text-xl text-gray-700">
            Email<span className="align-top text-xs text-red-600">*</span>
          </label>
          <RequiredErrorMessage show={!!errors.email} />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            id="email"
            className="mb-6 w-full rounded-lg bg-slate-200 p-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-sky-300"
            defaultValue={defaultEmail}
          />
        </div>

        <div className="flex flex-col items-baseline">
          <label
            htmlFor="comment"
            className="inline-block text-xl text-gray-700"
          >
            Comment<span className="align-top text-xs text-red-600">*</span>
          </label>
          <RequiredErrorMessage show={!!errors.comment} />
          <textarea
            {...register("comment", { required: true })}
            placeholder="Comment"
            id="comment"
            className="mb-4 w-full rounded-lg bg-slate-200 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div className="flex cursor-pointer items-center">
          <input
            {...register("saveUser")}
            type="checkbox"
            className="rounded-sm"
            id="saveUser"
            defaultChecked
          />
          <label
            htmlFor="saveUser"
            className="ml-2 cursor-pointer text-gray-500"
          >
            Save my email and name
          </label>
        </div>

        <button
          disabled={loading}
          className="mt-8 inline-flex cursor-pointer justify-self-start rounded-lg bg-cyan-600 py-3 px-8 text-lg text-white  transition duration-500 ease-out hover:-translate-y-1"
          type="submit"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentsForm;
