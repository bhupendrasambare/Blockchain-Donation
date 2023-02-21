const hre = require("hardhat");

async function getBalance(address){
    const balance = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

async function consoleBalance(addresses){
    let counter = 1;
    for(const address of addresses){
        console.log(`Address ${counter} balance : `, await getBalance(address));
        counter++;
    }
}

async function consoleMemos(memos){
    for(const memo of memos){
        const timeStamp = memo.timestamp;
        const name = memo.name;
        const from = memo.from;
        const message = memo.message;
        console.log(`At ${timeStamp} ${name} ${from} : ${message}`);
    }
}

async function main() {
    const [owner,from1,from2,from3,from4,from5,from6] = await hre.ethers.getSigners();
    const donation = await  hre.ethers.getContractFactory("Donation");
    const contract = await donation.deploy();

    await contract.deployed();
    console.log("Address of contract "+contract.address);

    const addresses = [owner.address,from1.address,from2.address,from3.address,from4.address,from5.address,from6.address];

    console.log("Before donation ")
    await consoleBalance(addresses);

    const ammount = {value:hre.ethers.utils.parseEther("1")};
    await contract.connect(from1).buyChai("from1","Donation from first", ammount);
    await contract.connect(from2).buyChai("from1","Donation from second", ammount);
    await contract.connect(from3).buyChai("from1","Donation from third", ammount);
    await contract.connect(from4).buyChai("from1","Donation from forth", ammount);
    await contract.connect(from5).buyChai("from1","Donation from fifth", ammount);
    await contract.connect(from6).buyChai("from1","Donation from sixth", ammount);

    console.log("After donation ")
    await consoleBalance(addresses);
    
    await consoleMemos(await contract.getMemos());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
