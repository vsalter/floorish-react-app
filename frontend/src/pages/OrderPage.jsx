import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";


const OrderPage = () => {
    return (
        <div>Order Page</div>
    )
};


export default OrderPage;