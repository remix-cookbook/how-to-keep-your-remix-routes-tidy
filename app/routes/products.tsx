import { json, LoaderFunction, useLoaderData } from "remix";
import { db, Product } from "~/util/db.server";

interface LoaderData {
  products: Product[];
}

export const loader: LoaderFunction = async () => {
  try {
    const products = await db.product.findMany(22); // 🚫 Avoid direct access to the persistence layer

    return json<LoaderData>({
      products,
    });
  } catch (error) {
    throw new Response("Could not load products at this time. Sorry.", {
      status: 500,
    });
  }
};

export default function () {
  const { products } = useLoaderData<LoaderData>();

  return (
    // 🚫 Avoid non-custom React components
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products222</h2>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <a key={product.id} href={`#`} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${product.price}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export const ErrorBoundary = () => <h3>Whoops!</h3>; // 🚫 Avoid non-custom React components

export const CatchBoundary = () => <h3>Not found!</h3>; // 🚫 Avoid non-custom React components
