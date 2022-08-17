﻿using System.Linq;
using System.Text.RegularExpressions;
using AutomationUtils.Extensions;
using AutomationUtils.Utils;
using FluentAssertions;
using Microsoft.Playwright;
using PlaywrightAutomation.Components;
using PlaywrightAutomation.Extensions;
using PlaywrightAutomation.Helpers;
using PlaywrightAutomation.Pages;
using PlaywrightAutomation.RuntimeVariables;
using PlaywrightAutomation.Utils;
using TechTalk.SpecFlow;
using static PlaywrightAutomation.Components.BaseWebComponent;

namespace PlaywrightAutomation.Steps
{
    [Binding]
    internal class CareerPageSteps : SpecFlowContext
    {
        private readonly IPage _page;
        private readonly VacancyList _position;
        private readonly SelectedTagsList _selectedTags;

        public CareerPageSteps(BrowserFactory browserFactory, VacancyList position, SelectedTagsList selectedTags)
        {
            _page = browserFactory.Page;
            _position = position;
            _selectedTags = selectedTags;
        }

        [When(@"User selects '([^']*)' language")]
        public void WhenUserSelectsLanguage(string language)
        {
            _page.Init<HomePage>().SelectLanguage(language).GetAwaiter().GetResult();
        }

        [When(@"User remembers vacancy names from Job page")]
        public void WhenUserRemembersVacancyNamesFromJobPage()
        {
            _position.Value = _page.Component<Card>("").CardHeader().AllTextContentsAsync().GetAwaiter().GetResult()
                .ToList();
        }

        [Then(@"Search results contains '([^']*)'")]
        public void ThenSearchResultsContains(string text)
        {
            _page.WaitForTimeoutAsync(2000).GetAwaiter().GetResult();
            var texts = _page.Component<Card>("").GetAllExistCardTags().AllTextContentsAsync().GetAwaiter().GetResult();

            foreach (var roleText in texts)
            {
                Verify.IsTrue(roleText.Contains(text), $"'{roleText}' is not contains '{text}'");
            }
        }

        [Then(@"Search results equals to selected tags")]
        public void ThenSearchResultsEqualsToSelectedTags()
        {
            var tagsWithoutNumber = _selectedTags.Value.ListTagsWithoutNumber();
            var texts = _page.Component<Card>().GetAllExistCardTags().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                var comparison = tagsWithoutNumber.Any(x => x.Equals(text));
                comparison.Should().BeTrue();
            }
        }

        [Then(@"Search results contain desired value")]
        public void ThenSearchResultsContainDesiredValue()
        {
            var values = _page.Component<Card>().CardTitle().AllInnerTextsAsync().GetAwaiter().GetResult();

            foreach (string value in values)
            {
                _position.Value.Should().Contain(value);
            }
        }

        [Then(@"'([^']*)' message is displayed")]
        public void ThenErrorMessageIsDisplayed(string errorMessage)
        {
            var actualErrorMessage =
                _page.Init<HomePage>().NoResultsMessage.TextContentAsync().GetAwaiter().GetResult();
            actualErrorMessage.Should().Be(errorMessage);
        }

        [Then(@"'Techstack' logo is displayed in the main page")]
        public void ThechstackLogoIsDisplayedInTheMainPage()
        {
            _page.Init<HomePage>().CheckLogo();
        }

        [Then(@"'([^']*)' language is selected")]
        public async void ThenLanguageIsSelected(string language)
        {
            var page = _page.Init<HomePage>();
            Verify.AreEqual(language, await page.GetSelectedLanguage(),
                "Incorrect language is selected");
        }

        [Then(@"The page has not changed after removed terms from search field")]
        public void ThePageHasNotChangedAfterRemovedTermsFromSearchField()
        {
            var actualListNames = _page.Component<Card>("").CardHeader().AllTextContentsAsync().GetAwaiter().GetResult();
            var expectedListNames = _position.Value;
            actualListNames.Should().IntersectWith(expectedListNames);
        }

