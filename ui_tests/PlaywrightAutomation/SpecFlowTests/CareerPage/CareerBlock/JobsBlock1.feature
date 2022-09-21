﻿@retry(2)
Feature: JobsBlock1

@Regression @TSWEB146 @Cleanup
Scenario: CheckJobDescriptionOnJobPage
	# Preconditions
	Given User creates tag
		| Prefix    | Name                                       |
		| Direction | TSWEB146TestingDirectionTwo_ТестовийДругий |
		| Tag       | Test146TagTwo_Тестовий146ТегДругий         |
		| Tag       | Hot_ГарячіВакансії                         |
	Given User creates and publish new Career Description
		| Field             | Value                  |
		| AboutTheProjectUs | AboutTheProjectUsTwo   |
		| AboutTheProjectUa | AboutTheProjectUaTwo   |
		| AboutTheRoleUs    | AboutTheRoleUsTwo      |
		| AboutTheRoleUa    | AboutTheRoleUaTwo      |
		| TitleUs           | TSWEB146TitleUsTwo     |
		| TitleUa           | TSWEB146TitleUaTwo     |
		| YouWillUs         | YouWillUsTwo           |
		| YouWillUa         | YouWillUaTwo           |
		| YouAreUs          | YouAreUsTwo            |
		| YouAreUa          | YouAreUaTwo            |
		| WeWillUs          | WeWillUsTwo            |
		| WeWillUa          | WeWillUaTwo            |
		| WeAreUs           | WeAreUsTwo             |
		| WeAreUa           | WeAreUaTwo             |
		| TechnologyStack   | TechnologyStackUsTwo   |
		| SlugUs            | TestSlugUsDirectionTwo |
	Given User creates new Career with 'TSWEB146TitleUsTwo' career description and 'TSWEB146TestingDirectionTwo_ТестовийДругий,Test146TagTwo_Тестовий146ТегДругий,Hot_ГарячіВакансії' tag
		| NameUs            | NameUa            | DescriptionUs     | DescriptionUa     | Type | LinkType |
		| Tsweb146TestusTwo | TSWEB146TestUaTwo | DescriptionTestUs | DescriptionTestUa | Link | Entry    |
	# Scenario
	Given User is on the career website
	When User clicks on 'Direction' dropdown
	When User selects tag from 'Direction' dropdown
		| Tag                         |
		| TSWEB146TestingDirectionTwo |
	When User clicks on 'Tsweb146TestusTwo' card title
	Then 'Tsweb146TestusTwo' job title is displayed on job page
	Then 'Hot' tag is displayed in the '1' position on job page
	Then 'Hot' tag has 'orange yellow' background color on job page
	Then Social media icons are displayed below job title on job page
	Then 'Facebook share' social share media icon is clickable on 'JobPage' container on job page
	Then 'Linkedin share' social share media icon is clickable on 'JobPage' container on job page
	Then 'Twitter share' social share media icon is clickable on 'JobPage' container on job page
	Then Job has description titles on job page
		| Title              |
		| About the product: |
		| About the role:    |
		| You will:          |
		| You:               |
		| We will:           |
		| We:                |
	Then 'Would you like to be a part of our team?' text is displayed on job page
	When User clicks on 'Apply now vacancy' button on 'JobPage' container
	Then 'Apply for a Job' title is displayed on 'Apply for a Job' page