﻿using PlaywrightAutomation.Extensions;

namespace PlaywrightAutomation.Components
{
    public class Button : BaseWebComponent
    {
        public override string Construct()
        {
            var selector = $"//*[contains(@data-id,'{Identifier.ToAutomationValue()}Button')]";
            return selector;
        }
    }
}