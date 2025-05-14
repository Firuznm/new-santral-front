import axios from 'axios';

class santralSite {
	constructor() {
		this.baseUrl = 'https://api.santral.az';
		this.baseUrlImage = 'https://cdn.santral.az/images/';
		this.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};

		this.apiClient = axios.create({
			baseURL: this.baseUrl,
			headers: this.headers,
		});

		this.apiClient.interceptors.response.use(
			(response) => response, 
			(error) => {
				if (error.response?.status === 401 || error.response?.data?.error === 'Invalid Token') {
					localStorage.removeItem('token'); 
					window.location.href = '/login'; 
				}
				return Promise.reject(error);
			},
		);
	}

	api() {
		const token = localStorage.getItem('token');
		if (token) {
			this.apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
		} else {
			delete this.apiClient.defaults.headers['Authorization'];
		}
		return this.apiClient;
	}
}

const santral = new santralSite();
export default santral;




// import axios from 'axios';

// class santralSite {
// 	constructor() {
// 		this.baseUrl = 'https://api.santral.az';
// 		this.baseUrlImage = 'https://cdn.santral.az/images/';
// 		this.headers = {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		};

// 		this.apiClient = axios.create({
// 			baseURL: this.baseUrl,
// 			headers: this.headers,
// 		});

// 		this.apiClient.interceptors.request.use((config) => {
// 			const token = localStorage.getItem('token');
// 			if (token) {
// 				config.headers['Authorization'] = `Bearer ${token}`;
// 			} else {
// 				delete config.headers['Authorization'];
// 			}
// 			return config;
// 		});

// 		this.apiClient.interceptors.response.use(
// 			(response) => response,
// 			(error) => {
// 				if (
// 					error.response?.status === 401 ||
// 					error.response?.data?.error === 'Invalid Token'
// 				) {
// 					localStorage.removeItem('token');
// 					window.location.href = '/login';
// 				}
// 				return Promise.reject(error);
// 			},
// 		);
// 	}

// 	api() {
// 		return this.apiClient;
// 	}
// }

// const santral = new santralSite();
// export default santral;
