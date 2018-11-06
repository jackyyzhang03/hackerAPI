"use strict";
const Sponsor = require("../models/sponsor.model");
const logger = require("./logger.service");

/**
 * @function findById
 * @param {ObjectId} id
 * @return {DocumentQuery} The document query will resolve to a sponsor or null.
 * @description Find a sponsor by id
 */
function findById(id) {
    const TAG = `[Sponsor Service # findById]:`;
    const query = {
        _id: id
    };

    return Sponsor.findById(query, logger.queryCallbackFactory(TAG, "sponsor", JSON.stringify(query)));
}

/**
 * @function createSponsor
 * @param {{_id: ObjectId, accountId: ObjectId, tier: number, company: string, contractURL: string, nominees: ObjectId[]}} sponsorDetails
 * @return {Promise<Sponsor>} The promise will resolve to a sponsor object if save was successful.
 * @description Adds a new sponsor to database.
 */
function createSponsor(sponsorDetails) {
    const TAG = `[Sponsor Service # createSponsor]:`;

    const sponsor = new Sponsor(sponsorDetails);

    return sponsor.save();
}

/**
 * @function findByAccountId
 * @param {ObjectId} accountId
 * @return {DocumentQuery[]} A list of sponsor document queries found with the accountId
 */
function findByAccountId(accountId) {
    const TAG = `[ Sponsor Service # findByAccountId ]:`;

    const query = {
        accountId: accountId
    };

    return Sponsor.findOne(query, logger.updateCallbackFactory(TAG, "sponsor"));
}

module.exports = {
    findByAccountId: findByAccountId,
    findById: findById,
    createSponsor: createSponsor,
};