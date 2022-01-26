import { json, LoaderFunction, useLoaderData } from "remix";

// ⚠️ This file doesn't exist in this project. This is just an example
import { StoreApi, Products } from "~/features/Store";

// ⚠️ This file doesn't exist in this project. This is just an example
import { GeneralErrorBoundary, GeneralCatchBoundary } from "~/components";

interface LoaderData {
  products: StoreApi.Types.Product[]; // ✅ Abstract types and interfaces
}

export const loader: LoaderFunction = async () => {
  try {
    const products = await StoreApi.getProducts(22); // ✅ Abstract access to the persistence layer

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

  return <Products products={products} />; // ✅ Only your custom components in the route
}

export const ErrorBoundary = () => <GeneralErrorBoundary />; // ✅ Only your custom components in the route

export const CatchBoundary = () => <GeneralCatchBoundary />; // ✅ Only your custom components in the route
