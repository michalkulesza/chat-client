const DEV = "http://localhost:5001";

const PROD = "https://chatter-xcxz.herokuapp.com";

const PATH = process.env.PRODUCTION ? PROD : DEV;

export default PATH;
