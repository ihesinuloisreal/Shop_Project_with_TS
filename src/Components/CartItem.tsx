import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../Context/ShoppingCartContext"
import storeItems from "../data/Items.json"
import { FormatCurrency } from "../Utilities/FormatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const {removeFromCard} = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="">
            <img 
                src={item.imgUrl} style={{ width: "125px" ,    height: "75px", objectFit:"cover" }} 
            />
            <div className="me-auto">
                <div>
                    {item.name} {quantity > 1 &&<span className="text-muted" style={{ fontSize: ".65rem"}}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: ".75"}}>
                    {FormatCurrency(item.price)}
                </div>
            </div>
            <div>{FormatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCard(item.id)}>&times;</Button>

        </Stack>
    )
}