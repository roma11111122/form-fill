const puppeteer = require('puppeteer');
const chromeOptions = {
    headless:false,
    defaultViewport: null,
    slowMo:10,
};

const request = require('request-promise-native');
const poll = require('promise-poller').default;

const siteDetails = {
    sitekey: '6Lf5phwUAAAAAK4rbyFIEsgK77ysuT5a3i4H7FZn',
    pageurl: 'https://www.tokopedia.com/contact-us/form/ban-product'
};

(async function main() {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com/contact-us/form/ban-product');
    //const requestId = await initiateCaptchaRequest('6ad3f7e0ce700731ef8d582b6a82d6c8');
    await page.type('#full_name', 'test1');
    await page.type('#company', 'test1');
    await page.type('#title', 'test1');
    await page.type('#brand_name', 'test1');
    await page.type('#brand_number', 'test1');
    await page.type('#product_link', 'test1');
    await page.type('#user_email', 'test1');
    await page.type('#user_phone', '0885673320');
    await page.type('#user_report', 'Pelanggaran Merek / Trademark Infringement');

    const fileInput = await page.$('input[type="file"]');
    await fileInput.uploadFile('./input.pdf');
    /*await page.evaluate(() => {
        document.querySelector('input[name=pemilik_haki]').click();
    });

   /* const response = await pollForRequestResults('6ad3f7e0ce700731ef8d582b6a82d6c8', requestId);

    await page.evaluate(`document.getElementById("g-recaptcha-response").removeAttribute("style")`);
    await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

    if (response !== '') {
        console.log(1);
        await page.click('#send-message');
    } */
})();

async function initiateCaptchaRequest(apiKey) {
    const formData = {
        method: 'userrecaptcha',
        googlekey: siteDetails.sitekey,
        key: apiKey,
        pageurl: siteDetails.pageurl,
        json: 1
    };
    const response = await request.post('http://2captcha.com/in.php', {form: formData});
    return JSON.parse(response).request;
}

async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
    await timeout(delay);
    return poll({
        taskFn: requestCaptchaResults(key, id),
        interval,
        retries
    });
}

function requestCaptchaResults(apiKey, requestId) {
    const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
    return async function() {
        return new Promise(async function(resolve, reject){
            const rawResponse = await request.get(url);
            const resp = JSON.parse(rawResponse);
            if (resp.status === 0) return reject(resp.request);
            resolve(resp.request);
        });
    }
}

const timeout = millis => new Promise(resolve => setTimeout(resolve, millis))
