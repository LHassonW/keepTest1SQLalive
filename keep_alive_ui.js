const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to Admin Login...');
    await page.goto('https://testonejuvt.great-site.net/question1/admin-login', { 
      waitUntil: 'networkidle' 
    });

    // 1. Enter Email
    console.log('📧 Entering email...');
    const emailInput = page.locator('#email');
    await emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await emailInput.fill('lhasson@gmail.com');

    // 2. Enter Password
    console.log('🔑 Entering password...');
    const passwordInput = page.locator('#password');
    await passwordInput.fill('Almaty');

    // 3. Submit Login
    console.log('🖱️ Clicking Login button...');
    // We press Enter on the password field to submit the form
    await passwordInput.press('Enter');

    // 4. Wait for redirection or login to process
    console.log('⏳ Waiting for authentication...');
    await page.waitForTimeout(5000); 

    // 5. Navigate to Submissions page
    console.log('📂 Navigating to Submissions page...');
    await page.goto('https://testonejuvt.great-site.net/question1/submissions', { 
      waitUntil: 'networkidle' 
    });

    console.log('✅ Success! Current URL:', page.url());
    console.log('📋 Page Title:', await page.title());

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
