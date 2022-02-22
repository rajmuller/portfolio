import Link from "next/link";
import { Loader } from ".";
import { useCategoriesQuery } from "../graphql/generated";

const Categories = () => {
  const { data, loading, error } = useCategoriesQuery();

  if (loading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Error! {error}</p>;
  }

  const { categories } = data;

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="text=xl mb-8 border-b pb-4 font-semibold">Categories</h3>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/cateogory/${category.slug}`}>
            <a className="cursor-pointer">{category.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
