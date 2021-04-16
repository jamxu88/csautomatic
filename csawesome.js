const got = require('got');
const delay = require('delay');
const puppeteer = require('puppeteer')
const cookie = 'last_course=SMCS10_2020; ipuser=jamxu; CookieInfoScript=1; session_id_runestone=27527448:c4ab4d50-3339-4e6d-a056-475960e75f29';
const url = 'https://csawesome.runestone.academy/runestone/ajax/hsblog';
const headers = {
    'accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Length': 171,
    'content-type': 'application/json; charset=utf-8',
    'Cookie': cookie,
    'Host': 'csawesome.runestone.academy',
    'Origin': 'https://csawesome.runestone.academy',
    'Pragma': 'no-cache',
    'Referer': 'https://csawesome.runestone.academy/runestone/assignments/doAssignment?assignment_id=64021',
    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
};
var i = 1;
var j = 1;
var divIds = [];


var payload = {"event":"mChoice","act":`answer:${j}:correct`,"answer":"1","correct":"T","div_id":`qoo10-1-${i}`,"course":"SMCS10_2020","clientLoginStatus":true,"timezoneoffset":4,"percent":1}


async function getDivs() {
    const resp = await got.get('https://csawesome.runestone.academy/runestone/assignments/doAssignment?assignment_id=64021', {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': 'last_course=SMCS10_2020; ipuser=jamxu; CookieInfoScript=1; session_id_runestone=27527448:c4ab4d50-3339-4e6d-a056-475960e75f29',
            'Host': 'csawesome.runestone.academy',
            'Pragma': 'no-cache',
            'Referer': 'https://csawesome.runestone.academy/runestone/assignments/doAssignment?assignment_id=64021',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
        }
    })
    //console.log(resp.body)
    body = resp.body;
    body = body.split('\n')
    var filter = /(<li data-component="answer" data-correct id=".*">)/ig
    var ans = []
    for(item in body) {
        if(body[item].includes('data-component="answer" data-correct id=')) {
            ans.push(body[item])
        }
    }
    var keys = []
    for(item in ans) {
        const link = ans[item].matchAll(filter)
        for (const match of link) {
            ans[match[0]] = match[1]
            keys.push(match[0])
        }
    }
    //console.log(keys)
    var divans = []
    for(item in keys) {
        var arr = keys[item].split('"')
        divans.push(arr[3])
    }
    var divs = []
    for(item in divans) {
        var str = divans[item].substring(0, divans[item].length - 6);
        divs.push(str)
    }
    console.log(divs)
    var choices = []
    for(item in divans) {
        var str = divans[item].substring(divans[item].length-1, divans[item].length);
        if(str == 'a') choices.push(0)
        if(str == 'b') choices.push(1)
        if(str == 'c') choices.push(2)
        if(str == 'd') choices.push(3)
        if(str == 'e') choices.push(4)
    }
    console.log(choices)
    


    /*
    for(item in divs) {
        var payload = {"event":"mChoice","act":`answer:${choices[item]}:correct`,"answer":`${choices[item]}`,"correct":"T","div_id":`${divs[item]}`,"course":"SMCS10_2020","clientLoginStatus":true,"timezoneoffset":4,"percent":1}
        console.log(`${divs[item]} | ${choices[item]}`)
        console.log(payload)
        const resp = got.post(url, {
            headers: headers,
            body: JSON.stringify(payload)
        })
        console.log(`Submitted answers.`)
        console.log(resp.body)
    }
    const submit = await got.post('https://csawesome.runestone.academy/runestone/assignments/student_autograde', {
        headers: {
            /*'Accept': 'application/json, text/javascript, *//*; q=0.01',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': '19',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'last_course=SMCS10_2020; ipuser=jamxu; CookieInfoScript=1; session_id_runestone=27527448:c4ab4d50-3339-4e6d-a056-475960e75f29',
            'Host': 'csawesome.runestone.academy',
            'Origin': 'https://csawesome.runestone.academy',
            'Pragma': 'no-cache',
            'Referer': 'https://csawesome.runestone.academy/runestone/assignments/doAssignment?assignment_id=64021',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        },
        FormData: 'assignment_id=64021'
    })
    console.log(submit)
    */
    const browser = await puppeteer.launch({headless:false, defaultViewport: null, userDataDir: './csawesome',  args: [ `--app=https://csawesome.runestone.academy/runestone/assignments/doAssignment?assignment_id=64021`]})
    const pages = await browser.pages()
    const page = pages[0]
    page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await delay(15000)
    for(item in divans) {
        await page.click(`#${divs[item]}_opt_${choices[item]}`)
        await page.click(`#${divs[item]}_form > button.btn.btn-success`)
    }
}

async function main() {
    const resp = await got.post(url, {
        headers: headers,
        body: JSON.stringify(payload)
    })
    console.log(resp)
}
getDivs()