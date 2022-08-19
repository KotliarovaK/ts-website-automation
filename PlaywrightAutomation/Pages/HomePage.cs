﻿using System.Linq;
using System.Threading.Tasks;
using AutomationUtils.Utils;
using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class HomePage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'_HeaderWrapper')]";

        public ILocator Logo => Page.Locator(Container).Locator("//img[contains(@src, 'logo')]");

        public ILocator LanguageSwitchers => Page.Locator(Container).Locator("//div[contains(@class,'_LocaleSwitcherBlock')]/a");

        public ILocator NoResultsMessage =>
            Page.Locator("//div[contains(@class,'styledComponents__NoCareerWrapper')]");

        public async void CheckLogo()
        {
            Verify.IsTrue(await Logo.IsVisibleAsync(), "Header logo is not displayed");
            Verify.AreEqual("Techstack", await Logo.GetAttributeAsync("alt"),
                "Header logo is not displayed");
        }

        public async Task SelectLanguage(string language)
        {
            var switcher = (await LanguageSwitchers.ElementHandlesAsync())
                .First(x => x.InnerTextAsync().GetAwaiter().GetResult().Equals(language));
            await switcher.ClickAsync();

            await Page
                .WaitForFunctionAsync("switcher => switcher.getAttribute('class').includes('active-locale')", switcher);
        }

        public async Task<string> GetSelectedLanguage()
        {
            var selectedSwitcher = (await LanguageSwitchers.ElementHandlesAsync())
                .First(x => x.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-locale"));
            return await selectedSwitcher.InnerTextAsync();
        }
    }
}