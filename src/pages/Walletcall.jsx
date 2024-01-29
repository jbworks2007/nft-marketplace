
async function Walletcall(title) {
    console.log("tes function called");
    let walletStatus = false;
    console.log("title :",title);
    if(title==="Metamask"){
        if (typeof window.ethereum !== "undefined") {
        try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
        console.log(error);
        }
            walletStatus = true;
        //document.getElementById("connect").text("Connected");
        //balance();
        } 
    }
    return walletStatus;
}

export default Walletcall;