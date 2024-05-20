import * as dotenv from 'dotenv';

export default () => {
    dotenv.config();
    console.log("Global setup executed");
}