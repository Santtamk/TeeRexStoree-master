import React from "react";
import './card.css'


 const Card = ({product, handleClick})  => {

   
    return(

            <div className="card rounded shadow border-0 " style={{width: '15rem'}}>
                <img className="img-thumbnail card-all-image" src={product.imageURL} alt={product.name}/>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{product.name}</h5>
                        <h5 className="card-title">{product.currency} {product.price}</h5>
                    </div>
                    <div>
                          <button type="button" className="btn btn-dark w-100" onClick={() => handleClick(product)}>Add to cart</button>
                    </div>
                </div>
            </div>
    )
}

export default Card;