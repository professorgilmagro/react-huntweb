import React, { Component, Fragment } from "react";
import api from "../../services/api";
import "./styles.css";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

class Product extends Component {
	state = {
		product: {},
		loading: true
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		const response = await api.get(`/products/${id}`);
		this.setState({ product: response.data, loading: false });
	}

	render() {
		const { product, loading } = this.state;
		return (
			<Fragment>
				<main className="content">
					<div className="product-info">
						<ClipLoader
							loader="BeatLoader"
							sizeUnit={"px"}
							size={100}
							color={"#da552f"}
							loading={loading}
						/>
						<h1>{product.title}</h1>
						<p>{product.description}</p>

						<p>
							URL: <a href={product.url}>{product.url}</a>
						</p>
					</div>
				</main>
				<footer className="footer">
					<Link className="back" to="/">Voltar</Link>
				</footer>
			</Fragment>
		);
	}
}

export default Product;
