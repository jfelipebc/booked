// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer';

function getThumbnail (): Promise<object> {
  return new Promise(async (resolve, reject) => {
      try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto("https://www.smashingmagazine.com/2021/02/things-you-can-do-with-css-today/");
          let response = await page.evaluate(() => {
              const title: HTMLMetaElement = document.querySelector('meta[property="og:title"]')
              const description: HTMLMetaElement = document.querySelector('meta[property="og:description"]')
              const url: HTMLMetaElement = document.querySelector('meta[property="og:url"]')
              const site: HTMLMetaElement = document.querySelector('meta[property="og:site_name"]')
              const image: HTMLMetaElement = document.querySelector('meta[property="og:image"]');

              const thumbnail = {
                  title: title.content,
                  description: description.content,
                  url: url.content,
                  image: image.content,
                  site: site.content
              }

              return thumbnail;
          })
          browser.close();
          return resolve(response);
      } catch (e) {
          return reject(e);
      }
  })
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getThumbnail()
  res.status(200).json(data)
}