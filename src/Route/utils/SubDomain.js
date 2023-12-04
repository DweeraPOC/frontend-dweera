import AdminRoute from "./AdminRoute";
import SoonRoute from "./SoonRoute";
import UserRoute from "./UserRoute";

/**
 * add subdomains object
 */
const APPLICATION = [
    {
        subdomain : "www",
        app : UserRoute,
        main : true,
        enable : true
    },
    {
        subdomain : "admin",
        app : AdminRoute,
        main : false,
        enable : true
    },
    {
        subdomain : "soon",
        app : SoonRoute,
        main : false,
        enable : true
    },
];

const getSubDomain = (location) => {
    const locationParts = location.split(".");
    var sliceTo = -2;
    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    // for localhost
    if(isLocalHost) sliceTo = -1;
    return locationParts.slice(0,sliceTo).join("");
}

const getApp = () => {
    const subdomain = getSubDomain(window.location.hostname);
    const main = APPLICATION.find((app) => app.main);
    if(subdomain==="") return main.app;
    const app = APPLICATION.filter((app) => app.enable).find((app) => app.subdomain===subdomain);
    if(!app) return main.app;
    return app.app;
}

export default getApp;