const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto',{});
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;

const client = new bookStorePackage.Book('172.20.0.4:50052',grpc.ChannelCredentials.createInsecure());

client.createBook({'book':'Cracking the Interview','id':1}, (err,response) => {
    if(err){
        console.log(err);
    }else{
        console.log('Create Book From server: ', JSON.stringify(response));
    }
});

client.readBook({'id':1},(err,response) => {
    if(err){
        console.log(err);
    }else{
        console.log('readBook From server: ',JSON.stringify(response));
    }
});

client.readBooks(null, (err,response) => {
    if(err){
        console.log(err);
    }else{
        console.log('From server: ',JSON.stringify(response));
    }
});

const data = client.sendToclient();
data.on('data', (response) => {
    console.log('Received message: ',response);
});
