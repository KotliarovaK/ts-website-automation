﻿using Microsoft.Playwright;

namespace PlaywrightAutomation.Extensions
{
    public static class LocatorExtensions
    {
        public static string GetBackgroundColor(this ILocator locator)
        {
            return locator.EvaluateAsync("element => getComputedStyle(element).backgroundColor")
                .GetAwaiter().GetResult().Value.ToString();
        }
    }
}
