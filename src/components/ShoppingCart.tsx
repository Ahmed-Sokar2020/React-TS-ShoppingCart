import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap"
import { UseShoppingCart } from "../context/ShoppingCartContext"
import formatCurrency from "../utilities/formatCurrency"
import CartItem from "./CartItem"
import itemsData from '../data/items.json';

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart = ({isOpen}: ShoppingCartProps) => {
    const {closeCart, cartItems} = UseShoppingCart()

    return (
        <div>
            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle>Cart</OffcanvasTitle>
                </OffcanvasHeader>

                <OffcanvasBody>
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}

                        {cartItems.length > 0 ? (
                            <div className="ms-auto fw-bold fs-5">
                            Total: {formatCurrency(cartItems.reduce((total, cartItem) => {
                                const item = itemsData.find(item => item.id === cartItem.id);
                                return total + (item?.price || 0) * cartItem.quantity;
                            },0)
                            )}
                            </div>
                            )
                            : 
                            <p className="text-center fs-6">There Are No Items in The Cart!!</p>
                        }
                    </Stack>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}

export default ShoppingCart