﻿using PlaywrightAutomation.Models.Contentful;
using PlaywrightAutomation.RuntimeVariables.Contentful;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ContentfulClient = PlaywrightAutomation.Utils.ContentfulClient;
using Table = TechTalk.SpecFlow.Table;

namespace PlaywrightAutomation.Steps.Contentful
{
    [Binding]
    internal class CareerDescriptionSteps : SpecFlowContext
    {
        private readonly ContentfulClient _contentfulClient;
        private readonly CreatedCareerDescription _createdCareerDescriptions;

        public CareerDescriptionSteps(ContentfulClient contentfulClient, CreatedCareerDescription createdCareerDescriptions)
        {
            _contentfulClient = contentfulClient;
            _createdCareerDescriptions = createdCareerDescriptions;
        }

        [Given(@"User creates and publishes new Career Description")]
        public void GivenUserCreatesAndPublishesNewCareerDescription(Table table)
        {
            var careerDescriptions = table.CreateInstance<CareerDescription>();
            var createdCareerDescriptions = _contentfulClient.CreateCareerDescription(careerDescriptions).Result;
            _createdCareerDescriptions.Value.Add(createdCareerDescriptions);
        }

        [Given(@"User creates and publishes new Career Description with default values")]
        public void GivenUserCreatesAndPublishesNewCareerDescriptionWithDefaultValues(Table table)
        {
            var careerDescriptions = table.CreateInstance<CareerDescription>();
            careerDescriptions.FillWithDefaultData();
            var createdCareerDescriptions = _contentfulClient.CreateCareerDescription(careerDescriptions).Result;
            _createdCareerDescriptions.Value.Add(createdCareerDescriptions);
        }
    }
}
