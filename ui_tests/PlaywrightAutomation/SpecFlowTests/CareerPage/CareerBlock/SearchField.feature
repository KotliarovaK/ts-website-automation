﻿@retry(2)
Feature: SearchField

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectResultsWhenEnteringVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates tag
		| Prefix    | Name                                  |
		| Direction | TestingSideDirectionOfSearch_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingSideDirectionOfSearch_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User set 'TestUs' text to 'Search' input on 'CareerHeaderPage' container
	Then Search results contain 'TestUs'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates tag
		| Prefix    | Name                                    |
		| Direction | TestingSideDirectionPartOfText_Тестовий |
	Given User creates and publish new Career Description
		| Field             | Value                      |
		| AboutTheProjectUs | AboutTheProjectUs          |
		| AboutTheProjectUa | AboutTheProjectUa          |
		| AboutTheRoleUs    | AboutTheRoleUs             |
		| AboutTheRoleUa    | AboutTheRoleUa             |
		| TitleUs           | TitleUs                    |
		| TitleUa           | TitleUa                    |
		| YouWillUs         | YouWillUs                  |
		| YouWillUa         | YouWillUa                  |
		| YouAreUs          | YouAreUs                   |
		| YouAreUa          | YouAreUa                   |
		| WeWillUs          | WeWillUs                   |
		| WeWillUa          | WeWillUa                   |
		| WeAreUs           | WeAreUs                    |
		| WeAreUa           | WeAreUa                    |
		| TechnologyStack   | TechnologyStackUs          |
		| SlugUs            | TestSlugUsDirectionOnlyOne |
	Given User creates new Career with 'TitleUs' career description and 'TestingSideDirectionPartOfText_Тестовий' tag
		| NameUs | NameUa | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| TestUs | TestUa | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User set 'Test' text to 'Search' input on 'CareerHeaderPage' container
	Then Search results contain 'Test'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesStartPageAfterClearedTextFromSearchInputInCareerBlock
	Given User is on the career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'CareerHeaderPage' container
	When User clears input on 'CareerHeaderPage' container
	Then '' text is displayed in 'Search' input on 'CareerHeaderPage' container
	Then The page has not changed after removed terms from search field

@Regession @TSWEB145
Scenario: CheckThatUserSeesMessageAboutFailSearchResultsAfterClearedSearchInputInCareerBlock
	Given User is on the career website
	When User set 'wrongString' text to 'Search' input on 'CareerHeaderPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regession @TSWEB145
Scenario: CheckThatAllDropdownsAreExpandedByDefault
	Given User is on the career website
	Then Dropdowns are expanded on 'CareerPage' container
		| Dropdown         |
		| Direction        |
		| Seniority levels |
		| Tags             |
		| Technology stack |