﻿using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using PlaywrightAutomation.Steps.Contentful.ContentfulSteps;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful.ContenrfulSteps
{
    [Binding]
    internal class CareerDescriptionSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;
        private readonly CreatedCareer _createdCareer;
        private readonly CreatedTags _createdTags;
        private readonly TagSteps _tagSteps;
        private readonly Contentful.CareerDescriptionSteps _careerDescriptionSteps;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions,
                                      CreatedCareer createdCareer, CreatedTags createdTags, TagSteps tagSteps, Contentful.CareerDescriptionSteps careerDescriptionSteps)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
            _createdTags = createdTags;
            _tagSteps = tagSteps;
            _careerDescriptionSteps = careerDescriptionSteps;
        }

        [Given(@"User creates new Career with '([^']*)' career description and '([^']*)' tag")]
        public void GivenUserCreatesNewCareerWithCareerDescriptionAndTag(string careerDescriptionTitle, string tagNames, Table table)
        {
            var career = table.CreateSet<Career>();
            var careerDescription = _createdCareerDescriptions
                .Value.First(x => x.TitleUs.Equals(careerDescriptionTitle));

            var tagNamesList = tagNames.Split(',').ToList();
            var tags = _createdTags.Value.Where(x => tagNamesList.Contains(x.Name)).ToList();

            foreach (var careerJob in career)
            {
                var createdCareer = _contentfulClient.CreateCareer(careerJob, careerDescription, tags).Result;

                _createdCareer.Value.Add(createdCareer);
            }
        }

        [Given(@"User creates default Career with career description and tag")]
        public void GivenUserCreatesDefaultCareerWithCareerDescriptionAndTag(Table table)
        {
            var career = table.CreateInstance<Career>();
            career.FillWithDefaultData();

            var careerDescription = _createdCareerDescriptions.Value.FirstOrDefault();
            var tags = _createdTags.Value;

            var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, tags).GetAwaiter().GetResult();
            _createdCareer.Value.Add(createdCareer);
        }

        [Given(@"User creates and publishes '([^']*)' Careers with descriptions and tags")]
        public void GivenUserCreatesAndPublishesCareersWithDescriptionsAndTags(int careerNumber)
        {
            for (int i = 0; i < careerNumber; i++)
            {
                var randomValue = Guid.NewGuid().ToString("N");

                // Create Tag
                var contentfulTag = new ContentfulTag();
                contentfulTag.FillWithDefaultData(randomValue);

                var createdTag = _contentfulClient.CreateTag(contentfulTag).GetAwaiter().GetResult();
                _createdTags.Value.Add(createdTag);

                List<ContentfulTag> tags = new List<ContentfulTag>();
                tags.Add(createdTag);

                // Create CareerDescription
                var careerDescription = new CareerDescription();
                careerDescription.FillWithDefaultData(randomValue);

                var createdCareerDescription = _contentfulClient.CreateCareerDescription(careerDescription).GetAwaiter().GetResult();
                _createdCareerDescriptions.Value.Add(createdCareerDescription);

                // Create Career
                var career = new Career();
                career.FillWithDefaultData(randomValue);

                var createdCareer = _contentfulClient.CreateCareer(career, careerDescription, tags).GetAwaiter().GetResult();
                _createdCareer.Value.Add(createdCareer);
            }
        }

        [Given(@"User creates and publishes '([^']*)' Careers with default descriptions and tags")]
        public void GivenUserCreatesAndPublishesCareersWithDefaultDescriptionsAndTags(int careerNumber)
        {
            for (int i = 0; i < careerNumber; i++)
            {
                var random = Guid.NewGuid().ToString("N");

                Table tagTable = new Table(new string[] { "Prefix", "Name" });
                Table descriptionTable = new Table(new string[] { "Field", "Value" });
                Table careerTable = new Table(new string[] { "NameUs", "NameUa", "DescriptionUs", "DescriptionUa", "Type", "LinkType" });

                tagTable.AddRow(new string[] { "Direction", string.Concat("TestingDirection", random, "_Тестовий", random) });
                _tagSteps.GivenUserCreatesTag(tagTable);

                descriptionTable.AddRow(new string[] { "AboutTheProjectUs", $"AboutTheProjectUs{random}" });
                descriptionTable.AddRow(new string[] { "AboutTheProjectUa", $"AboutTheProjectUa{random}" });
                descriptionTable.AddRow(new string[] { "AboutTheRoleUs", $"AboutTheRoleUs{random}" });
                descriptionTable.AddRow(new string[] { "AboutTheRoleUa", $"AboutTheRoleUa{random}" });
                descriptionTable.AddRow(new string[] { "TitleUs", $"TitleUs{random}" });
                descriptionTable.AddRow(new string[] { "TitleUa", $"TitleUa{random}" });
                descriptionTable.AddRow(new string[] { "YouWillUs", $"YouWillUs{random}" });
                descriptionTable.AddRow(new string[] { "YouWillUa", $"YouWillUa{random}" });
                descriptionTable.AddRow(new string[] { "YouAreUs", $"YouAreUs{random}" });
                descriptionTable.AddRow(new string[] { "YouAreUa", $"YouAreUa{random}" });
                descriptionTable.AddRow(new string[] { "WeWillUs", $"WeWillUs{random}" });
                descriptionTable.AddRow(new string[] { "WeWillUa", $"WeWillUa{random}" });
                descriptionTable.AddRow(new string[] { "WeAreUs", $"WeAreUs{random}" });
                descriptionTable.AddRow(new string[] { "WeAreUa", $"WeAreUa{random}" });
                descriptionTable.AddRow(new string[] { "TechnologyStack", $"TechnologyStack{random}" });
                descriptionTable.AddRow(new string[] { "SlugUs", $"SlugUs{random}" });

                _careerDescriptionSteps.GivenUserCreatesAndPublishesNewCareerDescription(descriptionTable);

                careerTable.AddRow(new string[] { string.Concat("NameUs", random), string.Concat("NameUa", random),
                                                  string.Concat("DescriptionUs", random), string.Concat("DescriptionUa", random),
                                                  "Link", "Entry" });

                GivenUserCreatesNewCareerWithCareerDescriptionAndTag(string.Concat("TitleUs", random), string.Concat("TestingDirection", random, "_Тестовий", random), careerTable);
            }
        }
    }
}
