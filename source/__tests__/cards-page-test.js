/**
 * @file Contains puppeteer tests for the cards page of the web app
 * @author Christian Lee
 */

describe('Basic user flow for Fortune Generation Page', () => {
  // First, visit the landing page
  beforeAll(async () => {
      //Note this is a personal Live Server link. So, it will not work in general.
      await page.goto('http://localhost:8000/source/fortune-telling/card.html');
  });

  test("Check that 6 cards were generated", async () => {
    const cards = await page.$$('.card');
    expect(cards.length).toBe(6);
  });

  test('Check that clicking card changes shadow', async () => {
    //tried setting a timeout to wait for the animation to play out
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    await page.click('#card1');
    const style = await page.$eval('#card1', (card) => {
      return card.style.boxShadow;
    });
    expect(style).toBe('rgb(173, 8, 199) 0px 0px 10px 5px');
  }, 7000);

  test('Check that predict button creates fortune', async () => {
    await page.click('#getTarot');
    const text = await page.$eval('#output', (text) => {
      return text.innerHTML;
    });
    expect(text).toBe('');
  });

  test('Check that save fortune button saves fortune', async () => {
    await page.click('#saveFortune');
    let fortune = await page.evaluate(() => JSON.parse(localStorage.getItem('fortunes')));
    expect(fortune).toBe(1);
  });

  test('Check that menu page button returns to menu', async () => {
    await page.click('#returnMenu');
    const url = await page.url();
    expect(url).toBe('http://localhost:8000/source/fortune-telling/menu.html');
  });
});
