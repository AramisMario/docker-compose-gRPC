const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./proto/bookStore.proto',{});
const bookStorePackage = grpc.loadPackageDefinition(packageDefinition).bookStorePackage;

const books = [];

function createBook(call, callback) {

    console.log("ACEPTED REQUEST  createBook");

    const book = call.request.book;

    const bookObject = {
        'id': books.length + 1,
        'book': book
    }
    books.push(bookObject);
    callback(null,bookObject);
}

function readBook(call, callback) {
    console.log("ACEPTED REQUEST readBook");
    const id = call.request.id;
    const book = books.find((book) => book.id === id);
    callback(null,book);
}

function readBooks(call,callback) {
    console.log("ACEPTED REQUEST readBook 2");
    callback(null,{books:books});
}

function sendToclient(call){
    console.log("ACEPTED REQUEST sendToclient");
    const bookObject = {
        'id': books.length + 1,
        'book': "my book"
    }
    call.write(bookObject);
}


const server = new grpc.Server();

server.addService(bookStorePackage.Book.service, {
    createBook: createBook,
    readBook: readBook,
    readBooks: readBooks,
    sendToclient: sendToclient
});

server.bindAsync('172.20.0.4:50052',grpc.ServerCredentials.createInsecure(),() => {
    console.log("Server running at http://172.20.0.4:50052");
    server.start();
});
