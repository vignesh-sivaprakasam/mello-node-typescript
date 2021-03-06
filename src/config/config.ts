import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'vignesh';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'vignesh';
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0-shard-00-00-64yih.mongodb.net:27017,cluster0-shard-00-01-64yih.mongodb.net:27017,cluster0-shard-00-02-64yih.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';
const SERVER_PORT = process.env.PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export = config;