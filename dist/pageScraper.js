"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const lesson_model_1 = require("./lesson/lesson.model");
const tutor_model_1 = require("./tutor/tutor.model");
const skooliWebSite = "https://www.skooli.com/math-tutor";
const tutorsObjs = [];
const scraperObject = {
    url: skooliWebSite,
    scraper(browser) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield browser.newPage();
            yield page.setViewport({ width: 1280, height: 1800 });
            console.log(`Navigating to ${this.url}...`);
            yield page.goto(this.url);
            for (let i = 1; i < 2; i++) {
                const data = yield page.evaluate(() => {
                    const tds = Array.from(document.querySelectorAll(".tutor-grid-item  > .tutor-grid-item-data"));
                    return tds.map((td) => {
                        let txt = td.innerText;
                        let txtAfterSplit = txt.split("\n");
                        return txtAfterSplit;
                    });
                });
                for (let i = 0; i < data.length; i++) {
                    let tutorDataObj = {};
                    if (isNaN(data[i][0])) {
                        tutorDataObj = {
                            "name": data[i][0],
                            "score": 0,
                            "education": data[i][2],
                            "tutoringSubjects": data[i][4].split('I can tutor:')[1].split(','),
                            "availability": true,
                            "areas": [],
                            "gender": 1,
                            "phone": "0504588224"
                        };
                    }
                    else {
                        tutorDataObj = {
                            "name": data[i][1],
                            "score": parseInt(data[i][0]),
                            "education": data[i][3],
                            "tutoringSubjects": data[i][5].split('I can tutor:')[1].split(','),
                            "availability": true,
                            "areas": [],
                            "gender": 1,
                            "phone": "0504588224"
                        };
                    }
                    tutorsObjs.push(tutorDataObj);
                }
                yield page.goto(this.url + "?page=" + i);
                console.log(`Scraping page ${i}`);
            }
            yield browser.close();
            (() => __awaiter(this, void 0, void 0, function* () {
                database_1.connect();
                try {
                    for (const tutor of tutorsObjs) {
                        const lessonIds = yield Promise.all(tutor.tutoringSubjects.map((lessonName) => __awaiter(this, void 0, void 0, function* () {
                            console.log(`Created lesson ${lessonName}`);
                            const doc = yield lesson_model_1.LessonModel.create({
                                subject: lessonName,
                                city: 'Holon',
                                minAgeRange: 5,
                                maxAgeRange: 25,
                                classType: getRandomInt(2)
                            });
                            return doc._id;
                        })));
                        tutor.tutoringSubjects = lessonIds;
                        yield tutor_model_1.TutorModel.create(tutor);
                        console.log(`Created user ${tutor.name}`);
                    }
                    database_1.disconnect();
                }
                catch (e) {
                    console.error(e);
                }
            }))();
        });
    },
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
module.exports = scraperObject;
//# sourceMappingURL=pageScraper.js.map