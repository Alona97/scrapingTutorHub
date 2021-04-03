import { TutorModel } from "./tutor/tutor.model";
import { connect, disconnect } from "./database"
import { LessonModel } from "./lesson/lesson.model";

const skooliWebSite = "https://www.skooli.com/math-tutor";
const tutorsObjs = [];
const scraperObject = {
  url: skooliWebSite,
  async scraper(browser) {
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 });
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    for (let i = 1; i < 13; i++) {
      const data = await page.evaluate(() => {
        const tds = Array.from(
          document.querySelectorAll(".tutor-grid-item  > .tutor-grid-item-data")
        );
        return tds.map((td: HTMLElement) => {
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
            "availability": data[i][5].trim(),
            "areas": [getRandomInt(3)]
          };
        }
        else {
          tutorDataObj = {
            "name": data[i][1],
            "score": parseInt(data[i][0]),
            "education": data[i][3],
            "tutoringSubjects": data[i][5].split('I can tutor:')[1].split(','),
            "availability": data[i][6].trim(),
            "areas": [getRandomInt(3)]
          };
        }
        tutorsObjs.push(tutorDataObj);
      }

      await page.goto(this.url + "?page=" + i);
      console.log(`Scraping page ${i}`);

    }
    await browser.close();

    (async () => {
      connect();
      try {
        for (const tutor of tutorsObjs) {
          const lessonIds = await Promise.all(tutor.tutoringSubjects.map(async (lessonName) => {
            console.log(`Created lesson ${lessonName}`);
            const doc = await LessonModel.create({
              subject: lessonName,
              city: '',
              minAgeRange: 5,
              maxAgeRange: 25,
              classType: ''
            });
            return doc._id;
          }))
          tutor.tutoringSubjects = lessonIds;
          await TutorModel.create(tutor);
          console.log(`Created user ${tutor.name}`);
        }

        disconnect();
      } catch (e) {
        console.error(e);
      }
    })();

  },
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = scraperObject;
