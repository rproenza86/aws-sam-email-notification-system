const axios = require('axios');

export const getNotificationAuth = async () => {
    return axios
        .get(process.env.API_URL)
        .then(function(response) {
            // handle success
            console.log('handle success');
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            // handle error
            console.log('handle error');
            console.log(error);
            return error;
        });
};
