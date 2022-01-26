import faker from "faker";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const db = {
  product: {
    findMany: (qty = 20): Promise<Product[]> =>
      Promise.resolve(
        [...Array(qty).keys()].map((key) => ({
          id: key + 1,
          name: faker.lorem.words(7),
          price: faker.finance.amount(),
          image: faker.image.fashion(),
        }))
      ),
  },
};
