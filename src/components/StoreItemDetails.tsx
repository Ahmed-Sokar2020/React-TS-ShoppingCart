import { Button, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import itemsData from '../data/items.json';
import { UseShoppingCart } from "../context/ShoppingCartContext";
import formatCurrency from "../utilities/formatCurrency"
import { Link } from "react-router-dom";

type StoreItemDetailsProps = {
    id:number
    name: string
    price: number
    imgUrl: string
    description: string
}


const StoreItemDetails = () => {
    const {
        getItemQuantity, 
        increaseCartItem, 
        decreaseCartItem, 
        removeItemFromCart
    } = UseShoppingCart();

    const { id } = useParams<{ id: string }>();
    const [itemDetails, setItemDetails] = useState<StoreItemDetailsProps | null>(null);
    const quantity = getItemQuantity(Number(id));

    useEffect(() => {
        const selectedItem = itemsData.find(item => item.id === Number(id));

        if (selectedItem) {
            setItemDetails(selectedItem);
        }
    }, [id]);

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Link to={'/store'}>
                <Button 
                variant="primary" 
                size="sm"
                >Back
                </Button>    
            </Link>

            <div className="d-flex justify-content-center align-items-center">
                <Card className="w-50">
                    <Card.Img 
                    variant="top" 
                    src={itemDetails.imgUrl}
                    width="100%" 
                    height="300px" 
                    style={{objectFit:'fill', padding:'10px'}}
                    alt="image"
                    />
                    
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="d-flex flex-column justify-content-between align-items-start mb-4">
                            <span>
                                <strong>Name: </strong>
                                <span className="text-muted">{itemDetails.name}</span>
                            </span>
                            
                            <span>
                                <strong>Price: </strong>
                                <span className="text-muted">
                                    {formatCurrency(itemDetails.price)}
                                </span>
                            </span>
                        </Card.Title>

                        <span>
                            <strong>Description:</strong>
                        </span>
                        <p>{itemDetails.description}</p>

                        <div className="mt-auto">
                            {quantity === 0 ? (
                                <Button
                                variant="primary" 
                                className="w-100"
                                onClick={()=> increaseCartItem(Number(id))}
                                > + Add To Cart
                                </Button>
                            ) : 
                            <div className="d-flex flex-column align-items-center" style={{gap:'.5rem'}}>
                                <div className="d-flex justify-content-center align-items-center" style={{gap:'1rem'}}>
                                    <Button onClick={()=> decreaseCartItem(Number(id))}>
                                        <span className="fw-bold">-</span>
                                    </Button>
                                    <div>
                                        <span className="badge rounded-circle bg-success fs-5">{quantity}</span> in cart
                                    </div>
                                    <Button onClick={()=> increaseCartItem(Number(id))}>
                                        <span className="fw-bold">+</span>
                                    </Button>
                                </div>

                                <Button 
                                variant="danger" 
                                size="sm"
                                onClick={()=> removeItemFromCart(Number(id))}
                                >Remove
                                </Button>
                            </div>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default StoreItemDetails