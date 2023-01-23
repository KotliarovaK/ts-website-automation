﻿using Microsoft.Playwright;

namespace PlaywrightAutomation.Pages
{
    internal class ContactUsPage : BasePage, IWebContainer
    {
        public string Container => "//div[@id='contactUsForm']";

        public ILocator Title => Page.Locator(Container).Locator("//div[@class='title']");
        public ILocator Text => Page.Locator(Container).Locator("//div[contains(@class,'MessageWrapper')]/div/span");
        public ILocator TextArea => Page.Locator(Container).Locator("//textarea[contains(@data-id,'ContactInput-message')]");
        public ILocator AttachFileInput => Page.Locator(Container).Locator("//input[@type='file']");
        public ILocator AttachedFileName => Page.Locator(Container).Locator("//label[@for='file']/span");
        public ILocator ErrorMessageForAttachInput => Page.Locator(Container).Locator("//div[@class='invalid']");
    }
}