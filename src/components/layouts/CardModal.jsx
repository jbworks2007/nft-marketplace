import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
//import Walletcall from '../../pages/Walletcall';
//import { buyNFT, listNFT } from '../../pages/BuyNFT';

const CardModal = (props) => {
    console.log("token id in modal --- ", props.token_id)
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Buy Now</h3>
        <p className="text-center">You must have enough Ether<span className="price color-popup"></span>
        </p>
        <input type="text" className="form-control"
            placeholder="0.007 ETH" />
        <p>Enter quantity. <span className="color-popup">1 available</span>
        </p>
        <input type="number" className="form-control" placeholder="1" />
        <div className="hr"></div>
        <div className="d-flex justify-content-between">
            <p> You must have enough Ether:</p>
            <p className="text-right price color-popup"> 0.007 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Service free:</p>
            <p className="text-right price color-popup"> 0.005 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Total amount:</p>
            <p className="text-right price color-popup"> 0.007+servicefee+gasfee ETH </p>
        </div>
        <Link to="../WalletConnect" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Pay Now</Link>
    </div>
    </Modal>
    
  );
};

/*

const CardModalBuy = (props) => {
    console.log("token id in modal --- ", props.token_id)
return (

    <Modal
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body space-y-20 pd-40">
        <h3>Buy Now</h3>
        <p className="text-center">You must have enough Ether<span className="price color-popup"></span>
        </p>
        <input type="text" className="form-control"
            placeholder="0.007 ETH" />
        <p>Enter quantity. <span className="color-popup">1 available</span>
        </p>
        <input type="number" className="form-control" placeholder="1" />
        <div className="hr"></div>
        <div className="d-flex justify-content-between">
            <p> You must have enough Ether:</p>
            <p className="text-right price color-popup"> 0.007 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Service free:</p>
            <p className="text-right price color-popup"> 0.005 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
            <p> Total amount:</p>
            <p className="text-right price color-popup"> 0.007+servicefee+gasfee ETH </p>
        </div>
        <Button onClick={()=> buyNFT(props.token_id, "0.00000007")} className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Pay Now</Button>
    </div>
    </Modal>
    
  );
};
*/

export default CardModal;
