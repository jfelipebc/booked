// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer';

function getThumbnail (): Promise<object> {
  return new Promise(async (resolve, reject) => {
      try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto("https://dev.to/github/what-are-github-actions-3pml/");
          let response = await page.evaluate(() => {
              const title: HTMLMetaElement = document.querySelector('meta[property="og:title"]')
              const description: HTMLMetaElement = document.querySelector('meta[property="og:description"]')
              const canonicalLink: HTMLAnchorElement = document.querySelector("link[rel=canonical]");
              const image: HTMLMetaElement = document.querySelector('meta[property="og:image"]');

              const thumbnail = {
                  title: title.content,
                  description: description.content,
                  url: canonicalLink.href,
                  image: image.content
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