        [Then(@"'([^']*)' tag is displayed")]
        public void ThenTagIsDisplayed(string tag)
        {
            var displayedTags = _page.Component<Tag>("").ChosenTags().IsVisibleAsync().GetAwaiter().GetResult();
            displayedTags.Should().BeTrue();
        }

        [Then(@"Selected tags are displayed")]
        public void ThenSelectedTagsAreDisplayed()
        {
            var tagsWithoutNumber = _selectedTags.Value.ListTagsWithoutNumber();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.RemoveSpaceAndSlash();
                var tags = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").ChosenTags()});
                var displayedSelectedTags = tags.IsVisibleAsync().GetAwaiter().GetResult();
                displayedSelectedTags.Should().BeTrue();
            }
        }

        [Then(@"Selected tags has correctly color")]
        public void ThenSelectedTagsHasCorrectlyColor()
        {
            var tagsWithoutNumber = _selectedTags.Value.ListTagsWithoutNumber();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.RemoveSpaceAndSlash();
                var tags = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").ChosenTags()});
                var backgroundColor = LocatorExtensions.GetBackgroundColor(tags);
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        [Then(@"Selected tags are displayed in '([^']*)' sight bar")]
        public void ThenSelectedTagsAreDisplayedInSightBar(string sightBarName)
        {
            var tagsWithoutNumber = _selectedTags.Value.ListTagsWithoutNumber();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.RemoveSpaceAndSlash();
                var tag = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").SelectedTagsFromSightBar(sightBarName)});
                var tagsDisplayedInSighBar = tag.IsVisibleAsync().GetAwaiter().GetResult();
                tagsDisplayedInSighBar.Should().BeTrue();
            }
        }

        [Then(@"Selected tags from '([^']*)' sight bar has correctly color")]
        public void ThenSelectedTagsFromSightBarHasCorrectlyColor(string sightBarName)
        {
            var tagsWithoutNumber = _selectedTags.Value.ListTagsWithoutNumber();

            foreach (var name in tagsWithoutNumber)
            {
                var removedStuff = name.RemoveSpaceAndSlash();

                var tag = _page.Component<Tag>(removedStuff,
                    new Properties() {Parent = _page.Component<Tag>("").SelectedTagsFromSightBar(sightBarName)});
                var backgroundColor = LocatorExtensions.GetBackgroundColor(tag);
                var expectedColor = ColorsConvertor.Converter("orange yellow");
                backgroundColor.Should().Be(expectedColor);
            }
        }

        [Then(@"Search results contains selected tags from dropdown")]
        public void ThenSearchResultsContainsSelectedTagsFromDropdown(Table table)
        {
            var tags = table.Rows.Select(row => row.Values.FirstOrDefault()).ToList();
            var texts = _page.Component<Card>("").GetAllExistCardTags().AllTextContentsAsync().GetAwaiter().GetResult().ToList();

            foreach (var text in texts)
            {
                var comparison = tags.Any(x => x.Equals(text));
                comparison.Should().BeTrue();
            }
        }

        [Then(@"All selected tags was cancel")]
        public void ThenAllSelectedTagsWasCancel()
        {
            var selectedTags = _page.Component<Tag>("").SelectedTagsList().AllTextContentsAsync().GetAwaiter()
                .GetResult();
            selectedTags.Should().BeEmpty();
        }

        [Then(@"User in on the '([^']*)' block")]
        public void ThenUserInOnTheBlock(string blockName)
        {
            var block = _page.Component<NavigationTabs>(blockName);
            var displayedBlock = block.IsVisibleAsync().GetAwaiter().GetResult();
            displayedBlock.Should().BeTrue();
            var activeBlock = block.GetAttributeAsync("class").GetAwaiter().GetResult().Contains("active-nav-tab");
            activeBlock.Should().BeTrue();
        }
    }
}