import { Button, Card } from "react-bootstrap";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency"
import { Link } from "react-router-dom";

type StoreItemProps = {
    id:number
    name: string
    price: number
    imgUrl: string
    description: string
}

const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {

    const {
        getItemQuantity, 
        increaseCartItem, 
        decreaseCartItem, 
        removeItemFromCart
    } = UseShoppingCart();

    const quantity = getItemQuantity(id);

    return (
        <div>
            <Card className="h-100">
                <Link to={`item-details/${id}`}>
                    <Card.Img 
                    variant="top" 
                    src={imgUrl}
                    width="100%" 
                    height="300px" 
                    style={{objectFit:'fill', cursor:'pointer', padding:'10px'}}
                    alt="image"
                    />
                </Link>

                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                        <span className="fs-3">{name}</span>
                        <span className="text-muted">{formatCurrency(price)}</span>
                    </Card.Title>

                    <div className="mt-auto">
                        {quantity === 0 ? (
                            <Button
                            variant="success" 
                            className="w-100 text-light"
                            onClick={()=> increaseCartItem(id)}
                            > + Add To Cart
                            </Button>
                        ) : 
                        <div className="d-flex flex-column align-items-center" style={{gap:'.5rem'}}>
                            <div className="d-flex justify-content-center align-items-center" style={{gap:'1rem'}}>
                                <Button onClick={()=> decreaseCartItem(id)}>
                                    <span className="fw-bold">-</span>
                                </Button>
                                <div>
                                    <span className="badge rounded-circle bg-success fs-5">{quantity}</span> in cart
                                </div>
                                <Button onClick={()=> increaseCartItem(id)}>
                                    <span className="fw-bold">+</span>
                                </Button>
                            </div>

                            <Button 
                            variant="danger" 
                            size="sm"
                            onClick={()=> removeItemFromCart(id)}
                            >Remove
                            </Button>
                        </div>
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreItem