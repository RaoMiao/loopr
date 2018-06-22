import {getTransactionCount} from "Loopring/ethereum/utils";
import {toNumber} from "Loopring/common/formatter";
import validator from 'Loopring/ethereum/validator';

const setWallet = (wallet) => {
  const wallets = localStorage.wallet ? JSON.parse(localStorage.wallet) : [];
  const otherWallets = wallets.filter(w => w.address.toLowerCase() !== wallet.address.toLowerCase());
  otherWallets.push({address:wallet.address,nonce:toNumber(wallet.nonce) + 1});
  localStorage.wallet = JSON.stringify(otherWallets)
};

const getWallet = (address) => {
  const wallets = localStorage.wallet ? JSON.parse(localStorage.wallet) : [];
  return wallets.find((wallet) => wallet.address.toLowerCase() === address.toLowerCase())
};

const getNonce = async (address) => {
  console.log("getnonce heheheheheh")
  try {
    console.log("getnonce heheheheheh1")
    validator.validate({value: address, type: "ADDRESS"});
    const nonce = toNumber((await getTransactionCount(address, 'pending')).result) || 0;
    console.log("getnonce heheheheheh2") 
    //const localNonce = getWallet(address) && getWallet(address).nonce ? getWallet(address).nonce : 0;
    console.log("getnonce heheheheheh3")    
    return nonce
  } catch (e) {
    throw  new Error(e.message)
  }
};

const storeUnlockedAddress = (unlockType, address) => {
  localStorage.unlockedType = unlockType
  localStorage.unlockedAddress = address
}

const getUnlockedAddress = () => {
  return localStorage.unlockedAddress || ''
}

const getUnlockedType = () => {
  return localStorage.unlockedType || ''
}

const clearUnlockedAddress = () => {
  localStorage.unlockedType = ''
  localStorage.unlockedAddress = ''
}

const isInWhiteList = (address) => {

}

export default {
  setWallet,
  getWallet,
  isInWhiteList,
  getNonce,
  storeUnlockedAddress,
  getUnlockedAddress,
  getUnlockedType,
  clearUnlockedAddress
}

