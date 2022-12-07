﻿using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using System;
using System.Collections.Generic;

namespace PlaywrightAutomation.Pages
{
    internal class CareerMainPage : BasePage, IWebContainer
    {
        public string Container => "//div[contains(@class,'styledComponents__CareerMainBody')]";

        public void WaitForRandomCareers(List<string> careersList, NumberOfAttempts amountOfAttempt = NumberOfAttempts.FiveAttempt)
        {
            foreach (var defaultCareer in careersList)
            {
                var result = false;

                for (var i = 0; i < (int)amountOfAttempt; i++)
                {
                    result = CheckCareerDisplayed(Page.Component<Card>(defaultCareer.ConvertToPascalCase()));

                    if (result)
                    {
                        break;
                    }

                    Page.Component<Pagination>().ReturnFirstPage();
                    Page.ReloadAsync(new PageReloadOptions { WaitUntil = WaitUntilState.DOMContentLoaded }).GetAwaiter().GetResult();
                }

                if (!result)
                {
                    throw new Exception($"'{defaultCareer.ConvertToPascalCase()}' wasn't created in Contentful");
                }
            }
        }

        private bool CheckCareerDisplayed(ILocator component)
        {
            var pagination = Page.Component<Pagination>();
            var paginationArrowRight = pagination.ArrowButtonByDirection("right");

            if (component.Count() > 0)
            {
                return true;
            }

            if (pagination.IsVisibleAsync().Result)
            {
                pagination.HoverAsync().GetAwaiter().GetResult();
            }

            while (pagination.IsVisibleAsync().GetAwaiter().GetResult()
                   && paginationArrowRight.Count() > 0)
            {
                pagination.HoverAsync().GetAwaiter().GetResult();
                paginationArrowRight.ClickAsync().GetAwaiter().GetResult();

                if (component.Count() > 0)
                {
                    return true;
                }
            }

            return false;
        }

        public enum NumberOfAttempts
        {
            ThreeAttempt = 3,
            FiveAttempt = 5,
            TenAttempt = 10,
            FifteenAttempt = 15
        }
    }
}
