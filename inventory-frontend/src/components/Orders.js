import { useEffect, useState } from "react";

export const Orders = () => {
    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('Buy your favorite product');
    const [total, setTotal] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const response = await fetch(`http://localhost:8000/products/${id}`);
                    const content = await response.json();
                    setPrice(parseFloat(content.price) * 1.2);
                    setMessage(`Your product price is $${price}`);
                }
            } catch (e) {
                setMessage('Buy your favorite product')
            }
        })();

    }, [id, price]);

    useEffect(() => {
        try {
            if (quantity) {
                setTotal(parseInt(quantity) * parseFloat(price))
            }
            else if (quantity === '') { setTotal(0) }
        }
        catch (e) {
            setTotal(0)
        }
    }, [quantity, price])

    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8001/orders', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                id, quantity
            })
        });

        setMessage('Thank you for your order!');
    }

    return <div className="container">
        <main>
            <div className="py-5 text-center">
                <h2>Checkout form</h2>
                <p className="lead">{message}</p>
                <p className="lead" style={{ fontSize: "1rem" }}><em>(including tax 20%)</em></p>
            </div>

            <form onSubmit={submit}>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label className="form-label">Product</label>
                        <input className="form-control"
                            onChange={e => setId(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control"
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <label className="h6">Total: {total}</label>
                    </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">Buy</button>
            </form>
        </main>
    </div>
}