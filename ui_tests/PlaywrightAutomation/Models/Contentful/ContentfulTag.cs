﻿using AutomationUtils.Extensions;
using System;
using System.ComponentModel;

namespace PlaywrightAutomation.Models.Contentful
{
    public class ContentfulTag
    {
        public string Id { get; private set; }
        public string Name { get; set; }

        private TagPrefix _prefix;
        public TagPrefix Prefix
        {
            get => _prefix;
            set
            {
                _prefix = value;

                var random = Guid.NewGuid().ToString("N");

                if (Name is not null)
                {
                    // "tag_hot" adds tag with background-color: rgb(255, 198, 0)
                    Id = Name.ToLower().Contains("hot") ? "tag_hot" : $"{_prefix.GetValue()}_{random}";
                }
            }
        }
        
        public int Version { get; set; } = 1;

        // TagPrefix is used to define the environment of the tag
        public enum TagPrefix
        {
            [Description("direction")]
            Direction,
            [Description("seniority")]
            Seniority,
            [Description("stack")]
            Stack,
            [Description("tag")]
            Tag
        }
    }
}
