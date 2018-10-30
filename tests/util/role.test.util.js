"use strict";
const Role = require("../../models/role.model");
const Constants = require("../../constants");
const mongoose = require("mongoose");
const TAG = "[ ROLE.TEST.UTIL.JS ]";
const logger = require("../../services/logger.service");

const authRoutes = {
    "login": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/auth/login"
    },
    "logout": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/auth/logout"
    }
};

const accountRoutes = {
    "getSelf": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/account/self"
    },
    "getSelfById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/account/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "getAnyById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/account/" + Constants.ROLE_CATEGORIES.ALL,
    },
    "post": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/account/"
    },
    "patchSelfById": {
        requestType: Constants.REQUEST_TYPES.PATCH,
        uri: "/api/account/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "patchAnyById": {
        requestType: Constants.REQUEST_TYPES.PATCH,
        uri: "/api/account/" + Constants.ROLE_CATEGORIES.ALL,
    }
};

const hackerRoutes = {
    "getSelfById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "getAnyById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.ALL,
    },
    "getSelfResumeById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.SELF + "/resume",
    },
    "getAnyResumeById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.ALL + "/resume",
    },
    "post": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/hacker/",
    },
    "postSelfResumeById": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.SELF + "/resume",
    },
    "postAnyResumeById": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.ALL + "/resume",
    },
    "patchSelfById": {
        requestType: Constants.REQUEST_TYPES.PATCH,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "patchAnyById": {
        requestType: Constants.REQUEST_TYPES.PATCH,
        uri: "/api/hacker/" + Constants.ROLE_CATEGORIES.ALL,
    },
};

const sponsorRoutes = {
    "getSelfById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/sponsor/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "getAnyById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/sponsor/" + Constants.ROLE_CATEGORIES.ALL,
    },
    "post": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/sponsor/",
    },
};

const teamRoutes = {
    "getSelfById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/team/" + Constants.ROLE_CATEGORIES.SELF,
    },
    "getAnyById": {
        requestType: Constants.REQUEST_TYPES.GET,
        uri: "/api/team/" + Constants.ROLE_CATEGORIES.ALL,
    },
    "post": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/team/",
    },
};

const volunteerRoutes = {
    "post": {
        requestType: Constants.REQUEST_TYPES.POST,
        uri: "/api/volunteer/",
    },
};

const allRoutes = {
    "Auth": authRoutes,
    "Account": accountRoutes,
    "Hacker": hackerRoutes,
    "Sponsor": sponsorRoutes,
    "Team": teamRoutes,
    "Volunteer": volunteerRoutes,
};

const adminRole = {
    "_id": mongoose.Types.ObjectId(),
    "name": "admin",
    "routes": getAllRoutes(),
};

const hackerRole = {
    "_id": mongoose.Types.ObjectId(),
    "name": "hacker",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        accountRoutes.getSelf,
        accountRoutes.getSelfById,
        accountRoutes.patchSelfById,

        hackerRoutes.getSelfById,
        hackerRoutes.getSelfResumeById,
        hackerRoutes.patchSelfById,
    ]
};

const volunteerRole = {
    "_id": mongoose.Types.ObjectId(),
    "name": "volunteer",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        volunteerRoutes.post,
    ]
};

const sponsorT1Role = {
    "_id": mongoose.Types.ObjectId(),
    "name": "sponsorT1",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        sponsorRoutes.post,
        sponsorRoutes.getSelfById,
    ]
};

const sponsorT2Role = {
    "_id": mongoose.Types.ObjectId(),
    "name": "sponsorT2",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        sponsorRoutes.post,
        sponsorRoutes.getSelfById,
    ]
};

const sponsorT3Role = {
    "_id": mongoose.Types.ObjectId(),
    "name": "sponsorT3",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        sponsorRoutes.post,
        sponsorRoutes.getSelfById,
    ]
};

const sponsorT4Role = {
    "_id": mongoose.Types.ObjectId(),
    "name": "sponsorT4",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        sponsorRoutes.post,
        sponsorRoutes.getSelfById,
    ]
};

const sponsorT5Role = {
    "_id": mongoose.Types.ObjectId(),
    "name": "sponsorT5",
    "routes": [
        authRoutes.login,
        authRoutes.logout,

        sponsorRoutes.post,
        sponsorRoutes.getSelfById,
    ]
};

const singularRoles = createAllSingularRoles();

let allRolesObject = {
    adminRole: adminRole,
    hackerRole: hackerRole,
    volunteerRole: volunteerRole,
    sponsorT1Role: sponsorT1Role,
    sponsorT2Role: sponsorT2Role,
    sponsorT3Role: sponsorT3Role,
    sponsorT4Role: sponsorT4Role,
    sponsorT5Role: sponsorT5Role,
};

for (let role in singularRoles) {
    allRolesObject[role] = singularRoles[role];
}

const allRolesArray = Object.values(allRolesObject);

function getAllRoutes() {
    let routes = [];
    for (let routeGroupKey in allRoutes) {
        if (!allRoutes.hasOwnProperty(routeGroupKey)) {
            continue;
        }

        const routeGroup = allRoutes[routeGroupKey];
        for (let routeKey in routeGroup) {
            if (!routeGroup.hasOwnProperty(routeKey)) {
                continue;
            }

            const route = routeGroup[routeKey];
            // the for loop over entires includes the entry name, which we do not need
            routes.push(route);
        }
    }

    return routes;
}

// creates the roles that are just one uri + request type
function createAllSingularRoles() {
    let roles = [];
    for (let routeGroupKey in allRoutes) {
        if (!allRoutes.hasOwnProperty(routeGroupKey)) {
            continue;
        }

        const routeGroup = allRoutes[routeGroupKey];
        for (let routeKey in routeGroup) {
            if (!routeGroup.hasOwnProperty(routeKey)) {
                continue;
            }

            let role = {
                _id: mongoose.Types.ObjectId(),
                name: routeKey + routeGroupKey,
                routes: routeGroup[routeKey],
            };
            let roleName = role.name;
            roles[roleName] = role;
        }
    }

    return roles;
}

function storeAll(attributes, callback) {
    const roleDocs = [];
    const roleNames = [];
    attributes.forEach((attribute) => {
        roleDocs.push(new Role(attribute));
        roleNames.push(attribute.name);
    });

    Role.collection.insertMany(roleDocs).then(
        () => {
            logger.info(`${TAG} saved Roles: ${roleNames.join(",")}`);
            callback();
        },
        (reason) => {
            logger.error(`${TAG} could not store Roles ${roleNames.join(",")}. Error: ${JSON.stringify(reason)}`);
            callback(reason);
        }
    );
}

function dropAll(callback) {
    Role.collection.drop().then(
        () => {
            logger.info(`Dropped table Role`);
            callback();
        },
        (err) => {
            logger.error(`Could not drop Role. Error: ${JSON.stringify(err)}`);
            callback(err);
        }
    ).catch((error) => {
        logger.error(error);
        callback();
    });
}

module.exports = {
    adminRole: adminRole,
    hackerRole: hackerRole,
    volunteerRole: volunteerRole,
    sponsorT1Role: sponsorT1Role,
    sponsorT2Role: sponsorT2Role,
    sponsorT3Role: sponsorT3Role,
    sponsorT4Role: sponsorT4Role,
    sponsorT5Role: sponsorT5Role,
    singularRoles: singularRoles,

    allRolesObject: allRolesObject,
    allRolesArray: allRolesArray,

    createAllSingularRoles: createAllSingularRoles,
    storeAll: storeAll,
    dropAll: dropAll,
};