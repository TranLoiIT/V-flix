import { REGEX } from "constant";

const ValidURL = (str) => {
    const regex = REGEX.URL;
    if(!regex.test(str)) {
        return false;
    }
    return true;
};
  
export default ValidURL;