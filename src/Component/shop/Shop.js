import React from 'react';
import './shop.scss';
import EmptyShop from './EmptyShop';
import { Link } from 'react-router-dom';
import supabase from '../../supabase';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateQtyPlus,
	deleteFromShop,
	decreaseProductQty,
} from '../../features/listOfProduct';

const Shop = ({ basket, setBasket, sumOfProducts, getProducts }) => {
	const product = useSelector((state) => state.product.value);

	const sumOfPrices = product.items.filter((item) => item.inShop === true);
	const totalSum = sumOfPrices.map(
		(item) => item.products_price * item.product_qty
	);

	const dispatch = useDispatch();

	const increaseProduct = async (id) => {
		dispatch(updateQtyPlus(id));
		const findProducts = product.items.find((el) => el.id === id);

		const { data, error } = await supabase
			.from('products')
			.update({
				product_qty: findProducts.product_qty + 1,
			})
			.eq('id', id)
			.sort();
		getProducts();
	};

	const decreaseProduct = async (id) => {
		dispatch(decreaseProductQty(id));
		const findProducts = product.items.find((el) => el.id === id);

		const { data, error } = await supabase
			.from('products')
			.update({
				product_qty:
					findProducts.product_qty === 1 ? 1 : findProducts.product_qty - 1,
			})
			.eq('id', id);
		getProducts();
	};

	const removeFromShop = async (id) => {
		dispatch(deleteFromShop(id));
		const { data, error } = await supabase
			.from('products')
			.update({
				inShop: false,
				product_qty: 0,
			})
			.eq('id', id);
		getProducts();
	};

	if (!product.items) return null;
	return (
		<section className={basket ? 'shopCart show ' : 'shopCart'}>
			<div className={'shopCartHeader'}>
				<span>
					<i className='shopI fa-brands fa-shopify'></i>Shopping Cart
				</span>
				<button onClick={() => setBasket(false)}>
					<i className=' shopI fa-solid fa-x'></i>
				</button>
				{sumOfPrices.length === 0 ? null : (
					<div className={'cardFinishPanel'}>
						<div className={'totalPrice'}>
							<span>
								Subtotal Item:
								<strong>
									{' '}
									({sumOfProducts.reduce((a, b) => a + b)}{' '}
									{sumOfProducts.reduce((a, b) => a + b) > 1 ? `items` : `item`}
									)
								</strong>
							</span>
							<span>
								Total :{' '}
								<strong>{totalSum.reduce((a, b) => a + b).toFixed(2)} $</strong>
							</span>
						</div>
						<button>Buy</button>
					</div>
				)}
			</div>
			<section className={'shopSingielItem'}>
				{product.items.filter((el) => el.inShop === true).length === 0 ? (
					<EmptyShop setBasket={setBasket} />
				) : (
					product.items
						.filter((product) => product.inShop === true)
						.map((product) => (
							<article key={product.id} className={'itemCard'}>
								<i
									onClick={() => removeFromShop(product.id)}
									className='deleteFromShop fa-solid fa-x'
								></i>
								<h3>{product.products_name}</h3>

								<div className={'inputContainer'}>
									<img src={product.products_img} alt={product.products_name} />
									<div className={'inputBox'}>
										<button
											onClick={() => decreaseProduct(product.id)}
											className={'decrease'}
										>
											<i className='fa-solid fa-minus'></i>
										</button>
										<input value={product.product_qty} type='number' />
										<button
											onClick={() => increaseProduct(product.id)}
											className={'increase'}
										>
											<i className='fa-solid fa-plus'></i>
										</button>
									</div>
								</div>

								<div className={'price'}>
									<button onClick={() => setBasket(false)}>
										<Link to={'/'}>Back To Shoping</Link>
									</button>
									<span>
										<strong>Price</strong>:{' '}
										{(product.product_qty * product.products_price).toFixed(2)}$
									</span>
								</div>
							</article>
						))
				)}
			</section>
		</section>
	);
};

export default Shop;
