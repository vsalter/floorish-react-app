import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';



const ProductPage = () => {
    const { id: productId } = useParams();

    const [qty, setQty] = useState(1);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    return (
        <>
            { isLoading? (
                <Loader />
            ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error }</Message>) : (
            <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={ x + 1 } value={ x + 1}>
                                                        { x + 1 }
                                                    </option>
                                                )) }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={1}>
                    
                </Col>
            </Row>
            </>
            ) }
        </>
    )
}

export default ProductPage