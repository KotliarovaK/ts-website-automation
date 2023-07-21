import {expect, test} from '@playwright/test';
import {driver} from '../../../../base/driver/Driver';
import Button from '../../../../identifiers/Button';
import ApplyForAJobForm from '../../../../identifiers/forms/ApplyForAJobForm';
import Link from '../../../../identifiers/Link';
import Input from '../../../../identifiers/Input';
import UrlProvider from '../../../../providers/UrlProvider';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import Career from '../../../../identifiers/Career';
import Containers from '../../../../identifiers/Containers';
import randomstring from 'randomstring';
import ContainerByClass from '../../../../components/container/ContainerByClass';
import {containerSteps} from '../../../../steps/components/container/ContainerSteps';
import Navigation from '../../../../identifiers/Navigation';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that "First Name" and "Last Name" input fields does not accept only spaces in "Apply for a Job" modal window on job page @Regression @JobsBlock @TSWEB-76', async () => {
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(Button.ApplyNow).click();

	await driver.getByTestId(ApplyForAJobForm.FirstName).fill(' ');
	await driver.getByTestId(ApplyForAJobForm.LastName).fill(' '.repeat(99)); // Field accepts up to 100 characters
	await driver.getByTestId(Button.SendButton).click();

	const actualErrorText_FirstName = driver.getByTestId(ApplyForAJobForm.FirstName).locator(Input.FieldErrorSelector);
	const actualErrorText_LastName = driver.getByTestId(ApplyForAJobForm.LastName).locator(Input.FieldErrorSelector);
	await expect(actualErrorText_FirstName).toHaveText('Please enter your name');
	await expect(actualErrorText_LastName).toHaveText('Please enter your last name');
});

test('Check that Jobs link from breadcrumbs leads the user to the main Jobs page @Regression @JobsBlock @TSWEB-142 @TSWEB-82', async () => {
	await driver.getByTestId(/CardWrapper/).click();
	await driver.getByTestId(Link.Breadcrumbs_Jobs).click();

	await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
	await expect(driver.getByTestId(/CardWrapper/)).toBeVisible();
});

test('Check search field styling after search a long jobname on careers page @Regression @JobsBlock @TSWEB-75 @TSWEB-116', async () => {
	// Check that input size is not changed after searching
	const textData = randomstring.generate(50);
	const expectedInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
	await driver.getByTestId(Career.SarchCareerField).fill(textData);
	await expect((await driver.component(ContainerByClass, Containers.SearchResultsTextContainer)).Element).toHaveText(
		`${textData},0`
	);
	const actualInputBoxProps = await driver.getByTestId(Career.SarchCareerField).boundingBox();
	expect(actualInputBoxProps?.width).toEqual(expectedInputBoxProps?.width);
	expect(actualInputBoxProps?.height).toEqual(expectedInputBoxProps?.height);
	// Check that input is not covered by another element after searching
	await (await driver.component(ContainerByClass, Containers.SearchResultsTextContainer)).click();
	await driver.getByTestId(Career.SarchCareerField).click();
	await expect(driver.getByTestId(Career.SarchCareerField)).toBeFocused();
});

test('Check that user can switch language in navigation header in career page @Regression @JobsBlock @TSWEB-146', async () => {
	const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, Containers.JobPageHeaderWrapper);
	const logoHeader = jobPageHeaderContainer.Element.getByTestId(Link.Logo);

	// A footer element is created to navigate to it and make the navigation bar appear.
	const footerContainer = await containerSteps.getContainer(ContainerByClass, Containers.FooterWrapper);
	const logoFooter = footerContainer.getByTestId(Link.Logo);
	await logoFooter.focus();

	await logoHeader.waitFor({state: 'visible'});
	await expect(driver.getByTestId(Navigation.NavigationTab_Jobs)).toHaveText('Jobs');
	await expect(driver.getByTestId(Navigation.NavigationTab_AboutUs)).toHaveText('About us');
	await expect(driver.getByTestId(Navigation.NavigationTab_Reviews)).toHaveText('Reviews');
	await expect(driver.getByTestId(Navigation.NavigationTab_ContactUs)).toHaveText('Contact us');

	await expect(jobPageHeaderContainer.Element.getByTestId(Button.EnLanguageSwitcher)).toHaveClass(/active-locale/);

	const uaButtonSwitcher = jobPageHeaderContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
