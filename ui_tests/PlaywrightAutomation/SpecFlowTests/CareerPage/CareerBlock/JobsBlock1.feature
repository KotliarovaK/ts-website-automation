Feature: JobsBlock1

@Regression @TSWEB146 @Cleanup
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                       |
		| Direction | TSWEB146TestingDirectionTwo_ТестовийДругий |
		| Tag       | Test146TagTwo_Тестовий146ТегДругий         |
		| Tag       | Hot_ГарячіВакансії                         |
	Given User creates and publishes new Career Description with default values
		| Field   | Value              |
		| TitleUs | TSWEB146TitleUsTwo |
	Given User creates new Career with 'TSWEB146TitleUsTwo' career description and 'TSWEB146TestingDirectionTwo_ТестовийДругий,Test146TagTwo_Тестовий146ТегДругий,Hot_ГарячіВакансії' tag
		| NameUs            | NameUa            | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| Tsweb146TestusTwo | TSWEB146TestUaTwo | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on career website
	When User expects tag and vacancy created in 'Contentful' on the page
		| Type    | Name                        |
		| Vacancy | Tsweb146TestusTwo           |
		| Tag     | TSWEB146TestingDirectionTwo |
		| Tag     | Test146TagTwo               |
		| Tag     | Hot                         |
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                         |
		| TSWEB146TestingDirectionTwo |
	When User clicks on 'Tsweb146TestusTwo' card title
	Then 'Tsweb146TestusTwo' job title is displayed on job page
	Then Tags are displayed on job page
		| Tag           |
		| Hot           |
		| Test146TagTwo |
	Then 'Hot' tag is displayed in '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	When User clicks on 'Facebook share' wrapped button on 'JobPage' container
	Then 'Facebook' website is opened in popup window
	When User clicks on 'Linkedin share' wrapped button on 'JobPage' container
	Then 'Linkedin' website is opened in popup window
	When User clicks on 'Twitter share' wrapped button on 'JobPage' container
	Then 'Twitter' website is opened in popup window
	Then Following block titles are displayed on job page
		| Title              |
		| About the product: |
		| About the role:    |
		| You will:          |
		| You:               |
		| We will:           |
		| We:                |
	Then 'Would you like to be a part of our team?' text is displayed on Apply Container on job page
	When User clicks on 'Apply now vacancy' button on 'JobPage' container
	Then 'Apply for a Job' title is displayed on Apply For A Job page

@Regression @TSWEB146 @Cleanup
Scenario: CheckPaginationOnCareerPage
	# Preconditions
	Given User creates and publishes '12' Careers with descriptions and tags
	# Scenario
	Given User is on career website
	When User waits careers with mocked data
	Then Pagination is displayed on Career page
	Then Pagination navigation button with 'right' direction is displayed
	When User clicks on 'right' direction button in pagination panel
	Then '02' pagination button has 'orange yellow' background color in pagination panel
	Then Pagination navigation button with 'left' direction is displayed