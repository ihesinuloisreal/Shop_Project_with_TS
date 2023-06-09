//import the data
import { Col, Row } from "react-bootstrap"
import storeItems from "../data/Items.json"
import { StoreItem } from "../Components/StoreItem"
export function Store() {

    return <><h1>Store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {storeItems.map(item =>(
               <Col><StoreItem {...item}/></Col> 
            ))}
        </Row>
    </>
}