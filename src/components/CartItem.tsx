import { Button, Stack } from 'react-bootstrap'
import { UseShoppingCart } from '../context/ShoppingCartContext'
import itemsData from '../data/items.json';
import formatCurrency from '../utilities/formatCurrency';

type CartItemProps = {
    id: number
    quantity: number
}


const CartItem = ({id, quantity}:CartItemProps) => {
    const {removeItemFromCart} = UseShoppingCart();

    const itemInCart = itemsData.find(item => item.id === id);
    if(itemInCart === null) return null;
    
    return (
        <div>
            <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
                <img 
                src={itemInCart?.imgUrl} 
                alt="img" 
                style={{
                    width:'50px',
                    height:'50px',
                    objectFit:'cover'
                    }}
                />

                <div className='me-auto'>
                    <div>
                        {itemInCart?.name} 
                        {quantity > 1 && (
                        <span className='text-muted' style={{fontSize:'.7rem'}}> x{quantity}</span>
                        )} 
                    </div>
                    <div className='text-muted' style={{fontSize:'.8rem'}}>
                        {formatCurrency(itemInCart!.price)}
                    </div>
                </div>

                <div>
                    {formatCurrency((itemInCart?.price || 0) * quantity) }
                </div>
                
                <Button
                variant='danger'
                size='sm'
                onClick={() => removeItemFromCart(id)}
                > &times;

                </Button>
            </Stack>
        </div>
    )
}

export default CartItem