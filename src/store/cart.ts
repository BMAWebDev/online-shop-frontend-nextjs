// Modules
import create from "zustand";
import { persist } from "zustand/middleware";

// Types
import { ICartProduct } from "src/types";

export interface ICartStoreProps {
  products: ICartProduct[];
  setProducts: (_products: ICartProduct[]) => void;
  addProduct: (_product: ICartProduct) => void;
  updateProductQuantity: (_productQuantity: number, _productID: number) => void;
  removeProduct: (_productID: number) => void;
  clear: () => void;
}

const cartStore = create<ICartStoreProps>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (_products) => set(() => ({ products: _products })),
      addProduct: (_product) =>
        set((state) => ({ products: [...state.products, _product] })),
      updateProductQuantity: (_productQuantity, _productID) =>
        set((state) => ({
          products: state.products.map((_prod) => {
            if (_prod.id !== _productID) return _prod;

            return {
              id: _prod.id,
              quantity: _productQuantity,
              full_product: _prod.full_product,
            };
          }),
        })),
      removeProduct: (_productID) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== _productID
          ),
        })),
      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "cart-storage-next-online-shop",
    }
  )
);

export default cartStore;
