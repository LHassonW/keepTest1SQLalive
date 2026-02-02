const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to Admin Login...');
    // CHANGE 1: Use 'domcontentloaded' instead of 'networkidle'
    // Increase timeout to 60s because free servers are slow.
    await page.goto('https://testonejuvt.great-site.net/question1/admin-login', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    console.log('📧 Entering email...');
    const emailInput = page.locator('#email');
    // Wait for visibility instead of network idle
    await emailInput.waitFor({ state: 'visible', timeout: 20000 });
    await emailInput.fill('lhasson@gmail.com');

    console.log('🔑 Entering password...');
    const passwordInput = page.locator('#password');
    await passwordInput.fill('Almaty');

    console.log('🖱️ Submitting Login...');
    // CHANGE 2: Wait for navigation after the press
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
        passwordInput.press('Enter')
    ]);

    console.log('📂 Navigating to Submissions page...');
    await page.goto('https://testonejuvt.great-site.net/question1/submissions', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('✅ Success! Current URL:', page.url());

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    // CRITICAL: Take a screenshot on failure to see if there's a "Checking your browser" page
    await page.screenshot({ path: 'debug-failure.png' });
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
