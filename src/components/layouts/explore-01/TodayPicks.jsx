import React, { useEffect, useState, Fragment } from "react";
//import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
//import CardModal from '../CardModal';
import axios from "axios";
import Buycard from "../Buycard";
//import { getMarketplaceNFT } from '../../../pages/BuyNFT';
//import { FetchNFTcontract } from '../../../pages/FetchNFTdata';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import marketabi from "../../../pages/marketabi";

//const TodayPicks = props => {
const TodayPicks = () => {
  //const data = props.data;
  //const data = FetchNFTcontract("0xE47E5dCDE8E14E874D2711e786bB34aE6980BeF8", "eth");
  const [data, setdata] = useState([]);
  const [list, setlist] = useState([]);
  //let address = "0x078b342d7e19bb22e435a20bd533860ef91ce237";
  //let marketplace = "0xEe0DE77c57b2f8A1F85059AD823416cB1e77644B";
  const address = "0x078b342d7e19bb22e435a20bd533860ef91ce237";
  const marketplace = "0xfB56CeFfa30fe04812BDdc4f883d83a50f468Adf";
  //const address = "0xe85d3e842864c99e63183380223ffb273b03c3ba";
  //const address = "0xEe0DE77c57b2f8A1F85059AD823416cB1e77644B";
  //const chainID = 'eth';
  const chainID = "mumbai";
  //const chainID = 'polygon';

  async function getMarketplaceNFT() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    //const signer = provider.getSigner()
    console.log("ist :");

    const marketContract = new ethers.Contract(
      marketplace,
      marketabi,
      provider
    );
    console.log("2nd");

    provider.getCode(marketplace);
    console.log("3rd:");

    const nftdata = await marketContract.getListedNfts();
    console.log("nftdata of marketplace :", nftdata);
    setlist(nftdata);
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/nft/${address}/owners`,
      params: { chain: chainID, format: "decimal" },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "UF2OaKrDpLjGojhgpojbDUYgh9xZELZF21GyvFJX5laU2jlHMQwlxhF5qBjykaI3",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log("response :",response.data.result);
        setdata(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });

    getMarketplaceNFT();
  }, []);

  console.log("data at explorer:", data);
  console.log("listed data :", list);

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);
  const [token_id, setTokenId] = useState("");

  const handleOnClick = (token_id) => {
    console.log("token_id --- ", token_id);
    setTokenId(token_id);
    setModalShow(true);
  };

  // const someFunction = () => {
  // data.slice(0,visible).map((item,index) => (
  //     list.map((value) => (
  //         console.log("item tokenid :", (value.ç).toString())
  //         console.log("value tokenid :", value.tokenId)
  //     ))
  // ))
  // }

  /*   for (let i=0;i < data.length;i++){
        console.log('data_tokenid : ',data[i].token_id)
        console.log('type : ',typeof Number(data[i].token_id))
        for (let i=0;i < list.length;i++){
            console.log("list tokenid : ", parseInt(list[i].tokenId._hex,16))
            console.log('type : ',typeof parseInt(list[i].tokenId._hex,16))
            if(Number(data[i].token_id) == parseInt(list[i].tokenId._hex,16)) {
                console.log("yes its match & listed")
            }
            // console.log('list : ',list[i].tokenId._hex.toNumber())
            // console.log('type : ',typeof list[i].tokenId._hex.toNumber())
            //console.log("list tokenid : ", parseInt(list[i].tokenId._hex,16))
            //console.log('type : ',typeof parseInt(list[i].tokenId._hex,16))
        }
    }
*/

  return (
    <Fragment>
      <section className="tf-section sc-explore-1">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrap-box explore-1 flex mg-bt-40">
                <div className="seclect-box style-1">
                  <div id="item_category" className="dropdown">
                    <Link to="#" className="btn-selector nolink">
                      All categories
                    </Link>
                    <ul>
                      <li>
                        <span>Art</span>
                      </li>
                      <li className="active">
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
                  <div id="buy" className="dropdown">
                    <Link to="#" className="btn-selector nolink">
                      Buy Now
                    </Link>
                    <ul>
                      <li>
                        <span>On Auction</span>
                      </li>
                      <li>
                        <span>Has Offers</span>
                      </li>
                    </ul>
                  </div>
                  <div id="all-items" className="dropdown">
                    <Link to="#" className="btn-selector nolink">
                      All Items
                    </Link>
                    <ul>
                      <li>
                        <span>Single Items</span>
                      </li>
                      <li>
                        <span>Bundles</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="seclect-box style-2 box-right">
                  <div id="artworks" className="dropdown">
                    <Link to="#" className="btn-selector nolink">
                      All Artworks
                    </Link>
                    <ul>
                      <li>
                        <span>Abstraction</span>
                      </li>
                      <li>
                        <span>Skecthify</span>
                      </li>
                      <li>
                        <span>Patternlicious</span>
                      </li>
                      <li>
                        <span>Virtuland</span>
                      </li>
                      <li>
                        <span>Papercut</span>
                      </li>
                    </ul>
                  </div>
                  <div id="sort-by" className="dropdown">
                    <Link to="#" className="btn-selector nolink">
                      Sort by
                    </Link>
                    <ul>
                      <li>
                        <span>Top rate</span>
                      </li>
                      <li>
                        <span>Mid rate</span>
                      </li>
                      <li>
                        <span>Low rate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*data.slice(0,visible).map((item,index) => (*/}
            {data.slice(0, visible).map((item, index) =>
              list.map((value) => (
                <>
                  {
                    //console.log("item tokenid======= :", item.token_id)
                    //<div>{console.log("value tokenid :", value.tokenId)}</div>
                    //parseInt(list[i].tokenId._hex,16)
                    item.token_id == parseInt(value.tokenId._hex, 16) &&
                    value.listed ? (
                      <div
                        key={index}
                        className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      >
                        <div
                          className={`sc-card-product ${
                            item.feature ? "comingsoon" : ""
                          } `}
                        >
                          <div className="card-media">
                            {/*console.log("value listed :", value.listed)}
                                                {/*<Link to="/item-details-01"><img src="https://picsum.photos/200" alt="picture" /></Link>*/}
                            <Link to="/item-details-01">
                              <img
                                src={JSON.parse(item.metadata).image}
                                alt="picture"
                              />
                            </Link>
                            <Link to="/login" className="wishlist-button heart">
                              <span className="number-like">
                                add{item.wishlist}
                              </span>
                            </Link>
                            <div className="coming-soon">{item.feature}</div>
                          </div>
                          <div className="card-title">
                            <h5 className="style2">
                              <Link to="/item-details-01">
                                "{JSON.parse(item.metadata).name}"
                              </Link>
                            </h5>
                            <div className="tags">{item.token_id}</div>
                          </div>
                          <div className="meta-info">
                            <div className="author">
                              <div className="avatar">
                                <img src={item.imgAuthor} alt="picture" />
                              </div>
                              <div className="info">
                                <span>Owned By</span>
                                <h6>
                                  {" "}
                                  <Link to="/authors-02">{item.name}</Link>{" "}
                                </h6>
                              </div>
                            </div>
                            <div className="price">
                              <span>Price</span>
                              <h5> {item.amount}</h5>
                            </div>
                          </div>
                          <div className="card-bottom">
                            <button
                              onClick={() => handleOnClick(item.token_id)}
                              className="sc-button style bag fl-button pri-3 no-bg"
                            >
                              <span>Click to ßuy</span>
                            </button>
                            <Link
                              to="/activity-01"
                              className="view-history reload"
                            >
                              View History
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  }
                </>
              ))
            )}

            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Buycard
        show={modalShow}
        token_id={token_id}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  );
};

//TodayPicks.propTypes = {
//    data: PropTypes.array.isRequired,
//}

export default TodayPicks;
