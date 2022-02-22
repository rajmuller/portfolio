import Link from "next/link";
import { Loader } from ".";
import { useCategoriesQuery } from "../graphql/generated";

const Header = () => {
  const { data, loading, error } = useCategoriesQuery();

  if (loading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Error! {error}</p>;
  }

  const { categories } = data;

  return (
    <header className="container mx-auto mb-8 px-10">
      <div className="flex w-full items-center justify-between border-b border-cyan-400 border-opacity-50 py-8">
        <Link href="/">
          <a className="cursor-pointer text-4xl font-bold text-cyan-100">
            Blogue
          </a>
        </Link>
        <nav className="hidden gap-4 md:flex">
          {categories.slice(0, 5).map((category) => (
            <span key={category.id}>
              <Link href={`/category/${category.slug}`}>
                <a className="cursor-pointer align-middle font-semibold text-white">
                  {category.name}
                </a>
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
