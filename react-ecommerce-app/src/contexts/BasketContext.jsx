import { useEffect, useState, createContext, useContext } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    console.log('changeee');
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (newItem, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [newItem, ...items]);
    }
    const filtered = items.filter((items) => items._id !== findBasketItem._id);
    setItems(filtered);
  };
  const removeFromBasket = (deletingId) => {
    const filtered = items.filter((items) => items._id !== deletingId);
    setItems(filtered);
  };
  const emptyBasket = () => setItems([]);
  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket
  };
  return (
    <BasketContext.Provider value={values}> {children} </BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
