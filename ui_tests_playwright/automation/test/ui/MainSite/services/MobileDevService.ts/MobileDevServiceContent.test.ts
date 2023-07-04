import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import Button from '../../../../../identifiers/Button';
import MobileDevService from '../../../../../identifiers/MobileDevService';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.MobileDev]);
});

test("Check the header from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const info = driver.getByTestId(MobileDevService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nMobile App Development');
	await expect(info.getByTestId(Container.Title)).toHaveText('We are experts in custom mobile app development');
});

test("Check 'Request a Quote' buttons on the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const containers = [
		MobileDevService.Info,
		MobileDevService.TechnologyStack,
		MobileDevService.WeNeverStopImprovingYourProduct,
	];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(Button.RequestAQuote)).toBeVisible();
	}
});

test("Check the container titles and numbers from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	await expect(driver.getByTestId(MobileDevService.WhatYouGet).getByTestId(Container.ContainerTitle)).toHaveText(
		'What you get'
	);
	await expect(driver.getByTestId(MobileDevService.WhatYouGet).getByTestId(Container.ContainerNumber)).toHaveText(
		'01'
	);

	await expect(driver.getByTestId(MobileDevService.WhatWeDo).getByTestId(Container.ContainerTitle)).toHaveText(
		'What we do'
	);
	await expect(driver.getByTestId(MobileDevService.WhatWeDo).getByTestId(Container.ContainerNumber)).toHaveText('02');

	await expect(driver.getByTestId(MobileDevService.TechnologyStack).getByTestId(Container.ContainerTitle)).toHaveText(
		'Technology Stack'
	);
	await expect(
		driver.getByTestId(MobileDevService.TechnologyStack).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(driver.getByTestId(MobileDevService.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies: mobile app development'
	);
	await expect(driver.getByTestId(MobileDevService.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText(
		'04'
	);

	await expect(driver.getByTestId(MobileDevService.OurApproach).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our approach'
	);
	await expect(driver.getByTestId(MobileDevService.OurApproach).getByTestId(Container.ContainerNumber)).toHaveText(
		'05'
	);

	await expect(
		driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess).getByTestId(Container.ContainerTitle)
	).toHaveText('Mobile App Development Process');
	await expect(
		driver.getByTestId(MobileDevService.MobileAppDevelopmentProcess).getByTestId(Container.ContainerNumber)
	).toHaveText('06');

	await expect(
		driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct).getByTestId(Container.ContainerTitle)
	).toHaveText('We never stop improving your product');
	await expect(
		driver.getByTestId(MobileDevService.WeNeverStopImprovingYourProduct).getByTestId(Container.ContainerNumber)
	).toHaveText('07');

	await expect(driver.getByTestId(MobileDevService.RelatedServices).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related services'
	);
	await expect(
		driver.getByTestId(MobileDevService.RelatedServices).getByTestId(Container.ContainerNumber)
	).toHaveText('08');

	await expect(driver.getByTestId(MobileDevService.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(MobileDevService.Faq).getByTestId(Container.ContainerNumber)).toHaveText('09');

	await expect(driver.getByTestId(MobileDevService.RelatedArticles).getByTestId(Container.ContainerTitle)).toHaveText(
		'Related articles'
	);
	await expect(
		driver.getByTestId(MobileDevService.RelatedArticles).getByTestId(Container.ContainerNumber)
	).toHaveText('10');
});

test("Check section numbers and section titles in 'What you get' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const whatYouGetContainer = driver.getByTestId(MobileDevService.WhatYouGet);
	const allSectionTitles = await whatYouGetContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'An app that your customers will love interacting with',
		'Increased mobile app customer engagement level',
		'Consistent, predictable and cost-efficient development process',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
	expect(await whatYouGetContainer.getByTestId(Container.SectionNumber).allInnerTexts()).toEqual(['01', '02', '03']);
});

