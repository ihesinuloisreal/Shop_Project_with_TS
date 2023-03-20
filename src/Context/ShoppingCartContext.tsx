import {ReactNode, createContext, useContext, useState } from "react"
import { ShoppingCart } from "../Components/ShoppingCart"
import { useLocalStorage } from "../Hooks/useLocalStorage"

type shoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

// Type of all the function we need in this context, what there accept and what there give out
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCardQuantity: (id: number) => void
    decreaseCardQuantity: (id: number) => void
    removeFromCard: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

// setting the shoppingCardContext type
const ShoppingCartContext = createContext({} as ShoppingCartContext)

// function for getting our context
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// function for implementing provider
export function ShoppingCartProvider({ children }:shoppingCartProviderProps) {
    const [isOpen, setisOpen] = useState(false)
    // Use state with Type of CartItem
    const [cartItems, setcartItems] = useLocalStorage<CartItem[]>("Shopping-cart",[])

    // Checking to see if item exist 
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCardQuantity(id: number) {
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity:1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCardQuantity(id: number) {
        setcartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCard(id: number) {
        setcartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setisOpen(true)
    const closeCart = () => setisOpen(false)



    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCardQuantity, decreaseCardQuantity, removeFromCard, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}