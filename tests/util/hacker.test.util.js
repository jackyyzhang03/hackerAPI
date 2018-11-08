"use strict";
const Util = {
    Account: require("./account.test.util"),
    Skill: require("./skill.test.util")
};

const mongoose = require("mongoose");
const Hacker = require("../../models/hacker.model");
const logger = require("../../services/logger.service");
const TAG = "[ HACKER.TEST.UTIL.JS ]";

const invalidHacker1 = {
    "_id": mongoose.Types.ObjectId(),
    // invalid mongoID
    "accountId": "UtilAccountAccount1_id",
    // invalid missing school attribute
    "gender": "Female",
    "needsBus": true,
    "application": {
        // invalid portflio with no resume
        "portfolioURL": {},
        // invalid jobInterest
        "jobInterest": "ASDF",
    }
};

const duplicateAccountLinkHacker1 = {
    "_id": mongoose.Types.ObjectId(),
    "accountId": Util.Account.Account1._id,
    "status": "Applied",
    "school": "University of Blah",
    "gender": "Male",
    "needsBus": true,
    "application": {
        "portfolioURL": {
            //gcloud bucket link
            "resume": "www.gcloud.com/myResume100",
            "github": "www.github.com/Person1",
            "dropler": undefined,
            "personal": "www.person1.com",
            "linkedIn": "www.linkedin.com/in/Person1",
            "other": undefined
        },
        "jobInterest": "Full-time",
        "skills": [
            Util.Skill.Skill1._id,
            Util.Skill.Skill5._id,
            Util.Skill.Skill8._id,
        ],
    }
};

const newHacker1 = {
    "accountId": Util.Account.generatedAccounts[6]._id,
    "school": "University of ASDF",
    "gender": "Female",
    "needsBus": true,
    "application": {
        "portfolioURL": {
            //gcloud bucket link
            "resume": "www.gcloud.com/myResume100",
            "github": "www.github.com/Person1",
            "dropler": undefined,
            "personal": "www.person1.com",
            "linkedIn": "www.linkedin.com/in/Person1",
            "other": undefined
        },
        "jobInterest": "Full-time",
        "skills": [
            Util.Skill.Skill1._id,
            Util.Skill.Skill5._id,
            Util.Skill.Skill8._id,
        ],
    }
};

const newHacker2 = {
    "accountId": Util.Account.NonConfirmedAccount1._id,
    "school": "University of YIKES",
    "gender": "Female",
    "needsBus": true,
    "application": {
        "portfolioURL": {
            //gcloud bucket link
            "resume": "www.gcloud.com/myResume100",
            "github": "www.github.com/Person1",
            "dropler": undefined,
            "personal": "www.person1.com",
            "linkedIn": "www.linkedin.com/in/Person1",
            "other": undefined
        },
        "jobInterest": "Full-time",
        "skills": [
            Util.Skill.Skill1._id,
            Util.Skill.Skill5._id,
            Util.Skill.Skill8._id,
        ],
    }
};

const HackerA = {
    "_id": mongoose.Types.ObjectId(),
    "accountId": Util.Account.Account1._id,
    "status": "Applied",
    "school": "University of Blah",
    "gender": "Male",
    "needsBus": true,
    "application": {
        "portfolioURL": {
            //gcloud bucket link
            "resume": "www.gcloud.com/myResume100",
            "github": "www.github.com/Person1",
            "dropler": undefined,
            "personal": "www.person1.com",
            "linkedIn": "www.linkedin.com/in/Person1",
            "other": undefined
        },
        "jobInterest": "Full-time",
        "skills": [
            Util.Skill.Skill1._id,
            Util.Skill.Skill5._id,
            Util.Skill.Skill8._id,
        ],
    }
};
const HackerB = {
    "_id": mongoose.Types.ObjectId(),
    "accountId": Util.Account.Account2._id,
    "status": "Accepted",
    "school": "University of Blah1",
    "gender": "Female",
    "needsBus": false,
    "application": {
        "portfolioURL": {
            //gcloud bucket link
            "resume": "www.gcloud.com/myResume1",
            "github": "www.github.com/Person4",
            "dropler": undefined,
            "personal": undefined,
            "linkedIn": undefined,
            "other": undefined
        },
        "jobInterest": "Internship",
        "skills": [
            Util.Skill.Skill1._id,
            Util.Skill.Skill4._id,
            Util.Skill.Skill7._id,
        ],
    }
};
const Hackers = [
    HackerA,
    HackerB,
];

module.exports = {
    duplicateAccountLinkHacker1: duplicateAccountLinkHacker1,
    invalidHacker1: invalidHacker1,
    newHacker1: newHacker1,
    newHacker2: newHacker2,
    HackerA: HackerA,
    HackerB: HackerB,
    Hackers: Hackers,
    storeAll: storeAll,
    dropAll: dropAll
};

function storeAll(attributes, callback) {
    const hackerDocs = [];
    const hackerIds = [];
    for (var i = 0; i < attributes.length; i++) {
        hackerDocs.push(new Hacker(attributes[i]));
        hackerIds.push(attributes[i]._id);
    }

    Hacker.collection.insertMany(hackerDocs).then(
        () => {
            logger.info(`${TAG} saved Hackers: ${hackerIds.join(",")}`);
            callback();
        },
        (reason) => {
            logger.error(`${TAG} could not store Hackers ${hackerIds.join(",")}. Error: ${JSON.stringify(reason)}`);
            callback(reason);
        }
    );
}

function dropAll(callback) {
    Hacker.collection.drop().then(
        () => {
            logger.info(`Dropped table Hacker`);
            callback();
        },
        (err) => {
            logger.error(`Could not drop Hacker. Error: ${JSON.stringify(err)}`);
            callback(err);
        }
    ).catch((error) => {
        logger.error(error);
        callback();
    });
}