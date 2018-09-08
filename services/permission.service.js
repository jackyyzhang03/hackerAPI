"use strict";
const DefaultPermission = require("../models/defaultPermission.model");
const logger = require("./logger.service");

/**
 * Update the permissions for a given userType.
 * @param {string} defaultUserName name of the default user type
 * @param {ObjectId[]} newPermissions array of permission object ids.
 * @return {DocumentQuery} DocumentQuery will resolve to updated permissions or null.
 */
function changeUserTypePermissions(defaultUserName, newPermissions) {
    const TAG = `[Permission Service # changeUserTypePermissions]:`;
    const query = {
        userType: defaultUserName
    };
    return DefaultPermission.findOneAndUpdate(query, {permissions: newPermissions}, logger.updateCallbackFactory(TAG, "DefaulPermission"));
}


/**
 * @async
 * @function getDefaultPermission
 * @param {JSON} defaultUserType The type of user for which to get default permissions for.
 * @return {Array} Array of ids of specific permissions
 * @description 
 * Gets the default permission of a type of user.
 * Currently under WIP while new permission system is being created.
 */
async function getDefaultPermission(defaultUserName) {
    const TAG = `[Permission Service # getDefaultPermission]:`;
    const query = {
        userType: defaultUserName
    };
    return await DefaultPermission.findOne(query, function (error, defaultPermission) {
        if (error) {
            logger.error(`${TAG} Failed to verify if default permission exists or not using ${JSON.stringify(query)}`, error);
        } else if (defaultPermission) {
            logger.debug(`${TAG} default permission using ${JSON.stringify(query)} exist in database`);
        } else {
            logger.debug(`${TAG} default permission using ${JSON.stringify(query)} do not exist in the database`);
        }
    }).select("permissions");
}

/**
 * Return the permissionName from the permissionId.
 * @param {*} permissionId the permission id
 * @returns {Promise<string>} returns the name of the permission
 */
async function getPermissionName(permissionId) {
    const TAG = `[Permission Service # getPermissionName]:`;
    return await Permission.findById(permissionId, function (error, result) {
        if(error) {
            logger.error(`${TAG} Failed to verify if default permission exists or not using ${JSON.stringify(permissionId)}`, error);
        } else if (!result) {
            logger.debug(`${TAG} permission ${JSON.stringify(permissionId)} does not exist in the database`);
        }
    }).select("name");
}
/**
 * Return the permissionId from the permissionName.
 * @param {string} permissionName the permission name
 * @returns {Promise<string>} resolves to the permissionId
 */
async function getPermissionId(permissionName) {
    const TAG = `[Permission Service # getPermissionId]:`;
    return await Permission.findOne({name:permissionName}, function (error, result) {
        if(error) {
            logger.error(`${TAG} Failed to verify if default permission exists or not using ${permissionName}`, error);
        } else if (!result) {
            logger.debug(`${TAG} permission ${permissionName} does not exist in the database`);
        }
    }).select("_id");
}

module.exports = {
    getDefaultPermission: getDefaultPermission,
    getPermissionName: getPermissionName,
    changeUserTypePermissions: changeUserTypePermissions,
    getPermissionId: getPermissionId
};