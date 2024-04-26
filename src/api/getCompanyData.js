import axios from 'axios';

const getCompanyData = async () => {
  try {
    const { data } = await axios.get("/company-data.json");
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default getCompanyData;