test("Check block and section titles in 'What we do' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const whatWeDo = driver.getByTestId(MobileDevService.WhatWeDo);
	const containerBlocks = await whatWeDo.getByTestId(Container.ContainerBlock).all();
	const allSectionTitlesFirstBlock = await containerBlocks[0].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataFirstBlock = [
		'Custom business apps',
		'Mobile platform with pre-made modules',
		'Industry-specific mobile apps',
	];

	expect(allSectionTitlesFirstBlock.sort()).toEqual(testDataFirstBlock.sort());

	const allSectionTitlesSecondBlock = await containerBlocks[1].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataSecondBlock = ['React Native', 'Cordova', 'Flutter'];

	await expect(containerBlocks[1].getByTestId(Container.BlockTitle)).toHaveText('Cross platform app development');
	expect(allSectionTitlesSecondBlock.sort()).toEqual(testDataSecondBlock.sort());

	const allSectionTitlesThirdBlock = await containerBlocks[2].getByTestId(Container.SectionTitle).allInnerTexts();
	const testDataThirdBlock = ['Android', 'iOS'];

	await expect(containerBlocks[2].getByTestId(Container.BlockTitle)).toHaveText('Native app development services');
	expect(allSectionTitlesThirdBlock.sort()).toEqual(testDataThirdBlock.sort());
});

test("Check section titles in 'Technology Stack' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const technologyStackContainer = driver.getByTestId(MobileDevService.TechnologyStack);
	const allSectionTitles = await technologyStackContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['React Native', 'Cordova', 'Flutter', 'Android', 'iOS'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles and images in 'Our approach' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const ourApproachContainer = driver.getByTestId(MobileDevService.OurApproach);
	const allSectionTitles = await ourApproachContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = ['Domain\nproficiency', 'Be a part of the\nteam', 'Data-driven\ndecisions'];

	expect(allSectionTitles.sort()).toEqual(testData.sort());

	const imageCards = ourApproachContainer.getByTestId(Container.BlockSection);
	const imageCardsData = [
		{index: 0, alt: 'nine-years', src: 'img/our-approach-nine-years.svg'},
		{index: 1, alt: 'sixty-seven-percent', src: 'img/our-approach-sixty-seven.svg'},
		{index: 2, alt: 'eighty-percent', src: 'img/our-approach-eighty.svg'},
	];
	for (const image of imageCardsData) {
		const actualCard = imageCards.nth(image.index).locator('img');
		await expect(actualCard).toHaveAttribute('alt', image.alt);
		await expect(actualCard).toHaveAttribute('src', image.src);
	}
});

test("Check member names and roles in 'We Never Stop Improving Your Product' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const weNeverStopImprovingYourProductContainer = driver.getByTestId(
		MobileDevService.WeNeverStopImprovingYourProduct
	);
	const allMemberRoles = await weNeverStopImprovingYourProductContainer
		.getByTestId(Container.MemberRole)
		.allInnerTexts();
	const testDataRoles = [
		'R&D Engineer, Software Engineering Lead,\nComes up with solutions for business tasks.',
		'VP of Engineering,\nLeads the Tech Experts Program and team.',
		'Head of Human Resources,\nFinds the best talent to fit the product’s culture.',
		'Head of Account Management,\nEnsures smooth communication and results.',
		'Sr. Director of Quality Engineering,\nLeads QA and implements a data-driven culture.',
	];

	expect(allMemberRoles.sort()).toEqual(testDataRoles.sort());

	const allMemberNames = await weNeverStopImprovingYourProductContainer
		.getByTestId(Container.MemberName)
		.allInnerTexts();
	const testDataNames = [
		'Yevhenii Karachevtsev',
		'Ivan Yeremenko',
		'Maria Darmanian',
		'Dmytro Shtapauk',
		'Vitalii Dolotov',
	];

	expect(allMemberNames.sort()).toEqual(testDataNames.sort());
});

test("Check section titles in 'Related Services' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const relatedServicesContainer = driver.getByTestId(MobileDevService.RelatedServices);
	const allSectionTitles = await relatedServicesContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'Design',
		'QA as a Service',
		'Consulting',
		'Custom software development',
		'AI & ML',
		'Big Data & Analytics',
		'IoT',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test("Check section titles in 'FAQ' container from the 'Mobile App Development Service' block @Regression @MobileDevService @TSWEB-696", async () => {
	const faqContainer = driver.getByTestId(MobileDevService.Faq);
	const allSectionTitles = await faqContainer.getByTestId(Container.SectionTitle).allInnerTexts();
	const testData = [
		'What technology stack\nworks best for a mobile\napplication?',
		'What does the UX\nbuilding process\nlook like?',
		'Can you build or\nintegrate AR/VR\nsolutions?',
	];

	expect(allSectionTitles.sort()).toEqual(testData.sort());
});

test.afterEach(async () => {
	await driver.closeDrivers();
});