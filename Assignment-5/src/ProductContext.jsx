import { createContext, useContext, useState } from "react";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [newProduct, setNewProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ newProduct, setNewProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProduct must be used inside ProductProvider");
  }
  return ctx;
}
