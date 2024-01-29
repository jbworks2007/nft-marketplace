import { ethers } from 'ethers';
//import { useEffect, useState } from 'react';
//import axios from 'axios';
import Web3Modal from 'web3modal';
//import marketplaceabi from './marketplaceabi';
import { minterabi } from './minterabi';
import marketabi from "./marketabi"; 

const minter = "0x078b342d7e19bb22e435a20bd533860ef91ce237";
//const marketplace = "0xEe0DE77c57b2f8A1F85059AD823416cB1e77644B";
const marketplace = "0xfB56CeFfa30fe04812BDdc4f883d83a50f468Adf";

async function listNFT(tokenID, nftprice){
    try{
        //const url = await uploadToIPFS()

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        /* list the NFT */
        const price = ethers.utils.parseUnits(nftprice, 'ether')
        console.log("price in ether :", price)
        let marketContract = new ethers.Contract(marketplace, marketabi, signer)
        let minterContract = new ethers.Contract(minter, minterabi, signer)

        //let listingPrice = await contract.getListingFee()
        let listingPrice = "0.001"
        console.log("listing price :", listingPrice)
        //listingPrice = listingPrice.toString()
        listingPrice = ethers.utils.parseUnits(listingPrice, 'ether')
        console.log("listing price after parse:", listingPrice)
        let tx = await minterContract.approve(marketplace, tokenID)
        //let tx = await minterContract.setApprovalForAll(marketplace, true)
        await tx.wait()
        let transaction = await marketContract.listNft(minter, tokenID, price, { value: listingPrice })
        await transaction.wait()
        alert("NFT listed sucessfully")
    }catch(err){
    console.log("Error :", err)
    }
}

async function buyNFT(tokenID, nftPrice) {
    try{
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        //const contract = new ethers.Contract(marketplace, marketplaceabi, signer)
        const marketContract = new ethers.Contract(marketplace, marketabi, signer)

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nftPrice, 'ether')
        console.log("price :", price)
        //await marketContract.approve(marketplace, tokenID)
        const transaction = await marketContract.buyNft(minter, tokenID, {value: price})
        await transaction.wait()
        alert("Yay!, purchase sucessfull")
        //loadNFTs()
    }
        catch(err){
            console.log("Error :", err)
        }
}


async function getMarketplaceNFT() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketplace, marketabi, signer)

    const nftdata = await marketContract.getListedNfts()
    console.log("nftdata of marketplace :", nftdata);
}



export {buyNFT, listNFT, getMarketplaceNFT};