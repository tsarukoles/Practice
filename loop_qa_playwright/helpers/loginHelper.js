/**
 * Logs in to the application using the given credentials.
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 * @param {string} password
 */
async function login(page, username, password) {

    await page.waitForLoadState('domcontentloaded');
  
    await page.fill('#username', username);
    await page.fill('#password', password);

    await page.click('button[type="submit"]');
  }
  
  module.exports = { login };
  