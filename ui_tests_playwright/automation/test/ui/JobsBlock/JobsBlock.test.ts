import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import {driver} from '../../../base/driver/Driver';
import UrlProvider from '../../../providers/UrlProvider';
import {contentfulSteps} from '../../../steps/contentful/ContentfulSteps';
import {careerSteps} from '../../../steps/careerPageSteps/CareerSteps';
import {descriptionSteps} from '../../../steps/components/Job/DescriptionSteps';
import Career from '../../../identifiers/Career';
import {containerSteps} from '../../../steps/components/Container/ContainerSteps';
import ContainerByClass from '../../../components/Container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import JobPagePreconditions from '../../../preconditionsData/uiPreconditions/JobPagePreconditions';
import { stringUtils } from '../../../utils/StringUtils';
import Input from '../../../identifiers/Input';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await contentfulSteps.createCareerWithDefaultValue(
		'JobsBlockTest{SRND}',
		'defaultTestCareer{SRND}',
		'defaultTestDescription{SRND}'
	);
});

test('Check that breadcrumbs displays correctly on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(stringUtils.AddRandom('JobsBlockTest{SRND}'));
	await careerSteps.clickOnCareerCard(stringUtils.AddRandom('JobsBlockTest{SRND}'));
	expect(await careerSteps.getBreadcrumbsText()).toBe(stringUtils.AddRandom('Jobs / JobsBlockTest{SRND}'));
});

test('Check localization on job page @Regression @JobsBlock @TSWEB-560', async () => {
	await careerSteps.verifyThatCareerWasCreated(stringUtils.AddRandom('JobsBlockTest{SRND}'));
	await careerSteps.clickOnCareerCard(stringUtils.AddRandom('JobsBlockTest{SRND}'));
	await careerSteps.switchLanguageViaHeader('ua');
	const applyPropositionWrapper = await containerSteps.getContainer(
		ContainerByClass,
		Containers.jobPageApplyProposition
	);
	expect(await careerSteps.getJobHeaderText()).toBe('Тестова Вакансія');
	expect(
		await driver.getByTestId(Career.jobHeaderJobsTabUa).textContent()
	).toBe('Вакансії');
	expect(
		await driver.getByTestId(Career.jobHeaderAboutUsTabUa).textContent()
	).toBe('Про компанію');
	expect(
		await driver.getByTestId(Career.jobHeaderReviewsTabUa).textContent()
	).toBe('Відгуки');
	expect(
		await driver.getByTestId(Career.jobHeaderContactUsTabUa).textContent()
	).toBe('Зв’язатись з нами');

	for (const header of JobPagePreconditions.descriptionBlocksIdentifiersAndUaHeaders) {
		await descriptionSteps.checkDescriptionBlockHeader(
			header[0],
			header[1]
		);
	}
	expect(await applyPropositionWrapper.textContent()).toBe(
		'Хочеш стати частиною нашої команди?Подавай заявку!'
	);
});

test('Check that "First Name" and "Last Name" input fields does not accept only spaces in "Apply for a Job" modal window on job page @Regression @JobsBlock @TSWEB-76', async () => {
	await driver.locator(`[data-id*=${Containers.careerCardWithoutModifier}]`).nth(1).click();
	await driver.getByTestId(Career.ApplyNowButton).click();

	await driver.getByTestId(Career.Modal_firstNameInput).fill(" "); // One space
	await driver.getByTestId(Career.Modal_lastNameInput).fill("                                         "); // Many spaces
	await driver.getByTestId(Career.Modal_sendRequestButton).click();

	const actualErrorText_FirstName = await driver.getByTestId(Career.Modal_firstNameInput).locator(Input.fieldErrorSelector).textContent();
	const actualErrorText_LastName = await driver.getByTestId(Career.Modal_lastNameInput).locator(Input.fieldErrorSelector).textContent();
	expect(actualErrorText_FirstName).toEqual("Please enter your name");
	expect(actualErrorText_LastName).toEqual("Please enter your last name");
});

test.afterEach(async () => {
	await driver.closeDrivers();
	await contentfulSteps.deleteAndUnpublishCareer(
		'defaultTestCareer{SRND}',
		'defaultTestDescription{SRND}'
	);
});
