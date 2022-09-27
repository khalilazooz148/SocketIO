var net = require('net');
var Web3 = require('web3');
	// creates the server
var server = net.createServer();
var web3 = new Web3("wss://smart-purple-wave.matic-testnet.discover.quiknode.pro/418f09a556c7f939fe811a0cf339e3cfa93090c8/");

const FromAddress = '0xe1caa4bd7390553e73d5da4b75964564cd757505';
const privateKey = '0xf9ed0b7b1cbd3b760ec4b5addea184df6773aee07d9a694d117b056251f4cb2b';
const contractAddress = '0x855fc1Ed2149c245B15A6EcD28409f013D99f57E';
web3.eth.accounts.privateKeyToAccount(privateKey);
var cardId = '';
var amount='';
var myContractInstance = null;
async function load()
{
	myContractInstance = await new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "testnet",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cardAddress",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			}
		],
		"name": "addCardByAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			}
		],
		"name": "addCardByUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cardAddress",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "amount_cents",
				"type": "uint32"
			}
		],
		"name": "addFundsByAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "amount_cents",
				"type": "uint32"
			}
		],
		"name": "addFundsByUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"name": "card",
		"outputs": [
			{
				"internalType": "enum payments_usdc_pan.cardStatusCases",
				"name": "cardStatus",
				"type": "uint8"
			},
			{
				"internalType": "uint16",
				"name": "counter",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "cardAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			}
		],
		"name": "checkBalanceByCardPAN",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "cardOwnerBalance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			},
			{
				"internalType": "uint16",
				"name": "TxCounter",
				"type": "uint16"
			},
			{
				"internalType": "uint32",
				"name": "amount_cents",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "TxDigest",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "pay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payee",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			}
		],
		"name": "resetCard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "cardPAN",
				"type": "uint64"
			}
		],
		"name": "revokeCard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newPayee",
				"type": "address"
			}
		],
		"name": "updatePayee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
], '0x855fc1Ed2149c245B15A6EcD28409f013D99f57E');
}


load();
//emitted when server closes ...not emitted until all connections closes.
server.on('close',function(){
  console.log('Server closed !');
});


// emitted when new client connects
server.on('connection',function(socket){

//this property shows the number of characters currently buffered to be written. (Number of characters is approximately equal to the number of bytes to be written, but the buffer may contain strings, and the strings are lazily encoded, so the exact number of bytes is not known.)
//Users who experience large or growing bufferSize should attempt to "throttle" the data flows in their program with pause() and resume().

  console.log('Buffer size : ' + socket.bufferSize);

  console.log('---------server details -----------------');

  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);

  var lport = socket.localPort;
  var laddr = socket.localAddress;
  console.log('Server is listening at LOCAL port' + lport);
  console.log('Server LOCAL ip :' + laddr);

  console.log('------------remote client info --------------');

  var rport = socket.remotePort;
  var raddr = socket.remoteAddress;
  var rfamily = socket.remoteFamily;

  console.log('REMOTE Socket is listening at port' + rport);
  console.log('REMOTE Socket ip :' + raddr);
  console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

  console.log('--------------------------------------------')
//var no_of_connections =  server.getConnections(); // sychronous version
server.getConnections(function(error,count){
  console.log('Number of concurrent connections to the server : ' + count);
});

socket.setEncoding('utf8');

socket.setTimeout(800000,function(){
  // called after timeout -> same as socket.on('timeout')
  // it just tells that soket timed out => its ur job to end or destroy the socket.
  // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
  // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
  console.log('Socket timed out');
});


async function onRecieveConfirmation(json)
{
	var data= '{"time":"'+Math.floor(Date.now() / 1000).toString()+'","dir":"out","cardId":"'+cardId+'","value":"'+amount+'","status":"APPROVED","hash" :"'+json['transactionHash']+'"}';
	console.log(data);
	await $.post("https://smartcontractdb-default-rtdb.firebaseio.com/"+cardId+".json",data,function(data,status){});
	console.log(json);
}

async function do_the_send(encoded){
	var block =  await web3.eth.getBlock("latest");
	var gasLimit = Math.round(block.gasLimit / block.transactions.length);
	var tx = {
		gas :   gasLimit,
		to  :   contractAddress,
		data:   encoded
	}
	await web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
		web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', onRecieveConfirmation)
	})
}

socket.on('data',function(data){
  var bread = socket.bytesRead;
  var bwrite = socket.bytesWritten;
  console.log('Bytes read : ' + bread);
  console.log('Bytes written : ' + bwrite);
  console.log('Data sent to server : ' + data);

  cardId = bread.slice(0,8);
  var counter = bread.slice(8,10);
  amount = bread.slice(10,14);
  var hash = bread.slice(14,46);
  var sigR= bread.slice(46,78);
  var sigS = bread.slice(78,110);

  console.log('pan ='+ cardId);
  console.log('counter ='+ counter);
  console.log('amount ='+ amount);
  console.log('hash ='+ hash);
  console.log('sigR ='+ sigR);
  console.log('sigS ='+ sigS);


	
  do_the_send(myContractInstance.methods.pay(cardId, counter ,amount,hash,sigR ,sigS).encodeABI());


  //echo data
  var is_kernel_buffer_full = socket.write('Data ::' + data);
  if(is_kernel_buffer_full){
    console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
  }else{
    socket.pause();
  }

});

socket.on('drain',function(){
  console.log('write buffer is empty now .. u can resume the writable stream');
  socket.resume();
});

socket.on('error',function(error){
  console.log('Error : ' + error);
});

socket.on('timeout',function(){
  console.log('Socket timed out !');
  socket.end('Timed out!');
  // can call socket.destroy() here too.
});

socket.on('end',function(data){
  console.log('Socket ended from other end!');
  console.log('End data : ' + data);
});

socket.on('close',function(error){
  var bread = socket.bytesRead;
  var bwrite = socket.bytesWritten;
  console.log('Bytes read : ' + bread);
  console.log('Bytes written : ' + bwrite);
  console.log('Socket closed!');
  if(error){
    console.log('Socket was closed coz of transmission error');
  }
}); 

setTimeout(function(){
  var isdestroyed = socket.destroyed;
  console.log('Socket destroyed:' + isdestroyed);
  socket.destroy();
},1200000);

});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error){
  console.log('Error: ' + error);
});

//emits when server is bound with server.listen
server.on('listening',function(){
  console.log('Server is listening!');
});

server.maxConnections = 10;

//static port allocation
server.listen(2222);


// // for dyanmic port allocation
// server.listen(function(){
//   var address = server.address();
//   var port = address.port;
//   var family = address.family;
//   var ipaddr = address.address;
//   console.log('Server is listening at port' + port);
//   console.log('Server ip :' + ipaddr);
//   console.log('Server is IP4/IP6 : ' + family);
// });



// var islistening = server.listening;

// if(islistening){
//   console.log('Server is listening');
// }else{
//   console.log('Server is not listening');
// }

// setTimeout(function(){
//   server.close();
// },5000000);


