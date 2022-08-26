﻿using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
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
        private readonly CreatedTags _createdTag;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions, CreatedCareer createdCareer, CreatedTags createdTag)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
            _createdCareer = createdCareer;
            _createdTag = createdTag;
        }

        [When(@"User creates new Career with '([^']*)' career description and '([^']*)' tag")]
        public void WhenUserCreatesNewCareerWithCareerDescriptionAndTag(string careerDescriptionTitle, string tagName, Table table)
        {
            var career = table.CreateSet<Career>();
            var careerDescription = _createdCareerDescriptions
                .Value.First(x => x.TitleUs.Equals(careerDescriptionTitle));
            var tag = _createdTag.Value.First(x => x.Name.Equals(tagName));

            foreach (var careerJob in career)
            {
                var createdCareer = _contentfulClient.CreateCareer(careerJob, careerDescription, tag).Result;

                _createdCareer.Value.Add(createdCareer);
            }
        }
    }
}
