"use strict";

const express = require("express");

const Services = {
    Logger: require("../../services/logger.service.js"),
    Account: require("../../services/account.service.js")
};
const Controllers = {
    Account: require("../../controllers/account.controller")
};
const Middleware = {
    Validator: {
        /* Insert the require statement to the validator file here */
        Account: require("../../middlewares/validators/account.validator")
    },
    /* Insert all of ther middleware require statements here */
    parseBody: require("../../middlewares/parse-body.middleware"),
    Account: require("../../middlewares/account.middleware")
};

module.exports = {
    activate: function (apiRouter) {
        const accountRouter = new express.Router();

        // untested
        accountRouter.route("/self").get(
            Controllers.Account.getUserByEmail
        );

        // untested
        accountRouter.route("/create").post(
            // validators
            Middleware.Validator.Account.postNewAccountValidator,

            Middleware.parseBody.middleware,

            // middlewares to parse body/organize body
            // adds default hacker permissions here
            Middleware.Account.parseAccount,
            Middleware.Account.addDefaultPermission,

            // should return status in this function
            Controllers.Account.addUser
        );

        // untested
        // is not able to update permissions
        accountRouter.route("/updateOneUser").post(
            // validators
            Middleware.Validator.Account.postChangeAccountValidator,

            Middleware.parseBody.middleware,

            // middlewares
            Middleware.Account.parseAccount,

            Controllers.Account.changeUserInfo
        );

        apiRouter.use("/account", accountRouter);
    }
};