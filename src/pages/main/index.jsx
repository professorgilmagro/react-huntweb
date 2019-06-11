import React, { Component, Fragment } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default class Main extends Component {
	state = {
		products: [],
		productInfo: {},
		page: 1,
		loading: true
	};

	componentDidMount() {
		this.loadProducts();
	}

	// api.get('/products').then((resp) => {
	//     this.setState({products: resp.data.docs});
	// })
	loadProducts = async (page = 1) => {
        this.setState({loading: true});
        
        const response = await api.get(`/products?page=${page}`);
		const { docs, ...productInfo } = response.data;
		this.setState({ products: docs, productInfo, page, loading: false });
	};

	prevPage = () => {
		const { page } = this.state;

		// se estiver na primeira página, não faz nada
		if (page === 1) return;
		this.loadProducts(page - 1);
	};

	nextPage = () => {
		const { page, productInfo } = this.state;

		// se estiver na última página, não faz nada
		if (page === productInfo.pages) return;
		this.loadProducts(page + 1);
	};

	render() {
		const { products, productInfo, page, loading } = this.state;
		return (
			<Fragment>
				<main className="content">
                <ClipLoader
						loader="BeatLoader"
						sizeUnit={"px"}
						size={100}
						color={"#da552f"}
						loading={loading}
					/>
					<div className="product-list">
						{products.map(product => (
							<article key={product._id}>
								<strong>{product.title}</strong>
								<p>{product.description}</p>
								<Link to={`/products/${product._id}`}>
									Detalhes
								</Link>
							</article>
						))}
					</div>
				</main>

				<footer className="footer">
					<div className="actions">
						<button disabled={page === 1} onClick={this.prevPage}>
							Anterior
						</button>
						<button
							disabled={page === productInfo.pages}
							onClick={this.nextPage}
						>
							Próximo
						</button>
					</div>
				</footer>
			</Fragment>
		);
	}
}
