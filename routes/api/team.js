"use strict";

const express = require("express");

const Controllers = {
    Team: require("../../controllers/team.controller")
};
const Middleware = {
    Validator: {
        /* Insert the require statement to the validator file here */
        Team: require("../../middlewares/validators/team.validator")
    },
    /* Insert all of ther middleware require statements here */
    parseBody: require("../../middlewares/parse-body.middleware"),
    Team: require("../../middlewares/team.middleware")
};

module.exports = {
    activate: function (apiRouter) {
        const teamRouter = new express.Router();

        /**
         * @api {post} /team/ create a new team
         * @apiName createTeam
         * @apiGroup Team
         * @apiVersion 0.0.8
         * 
         * @apiParam (body) {String} name Name of the team.
         * @apiParam (body) {MongoID[]} [members] Array of members in team.
         * @apiParam (body) {String} [devpostURL] Devpost link to hack. Once the link is sent, the hack will be considered to be submitted.
         * @apiParam (body) {String} projectName Name of the team.
         * 
         * @apiSuccess {string} message Success message
         * @apiSuccess {object} data Team object
         * @apiSuccessExample {object} Success-Response: 
         *      {
                    "message": "Team creation successful", 
                    "data": {...}
                }

         * @apiError {string} message Error message
         * @apiError {object} data empty
         * @apiErrorExample {object} Error-Response: 
         *      {"message": "Issue with team creation", "data": {}}
         */
        teamRouter.route("/").post(
            // Validators
            Middleware.Validator.Team.newTeamValidator,

            Middleware.parseBody.middleware,

            Middleware.Team.parseTeam,

            // check that member is not already in a team
            Middleware.Team.ensureUniqueHackerId,

            Controllers.Team.createTeam

        );

        apiRouter.use("/team", teamRouter);
    }
};