import axios from "axios";


class santralSite {
    constructor() {
		// (this.lng = localStorage.getItem("lang") || "az"),
		this.baseUrl = "https://api.santral.az";
        this.baseUrlImage = "https://cdn.santral.az/images/";
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    } 
    api() {
        const token = localStorage.getItem("token");
        return axios.create({
            baseURL: this.baseUrl,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
    }   
}

const santral = new santralSite();
export default santral;
