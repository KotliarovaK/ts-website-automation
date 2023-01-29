Feature: SearchField

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectResultsWhenEnteringVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1CareerSRND' text to 'Search' input on 'CareerMainPage' container
	Then Search results contain 'Test1CareerSRND'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesCorrectSearchResultsWhenEnteringPartOfNameVacancyInSearchInputInCareerBlock
	# Precondition
	Given User creates Career with default value
	# Scenario
	Given User is on career website
	When User expects tags and careers on the page
	When User set 'Test1' text to 'Search' input on 'CareerMainPage' container
	Then Search results contain 'Test1'

@Regression @TSWEB145 @Cleanup
Scenario: CheckThatUserSeesStartPageAfterClearedTextFromSearchInputInCareerBlock
	Given User is on career website
	When User remembers vacancy names from Job page
	When User set 'Any term' text to 'Search' input on 'CareerMainPage' container
	When User clears input on 'CareerMainPage' container
	Then '' text is displayed in 'Search' input on 'CareerMainPage' container
	Then The page has not changed after removed terms from search field

@Regession @TSWEB145
Scenario: CheckThatUserSeesMessageAboutFailSearchResultsAfterClearedSearchInputInCareerBlock
	Given User is on career website
	When User set 'wrongString' text to 'Search' input on 'CareerMainPage' container
	Then 'Sorry, no matching jobs found :( Please refine your search criteria and try again' message is displayed

@Regession @TSWEB145
Scenario: CheckThatAllDropdownsAreExpandedByDefault
	Given User is on career website
	Then Dropdowns are expanded on 'CareerPage' container
		| Dropdown         |
		| Direction        |
		| Seniority levels |
		| Tags             |
		| Technology stack |