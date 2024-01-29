import { React, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//import img1 from '../assets/images/box-item/image-box-6.jpg'
import avt from "../assets/images/avatar/avt-9.jpg";
//import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { minterabi } from "./minterabi";
import axios from "axios";
import FormData from "form-data";
//import pinata from '@pinata/sdk';

//const client = ipfsHttpClient("https://api.pinata.cloud/pinning/pinFileToIPFS");
// Passing IPFS-Infura URI
const minter = "0x078b342d7e19bb22e435a20bd533860ef91ce237";

const CreateItem = () => {
  const PINATA_API_KEY = "2bdca7ff35bb35033456";
  const PINATA_API_SECRET =
    "1189bdead2d748fef39ab6d2760dae94c19b9219778bb752f8a932a5ebfa45de";

  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  // This is the location were image of NFT lives.
  const [formInput, updateFormInput] = useState({
    artist: "",
    name: "",
    description: "",
  });

  async function onChange(e) {
    const file = e.target.files[0];
    console.log("file :", file);
    setFileUrl(file);
  }

  console.log("fileUrl :", fileUrl);
  console.log("fileUrl.name ;", fileUrl?.name);

  const sendFileToIPFS = async (event) => {
    setLoading(true);
    event.preventDefault(); // Very very Important :
    //Is prevents reloading. Its absence causes error in uploading final metadata to IPFS.
    if (fileUrl) {
      try {
        const formData = new FormData();
        formData.append("file", fileUrl);

        if (!formInput.name || !formInput.artist || !formInput.description) {
          console.log("FormInput State is not updated properly");
          alert("Please enter required data. (All feilds are compulsory)");
          setLoading(false); // Spinner
          return;
        } else {
          console.log("formData :", formData);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `${PINATA_API_KEY}`,
              pinata_secret_api_key: `${PINATA_API_SECRET}`,
              "Content-Type": "image",
            },
          });

          const ImgHash = resFile.data.IpfsHash;
          console.log("Image Hash :", ImgHash);
          //Take a look at your Pinata Pinned section,
          //you will see a new file added to you list.
          sendJSONtoIPFS(ImgHash);
        }
      } catch (error) {
        console.log("Error sending File to IPFS: ", error);
      }
    }
  };

  const sendJSONtoIPFS = async (ImgHash) => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          pinataMetadata: { name: fileUrl?.name + ".json" },
          pinataContent: {
            name: formInput.name,
            description: formInput.description,
            artist: formInput.artist,
            image: `https://gateway.pinata.cloud/ipfs/${ImgHash}`,
          },
        },
        headers: {
          pinata_api_key: `${PINATA_API_KEY}`,
          pinata_secret_api_key: `${PINATA_API_SECRET}`,
          "Content-type": "application/json",
        },
      });
      setFileUrl(`https://gateway.pinata.cloud/ipfs/${ImgHash}`); //it will send the link of image
      console.log("final ", `ipfs://${resJSON.data.IpfsHash}`);
      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);
      mintNFT(tokenURI); // calling mintnft
    } catch (error) {
      console.log("JSON to IPFS: ");
      console.log(error);
    }
  };

  async function mintNFT(tokenURI) {
    // create the items and list them on the marketplace
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // we want to create the token
    let contract = new ethers.Contract(minter, minterabi, signer);
    let transaction = await contract.mintNFT(tokenURI);
    let tx = await transaction.wait();
    console.log("tx value :", tx);
    alert("NFT minted sucessfully!");
    //let event = tx.events[0]
    //let value = event.args[2]
    //let tokenId = value.toNumber()
    //const price = ethers.utils.parseUnits(formInput.price, 'ether')

    // list the item for sale on the marketplace
    //contract = new ethers.Contract(nftmarketminter, KalachainMarket.minterabi, signer)
    //let listingPrice = await contract.getListingPrice()
    //listingPrice = listingPrice.toString()

    //transaction = await contract.makeMarketItem(nftminter, tokenId, price, { value: listingPrice })
    //await transaction.wait()
    //router.push('./')
  } // end mintNFT

  /*   
         async function onChange(e) {
            const file = e.target.files[0];
            console.log("file :", e.target.files[0]);
    
            try {
                const added = await client.add(
                // Here we are uploading image to IPFS.
                file,
                {
                progress: (prog) => console.log(`received: ${prog}`),
                }
                );
                console.log("path :", added.path)
                const url = `https://ipfs.infura.io/ipfs/${added.path}`; 
                // URL were our file is located.
                console.log(url);
                setFileUrl(url); // Updating our component state.
                console.log("fileURL :", fileUrl);
            } catch (error) {
                    console.log("Error uploading file: ", error);
                }
        } //end onChange
    

        async function addData(event) {
            setLoading(true);
            event.preventDefault(); // Very very Important : 
            //Is prevents reloading. Its absence causes error in uploading final metadata to IPFS.
    
            const { artist, name, description } = formInput;
            // Destructing Information from the 'formInput'.
            console.log(artist);
            console.log(name);
            console.log(description);
    
            if (!name || !description || !artist || !fileUrl) {
                console.log("FormInput State is not updated properly");
                alert("Please enter required data. (All feilds are compulsory)");
                setLoading(false); // Spinner
                return;
            }
    
            const data = JSON.stringify({
                // Stringifying the Information .
                name: name,
                description: description,
                artist: artist,
                image: fileUrl,
                sold: false
            });
    
            console.log(data);
    
            try {
            const added = await client.add(data); // Uploading Meta-Data to IPFS
            console.log(added.path);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`; // This is the URL were our Data is present.
            console.log(url);
            mintNFT(url);
            } catch (error) {
            console.log("Error uploading file: ", error);
            }
        } //end addData


    /*  async function mintNFT(url) {
            // create the items and list them on the marketplace
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
        
            // we want to create the token
            let contract = new ethers.Contract(minter, minterabi, signer)
            let transaction = await contract.mintNFT(url)
            let tx = await transaction.wait()
            console.log("tx value :", tx)
            alert("NFT minted sucessfully!")
            //let event = tx.events[0]
            //let value = event.args[2]
            //let tokenId = value.toNumber()
            //const price = ethers.utils.parseUnits(formInput.price, 'ether')
        
            // list the item for sale on the marketplace 
            //contract = new ethers.Contract(nftmarketminter, KalachainMarket.minterabi, signer)
            //let listingPrice = await contract.getListingPrice()
            //listingPrice = listingPrice.toString()
        
            //transaction = await contract.makeMarketItem(nftminter, tokenId, price, { value: listingPrice })
            //await transaction.wait()
            //router.push('./')
        } // end mintNFT
        */

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create Item</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Create Item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  <Link to="/item-details-01">
                    <img src={fileUrl} alt="picture" />
                  </Link>
                  <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link>
                  <div className="featured-countdown">
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>
                    <Link to="/item-details-01">{formInput.name}</Link>
                  </h5>
                  <div className="tags">Jit</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="picture" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6> {formInput.artist}</h6>
                    </div>
                  </div>
                  <div className="artist">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link
                    to="/wallet-connect"
                    className="sc-button style bag fl-button pri-3"
                  >
                    <span>Place Bid</span>
                  </Link>
                  <Link to="/activity-01" className="view-history reload">
                    View History
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <form action="#">
                  <h4 className="title-create-item">Upload File!</h4>
                  <label className="uploadFile">
                    <span className="filename">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                    </span>
                    <input
                      type="file"
                      className="inputfile form-control"
                      onChange={onChange}
                      name="file"
                    />
                  </label>
                </form>
                <div className="flat-tabs tab-create-item">
                  <h4 className="title-create-item">Select method</h4>
                  <Tabs>
                    <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-clock"></span>Time Auctions
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Artist</h4>
                        <input
                          onChange={(e) =>
                            updateFormInput({
                              ...formInput,
                              artist: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter artist name"
                        />

                        <h4 className="title-create-item">Name</h4>
                        <input
                          onChange={(e) =>
                            updateFormInput({
                              ...formInput,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Item Name"
                        />

                        <h4 className="title-create-item">Description</h4>
                        <input
                          onChange={(e) =>
                            updateFormInput({
                              ...formInput,
                              description: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="e.g. “This is very limited item”"
                        />

                        <div className="row-form style-3">
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Price in Eth</h4>
                            <input type="text" placeholder="0.007" />
                          </div>
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Size</h4>
                            <input type="text" placeholder="e.g. “size”" />
                          </div>
                          <div className="inner-row-form style-2">
                            <div className="seclect-box">
                              <div id="item-create" className="dropdown">
                                <Link to="#" className="btn-selector nolink">
                                  Abstraction
                                </Link>
                                <ul>
                                  <li>
                                    <span>Art</span>
                                  </li>
                                  <li>
                                    <span>Music</span>
                                  </li>
                                  <li>
                                    <span>Domain Names</span>
                                  </li>
                                  <li>
                                    <span>Virtual World</span>
                                  </li>
                                  <li>
                                    <span>Trading Cards</span>
                                  </li>
                                  <li>
                                    <span>Sports</span>
                                  </li>
                                  <li>
                                    <span>Utility</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            //className="btn subBtn d-block ms-auto"
                            onClick={sendFileToIPFS}
                            style={{ color: "#fff" }}
                          >
                            {loading ? (
                              <span>Please wait ...</span>
                            ) : (
                              <span>Create Item</span>
                            )}
                          </button>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">artist</h4>
                        <input
                          type="text"
                          placeholder="Enter artist for one item (ETH)"
                        />

                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date2"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date2"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItem;
