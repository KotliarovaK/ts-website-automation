import {Locator, expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../base/driver/Driver';
import UrlProvider from '../../../../providers/UrlProvider';
import UrlPath from '../../../../providers/UrlPath';
import {Environment} from '../../../../providers/EnvProvider';
import Buttons from '../../../../identifiers/Buttons';
import Colors from '../../../../preconditionsData/Colors';
import {companyUrl, industriesUrl, serviceUrl} from '../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../enum/ServicesEnum';
import {CompanyEnum} from '../../../../enum/CompanyEnum';
import {AuthorsEnum} from '../../../../enum/AuthorsEnum';
import {IndustriesEnum} from '../../../../enum/IndustriesEnum';

const testDataProvider: string[] = [
	UrlProvider.webSiteUrl(),
	UrlProvider.urlBuilder(UrlPath.ContactUs),
	UrlProvider.urlBuilder(UrlPath.OpenCase),
	UrlProvider.urlBuilder(UrlPath.ArticlePageDescription),
	UrlProvider.urlBuilder(UrlPath.AuthorPage + AuthorsEnum.VitaliiDolotov),
	companyUrl[CompanyEnum.AboutUs],
	companyUrl[CompanyEnum.HowWeWork],
	companyUrl[CompanyEnum.CaseStudies],
	companyUrl[CompanyEnum.Blog],
].concat(Object.values(serviceUrl));

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowser();
});

for (const url of testDataProvider) {
	test(`Check the redirection to the main page by clicking on the TS logo in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.HeaderLogo).click();
		await baseDriverSteps.checkUrl(UrlProvider.webSiteUrl());
	});

	test(`Hovering the mouse over the menu buttons highlights the buttons text in #FFC600 color in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		await driver.getByTestId(Buttons.Menu).click();
		const menuHeaderslist: Locator[] = [
			driver.getByTestId(Button.Menu_Industries),
			driver.getByTestId(Buttons.Menu_Services),
			driver.getByTestId(Buttons.Menu_Company),
			driver.getByTestId(Buttons.Menu_ContactUs),
		];

		for (const header of menuHeaderslist) {
			await driver.executeFunc(async () => {
				await header.hover();
				const color = await header.evaluate((node) => {
					return window.getComputedStyle(node).getPropertyValue('color');
				});
				expect(color).toBe(Colors.FFC600);
			}, 5);
		}
	});

	test(`Check the redirection for the Services block in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const servicesList = new Map([
			[Buttons.Services_OurServices, serviceUrl[ServicesEnum.OurServices]],
			[Buttons.Services_CustomDev, serviceUrl[ServicesEnum.CustomDev]],
			[Buttons.Services_CloudAndDev, serviceUrl[ServicesEnum.CloudAndDev]],
			[Buttons.Services_BigData, serviceUrl[ServicesEnum.BigData]],
			[Buttons.Services_AiMl, serviceUrl[ServicesEnum.AiMl]],
			[Buttons.Services_InternetOfThings, serviceUrl[ServicesEnum.InternetOfThings]],
			[Buttons.Services_MobileDev, serviceUrl[ServicesEnum.MobileDev]],
			[Buttons.Services_UiUxDesign, serviceUrl[ServicesEnum.UiUxDesign]],
			[Buttons.Services_QaAsAServ, serviceUrl[ServicesEnum.QaAsAServ]],
			[Buttons.Services_ConsultingServ, serviceUrl[ServicesEnum.ConsultingServ]],
		]);

		for (const [element, serviceUrl] of servicesList) {
			await driver.getByTestId(Buttons.Menu).click();
			await driver.getByTestId(Buttons.Menu_Services).click();
			await driver.getByTestId(element).click();
			await baseDriverSteps.checkUrl(serviceUrl);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Company block in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const companyList = new Map([
			[Buttons.Company_AboutUs, companyUrl[CompanyEnum.AboutUs]],
			[Buttons.Company_HowWeWork, companyUrl[CompanyEnum.HowWeWork]],
			[Buttons.Company_Career, UrlProvider.careerUrl(Environment.Production)],
			[Buttons.Company_CaseStudies, companyUrl[CompanyEnum.CaseStudies]],
			[Buttons.Company_Blog, companyUrl[CompanyEnum.Blog]],
		]);

		for (const [element, companyUrl] of companyList) {
			await driver.getByTestId(Buttons.Menu).click();
			await driver.getByTestId(Buttons.Menu_Company).click();
			await driver.getByTestId(element).click();
			await baseDriverSteps.checkUrl(companyUrl);
			await baseDriverSteps.goToUrl(url);
		}
	});

	test(`Check the redirection for the Industries block in the 'Header' on the '${url}' link @Regression @Header @TSWEB-656`, async () => {
		await baseDriverSteps.goToUrl(url);
		const industriesList = new Map([
			[Button.Industries_Healthcare, industriesUrl[IndustriesEnum.Healthcare]],
			[Button.Industries_TransportationAndLogistics, industriesUrl[IndustriesEnum.TransportAndLogist]],
			[Button.Industries_RenewableEnergy, industriesUrl[IndustriesEnum.RenewableEnergy]],
		]);

		for (const [element, industriesUrl] of industriesList) {
			await driver.getByTestId(Button.Menu).click();
			await driver.getByTestId(Button.Menu_Industries).click();
			await driver.getByTestId(element).click();
			await baseDriverSteps.checkUrl(industriesUrl);
			await baseDriverSteps.goToUrl(url);
		}
	});
}

test.afterEach(async () => {
	await driver.closeDrivers();
});
