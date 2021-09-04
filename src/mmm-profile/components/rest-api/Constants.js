// Constants.js
const prod = {
  url: {
    API_URL: 'https://monomakersmeet.local'
  },
  contactFormId: '141',
};
const dev = {
  url: {
    API_URL: 'http://monomakersmeet.local:3000'
  },
  contactFormId: '233',

};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
