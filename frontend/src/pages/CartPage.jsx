import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';


const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>CartPage</div>
    )
}

export default CartPage