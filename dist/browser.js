var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require('puppeteer');
function startBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        let browser;
        try {
            console.log("Opening the browser......");
            browser = yield puppeteer.launch({
                headless: true,
                args: ["--disable-setuid-sandbox"],
                'ignoreHTTPSErrors': true
            });
        }
        catch (err) {
            console.log("Could not create a browser instance => : ", err);
        }
        return browser;
    });
}
module.exports = {
    startBrowser
};
//# sourceMappingURL=browser.js.map