﻿Feature: SearchFieldInCareerPage

Background:
	Given User is on the career website

@Regression @TSWEB133
Scenario: SearchResultsEqualsToEnteredTextInSearchByRoleField
	When User set first vacancy from page in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contain desired value

@Regresiion @TSWEB133
Scenario: SearchResultsContainsPartOfTheNameVacancy
	When User set part of the name first vacancy from page in 'Search' by role field
	When User clicks on 'Search' button
	Then Search results contain desired value

@Regression @TSWEB133
Scenario: PageDisplayedVacanciesAfterDeleteTextFromSearchField
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' by role field
	When User clicks on 'Clear' search field button
	Then '' text is displayed in 'Search' input
	Then The page has not changed after removed terms from search field