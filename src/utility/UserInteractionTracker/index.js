import React from 'react';
import axios from 'axios';

/* Utility */
import RESTHelper from '../RESTHelper/';

const UserInfo = {
	_id: null
};

Object.defineProperty(UserInfo, "id", {

	get: function() {
		return this._id;
	},
	set: function(value) {
		this._id = value;
	},
	enumerable: true,
	configurable: true
});

function storeUserInteraction(type, data) {

  let rest = new RESTHelper(process.env.NODE_ENV);
  let url = `${rest.getBaseUrl()}/v1/observe/interaction`;

  axios.post(url, {type: type, user: UserInfo.id, data: data})
    .then(result => {

      return result;
    })
    .catch(error => console.log(error));
}

export { UserInfo };
export default storeUserInteraction;
