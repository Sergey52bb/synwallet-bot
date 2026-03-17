const TonWeb = require('tonweb');

const tonweb = new TonWeb(new TonWeb.HttpProvider(
  'https://toncenter.com/api/v2/jsonRPC'
));

let users = {};

async function createWallet(userId) {
  const keyPair = TonWeb.utils.nacl.sign.keyPair();

  const wallet = tonweb.wallet.create({
    publicKey: keyPair.publicKey,
    wc: 0
  });

  const address = await wallet.getAddress();

  users[userId] = {
    address: address.toString(true, true, true),
    secretKey: TonWeb.utils.bytesToHex(keyPair.secretKey)
  };

  return users[userId].address;
}

async function getBalance(userId) {
  if (!users[userId]) return "0";

  const balance = await tonweb.getBalance(users[userId].address);
  return TonWeb.utils.fromNano(balance);
}

module.exports = { createWallet, getBalance };