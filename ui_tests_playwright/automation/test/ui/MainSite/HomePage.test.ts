import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Container from '../../../identifiers/Container';
import HomePage from '../../../identifiers/MainSite/pages/HomePage';
import {ClutchReviewLinks} from '../../../preconditionsData/Links/ClutchReviewLinks';
import UrlProvider from '../../../providers/UrlProvider';
import {driver} from '../../../base/driver/Driver';
import {linkedInReviewLinks} from '../../../preconditionsData/Links/linkedInReviewLinks';
import UrlPath from '../../../providers/UrlPath';
import MainSiteButtons from '../../../identifiers/MainSite/MainSiteButtons';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.webSiteUrl());
});

test("Check the header from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const info = driver.getByTestId(HomePage.Info);
	await expect(info.getByTestId(Container.Title)).toHaveText('Make\nan impact');
});

test("Check the container title and number from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	await expect(driver.getByTestId(HomePage.IndustriesWeServe).getByTestId(Container.ContainerTitle)).toHaveText(
		'Industries we serve'
	);
	await expect(driver.getByTestId(HomePage.IndustriesWeServe).getByTestId(Container.ContainerNumber)).toHaveText(
		'01'
	);

	await expect(driver.getByTestId(HomePage.WhatWeDo).getByTestId(Container.ContainerTitle)).toHaveText('What we do');
	await expect(driver.getByTestId(HomePage.WhatWeDo).getByTestId(Container.ContainerNumber)).toHaveText('02');

	await expect(driver.getByTestId(HomePage.PartnerTestimonials).getByTestId(Container.ContainerTitle)).toHaveText(
		'Partner testimonials'
	);
	await expect(driver.getByTestId(HomePage.PartnerTestimonials).getByTestId(Container.ContainerNumber)).toHaveText(
		'03'
	);

	await expect(driver.getByTestId(HomePage.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies'
	);
	await expect(driver.getByTestId(HomePage.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText('04');

	await expect(driver.getByTestId(HomePage.OurPartners).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our partners'
	);
	await expect(driver.getByTestId(HomePage.OurPartners).getByTestId(Container.ContainerNumber)).toHaveText('06');

	await expect(driver.getByTestId(HomePage.CompanyInsights).getByTestId(Container.ContainerTitle)).toHaveText(
		'Company insights'
	);
	await expect(driver.getByTestId(HomePage.CompanyInsights).getByTestId(Container.ContainerNumber)).toHaveText('07');
});

test("Check section titles in 'Industries we serve' block from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const industriesWeServe = driver.getByTestId(HomePage.IndustriesWeServe);
	const allBlockTitles = industriesWeServe.getByTestId(Container.BlockTitle);
	const testData = ['Healthcare', 'Transportation and Logistics', 'Renewable Energy'];

	await expect(allBlockTitles).toHaveText(testData);
});

test("Check redirects by arrows in 'Industries we serve' block from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const industriesServicesContainer = driver.getByTestId(HomePage.IndustriesWeServe);
	const containerSection = industriesServicesContainer.getByTestId(Container.ContainerBlock);
	const blockUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.Healthcare)],
		[containerSection.nth(1).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.TransportAndLogist)],
		[containerSection.nth(2).getByTestId(Container.BlockTitle), UrlProvider.urlBuilder(UrlPath.RenewableEnergy)],
	]);

	for (const [block, url] of blockUrlMap) {
		await block.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.webSiteUrl());
	}
});

test("Check section titles in 'What we do' block from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const whatWeDo = driver.getByTestId(HomePage.WhatWeDo);
	const allBlockTitles = whatWeDo.getByTestId(Container.BlockTitle);
	const testData = [
		'Custom Software Development',
		'Cloud & DevOps',
		'Big Data & Analytics',
		'AI & ML',
		'Internet of Things',
		'Mobile Development',
		'UI/UX Design',
		'QA as a Service',
		'Consulting Service',
	];

	await expect(allBlockTitles).toHaveText(testData);
});

test("Check redirects by arrows in 'What we do' block from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const whatWeDoContainer = driver.getByTestId(HomePage.WhatWeDo);
	const containerSection = whatWeDoContainer.getByTestId(Container.ContainerBlock);
	const arrowUrlMap = new Map([
		[containerSection.nth(0).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CustomDev)],
		[containerSection.nth(1).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.CloudDevelopment)],
		[containerSection.nth(2).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.BigData)],
		[containerSection.nth(3).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.AiMl)],
		[containerSection.nth(4).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.InternetOfThings)],
		[containerSection.nth(5).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.MobileDev)],
		[containerSection.nth(6).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.UiUxDesign)],
		[containerSection.nth(7).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.QaAsAServ)],
		[containerSection.nth(8).getByTestId(Container.Arrow), UrlProvider.urlBuilder(UrlPath.ConsultingServ)],
	]);

	for (const [arrow, url] of arrowUrlMap) {
		await arrow.click();
		await baseDriverSteps.checkUrl(url);
		await baseDriverSteps.goToUrl(UrlProvider.webSiteUrl());
	}
});

test("Check redirect by 'LinkedIn Review' button in 'Partner testimonials' block from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

	const linkedInButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.LinkedInReviewArrow).all();

	const linkedInReviewsTab = partnerTestimonialsContainer.getByTestId(MainSiteButtons.LinkedInReviews);
	expect(await linkedInReviewsTab.getAttribute('class')).toContain('active');

	const buttonMap = new Map([
		[linkedInButtons[0], linkedInReviewLinks.GrahamBrown],
		[linkedInButtons[1], linkedInReviewLinks.MackenzieDaisley],
	]);

	for (const [button, url] of buttonMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check redirect by 'Clutch Review' button in 'Partner testimonials' container from the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const partnerTestimonialsContainer = driver.getByTestId(HomePage.PartnerTestimonials);

	const clutchReviewButton = partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviews);
	await clutchReviewButton.click();
	expect(await clutchReviewButton.getAttribute('class')).toContain('active');

	const clutchButtons = await partnerTestimonialsContainer.getByTestId(MainSiteButtons.ClutchReviewArrow).all();

	const buttonMap = new Map([
		[clutchButtons[0], ClutchReviewLinks.MarkBeare],
		[clutchButtons[1], ClutchReviewLinks.DerickDaily],
		[clutchButtons[2], ClutchReviewLinks.DarrenCody],
		[clutchButtons[3], ClutchReviewLinks.AnonymousMedicalDevice],
		[clutchButtons[4], ClutchReviewLinks.AnonymousPeerToPeer],
	]);

	for (const [button, url] of buttonMap) {
		await button.click();
		const newPage = await driver.DriverContext.waitForEvent('page');
		expect(newPage.url()).toContain(url);
		await newPage.close();
	}
});

test("Check 'See All News' button from the 'Company insights' block on the 'Home' page @Regression @HomePage @TSWEB-1006", async () => {
	const companyInsightsblock = driver.getByTestId(HomePage.CompanyInsights);

	await companyInsightsblock.getByTestId(MainSiteButtons.SeeAllNews).click();
	const newPage = await driver.DriverContext.waitForEvent('page');

	expect(newPage.url()).toContain(UrlPath.Blog);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
