import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import axios from 'axios'
import { CookieJar, JSDOM } from 'jsdom'
import iconv from 'iconv-lite'

const storeFile = './cookie.json'
const outputFile = './city.json'
const url = 'http://xzqh.mca.gov.cn/map'
const selector = '#pyArr'
const attribute = 'value'

let cookieJSON = []
if (existsSync(storeFile)) {
  cookieJSON = JSON.parse(readFileSync(storeFile)) || []
}

async function getCitys(url, selector, attribute, cookieJSON) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cookie': cookieJSON.map(item => `${item.key}=${item.value}`).join(';')
      }
    })
    if (response.status === 200) {
      const html = iconv.decode(response.data, 'gbk')
      const dom = new JSDOM(html, {
        pretendToBeVisual: false,
        contentType: 'text/html;charset=gbk'
      })
      const element = dom.window.document.querySelector(selector)
      return writeFileSync(outputFile, element?.value?.replace(/'/g, ''))
    }
  }
  catch (error) {
    if (error.status === 521) {
      const errorHtml = iconv.decode(error.response.data, 'gbk')
      const cookieJar = new CookieJar()
      const dom = new JSDOM(errorHtml, {
        runScripts: 'dangerously', resources: 'usable', cookieJar, url, contentType: 'text/html;charset=gbk'
      })

      setTimeout(() => {
        const cookies = dom.cookieJar.toJSON()
        cookies.cookies.forEach((cookie) => {
          const c = cookieJSON.find(item => item.key === cookie.key)
          if (c) {
            cookie.value = c.value
          }
          else {
            cookieJSON.push({ key: cookie.key, value: cookie.value })
          }
        })
        writeFileSync(storeFile, JSON.stringify(cookieJSON))
        getCitys(url, selector, attribute, cookieJSON)
      }, 500)
    }
  }
}

// 使用示例
getCitys(url, selector, attribute, cookieJSON)
