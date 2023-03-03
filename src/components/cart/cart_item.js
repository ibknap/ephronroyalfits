import { Add, Minus, Trash } from 'iconsax-react';
import { useCart } from '@/pages/cart/cart_context';
import toCurrency from '@/components/utils/toCurrency'
import Link from 'next/link';

export default function CartItem({ item }) {
    const { items, removeItem, updateQuantity } = useCart();

    const increaseQuantity = (id) => {
        const item = items.find((item) => item.id === id);
        updateQuantity(id, item.quantity + 1);
    };

    const decreaseQuantity = (id) => {
        const item = items.find((item) => item.id === id);
        if (item.quantity > 1) {
            updateQuantity(id, item.quantity - 1);
        } else {
            removeItem(id);
        }
    };

    return (

        <div className="col-12">
            <ul className="list-unstyled ">
                <li className="my-2 p-2 card">
                    <Link href={`/product/${item.id}`} className="text-decoration-none secondary">
                        <div className="d-flex my-2 p-2 position-relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded border"
                                width={100}
                                height={100}
                            />
                            <div className="d-flex flex-column w-75 px-2">
                                <span className="secondary ">{item.name}</span>
                                <span><b>{toCurrency(item.price)}</b></span>
                                <span>Qty: <b>{item.quantity}</b></span>
                            </div>
                        </div>
                    </Link>

                    <div className="d-flex justify-content-between">
                        <button className="border_none trans text-danger" onClick={() => removeItem(item.id)}>
                            <Trash />
                            Remove
                        </button>
                        <div className="d-flex">
                            <button className="border_none mx-2 bg_primary rounded white shadow-sm" onClick={() => decreaseQuantity(item.id)}>
                                <Minus />
                            </button>
                            <button className="border_none mx-2 bg_primary rounded white shadow-sm" onClick={() => increaseQuantity(item.id)}>
                                <Add />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
