import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContextType = {
    getItemQuantity: (id:number) => number
    increaseCartItem: (id:number) => void
    decreaseCartItem: (id:number) => void
    removeItemFromCart: (id:number) => void
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id:number
    quantity:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)

export function UseShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('my-shopping-cart',[]);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity +  quantity, 0)

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity (id:number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartItem(id:number) {
        setCartItems(currItems => {
            // If the Cart Items Doesn't have any Items
            const currentItems = currItems.find(item => item.id === id)
            if(currentItems == null) {
                return [...currItems, {id, quantity:1}]
            // If the Cart Items have Items in it
            } else {
                return currItems.map(item => {
                    // Check for the Specified Increased Item 
                    if(item.id === id) {
                        return {...item, quantity:item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartItem(id:number) {
        setCartItems(currItems => {
            const currentItems = currItems.find(item => item.id === id)
            if(currentItems?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity:item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    
    function removeItemFromCart(id:number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider 
        value={{
        getItemQuantity, 
        increaseCartItem, 
        decreaseCartItem, 
        removeItemFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
        }}
        >
            {children}
            <ShoppingCart isOpen= {isOpen}/>
            
        </ShoppingCartContext.Provider>
    )
}

