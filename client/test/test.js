const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const localMode = false;
async function getInnerHTML(page, cssSelector){
    let text = await page.$eval(".toolbar__name", (element) => element.innerHTML);
    return text.trim();
}

function getChildrenLength(page, cssSelector){
    return page.$eval(cssSelector, (element) => element.children.length);
}

//Before run the test, make sure server is up!

describe('Testing application', () => {
    it('Load app', async () => {
        const browser = await puppeteer.launch({headless: !localMode});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        let text = await getInnerHTML(page, ".toolbar__name");
        expect(text).to.equal('TOP 10 video Chart');
        await browser.close();
    });

    it('Verify videos', async () => {
        const browser = await puppeteer.launch({headless: !localMode});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        let length = await getChildrenLength(page, ".video_list")
        expect(length).to.equal(13);
        await browser.close();
    });

    it('check filter - youtube', async () => {
        const browser = await puppeteer.launch({headless: !localMode});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.select('.select_filter', 'youtube')
        let length = await getChildrenLength(page, ".video_list")
        expect(length).to.equal(10);
        await browser.close();
    });

    it('check filter - facebook', async () => {
        const browser = await puppeteer.launch({headless: !localMode});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.select('.select_filter', 'facebook')
        let length = await getChildrenLength(page, ".video_list")
        expect(length).to.equal(1);
        await browser.close();
    });

    it('check filter - url', async () => {
        const browser = await puppeteer.launch({headless: !localMode});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.select('.select_filter', 'url')
        let length = await getChildrenLength(page, ".video_list")
        expect(length).to.equal(2);
        await browser.close();
    });
});