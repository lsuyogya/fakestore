"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartItem } from "../utils/types";

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  vatRate: 0.2,
  isOpen: false,
};

type CartActions = {
  addItem: (item: CartItem) => void;
  incrementQuantity: (
    amount: number,
    product: CartItem["product"],
  ) => void | unknown;
  removeItem: (productId: number) => void;
  showCart: (showCart: boolean) => void;
};

type CartStore = {
  cart: Cart;
  actions: CartActions;
};

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: initialCart,
      actions: {
        addItem: (item) =>
          set((state) => {
            const exists = state.cart.items.some(
              (cartItem) => cartItem.product.id === item.product.id,
            );
            if (exists) {
              return {
                cart: updateItemQuantity(
                  state.cart,
                  item.product.id,
                  state.cart.items.find(
                    (cartItem) => cartItem.product.id === item.product.id,
                  )!.quantity + item.quantity,
                ),
              };
            }

            return { cart: addItemToCart(state.cart, item) };
          }),

        //add product if product not on cart
        //remove product if qty reduced to 0
        incrementQuantity: (amount, product) =>
          set((state) => {
            const productId = product.id;

            const item = state.cart.items.find(
              (cartItem) => cartItem.product.id === productId,
            );
            if (!item) {
              return {
                cart: addItemToCart(state.cart, { product, quantity: amount }),
              };
            }

            const newQty = item.quantity + amount;
            if (newQty <= 0) {
              return { cart: removeItemFromCart(state.cart, productId) };
            }

            return { cart: updateItemQuantity(state.cart, productId, newQty) };
          }),

        removeItem: (productId) =>
          set((state) => {
            return { cart: removeItemFromCart(state.cart, productId) };
          }),

        showCart: (showCart) =>
          set((state) => ({
            cart: {
              ...state.cart,
              isOpen: showCart,
            },
          })),
      },
    }),
    { name: "cart-storage", partialize: (state) => ({ cart: state.cart }) },
  ),
);

export const useCart = () => useCartStore((state) => state.cart);
export const useCartActions = () => useCartStore((state) => state.actions);

//helper function for cart totals
function calcTotals(items: CartItem[]) {
  return items.reduce(
    (acc, cartItem) => ({
      totalItems: acc.totalItems + cartItem.quantity,
      totalPrice: acc.totalPrice + cartItem.product.price * cartItem.quantity,
    }),
    { totalItems: 0, totalPrice: 0 },
  );
}
// helper functions for cart operations
function addItemToCart(cart: Cart, item: CartItem): Cart {
  const updatedItems = [...cart.items, item];
  const { totalItems, totalPrice } = calcTotals(updatedItems);
  return {
    ...cart,
    items: updatedItems,
    totalItems,
    totalPrice,
  };
}

function removeItemFromCart(cart: Cart, productId: number): Cart {
  const updatedItems = cart.items.filter(
    (cartItem) => cartItem.product.id !== productId,
  );
  const { totalItems, totalPrice } = calcTotals(updatedItems);
  return {
    ...cart,
    items: updatedItems,
    totalItems,
    totalPrice,
  };
}

function updateItemQuantity(
  cart: Cart,
  productId: number,
  newQty: number,
): Cart {
  const updatedItems = cart.items.map((cartItem) =>
    cartItem.product.id === productId
      ? { ...cartItem, quantity: newQty }
      : cartItem,
  );
  const { totalItems, totalPrice } = calcTotals(updatedItems);
  return {
    ...cart,
    items: updatedItems,
    totalItems,
    totalPrice,
  };
}
