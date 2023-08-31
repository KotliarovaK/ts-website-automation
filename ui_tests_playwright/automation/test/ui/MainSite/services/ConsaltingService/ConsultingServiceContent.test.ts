import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../../../base/step/BaseDriverSteps';
import {driver} from '../../../../../base/driver/Driver';
import Container from '../../../../../identifiers/Container';
import ConsultingService from '../../../../../identifiers/MainSite/pages/services/ConsultingService';
import {serviceUrl} from '../../../../../preconditionsData/UrlPreconditions';
import {ServicesEnum} from '../../../../../enum/ServicesEnum';
import MainSiteButtons from '../../../../../identifiers/MainSite/MainSiteButtons';
import {ExpertNames} from '../../../../../preconditionsData/ExpertNames';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(serviceUrl[ServicesEnum.ConsultingServ]);
});

test("Check the header from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const info = driver.getByTestId(ConsultingService.Info);
	await expect(info.getByTestId(Container.Breadcrumbs)).toHaveText('Our Services\nConsulting Service');
	await expect(info.getByTestId(Container.Title)).toHaveText('Software Consulting\nServices');
});

test("Check 'Request a Quote' buttons on the 'Consulting service' page @Regression @ConsultingService @TSWEB-697", async () => {
	const containers = [ConsultingService.Info, ConsultingService.ConsultingProcess, ConsultingService.RelatedServices];

	for (const container of containers) {
		expect(driver.getByTestId(container).getByTestId(MainSiteButtons.RequestAQuote)).toBeVisible();
	}
});

test("Check the container title and number from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	await expect(
		driver
			.getByTestId(ConsultingService.InformationTechnologyConsultingServices)
			.getByTestId(Container.ContainerTitle)
	).toHaveText('Information technology consulting services');
	await expect(
		driver
			.getByTestId(ConsultingService.InformationTechnologyConsultingServices)
			.getByTestId(Container.ContainerNumber)
	).toHaveText('01');

	await expect(
		driver.getByTestId(ConsultingService.ConsultingBenefits).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting benefits');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingBenefits).getByTestId(Container.ContainerNumber)
	).toHaveText('02');

	await expect(
		driver.getByTestId(ConsultingService.OurITConsultingServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Our IT consulting services');
	await expect(
		driver.getByTestId(ConsultingService.OurITConsultingServices).getByTestId(Container.ContainerNumber)
	).toHaveText('03');

	await expect(
		driver.getByTestId(ConsultingService.DevelopmentProcessAudit).getByTestId(Container.ContainerTitle)
	).toHaveText('Development process audit');

	await expect(driver.getByTestId(ConsultingService.SoftwareAudit).getByTestId(Container.ContainerTitle)).toHaveText(
		'Software audit'
	);

	await expect(
		driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting process');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingProcess).getByTestId(Container.ContainerNumber)
	).toHaveText('04');

	await expect(
		driver.getByTestId(ConsultingService.ConsultingExperts).getByTestId(Container.ContainerTitle)
	).toHaveText('Consulting experts');
	await expect(
		driver.getByTestId(ConsultingService.ConsultingExperts).getByTestId(Container.ContainerNumber)
	).toHaveText('05');

	await expect(driver.getByTestId(ConsultingService.CaseStudies).getByTestId(Container.ContainerTitle)).toHaveText(
		'Case studies'
	);
	await expect(driver.getByTestId(ConsultingService.CaseStudies).getByTestId(Container.ContainerNumber)).toHaveText(
		'06'
	);

	await expect(driver.getByTestId(ConsultingService.OurApproach).getByTestId(Container.ContainerTitle)).toHaveText(
		'Our approach'
	);
	await expect(driver.getByTestId(ConsultingService.OurApproach).getByTestId(Container.ContainerNumber)).toHaveText(
		'07'
	);

	await expect(driver.getByTestId(ConsultingService.WeMakeAnImpact).getByTestId(Container.ContainerTitle)).toHaveText(
		'We make an impact'
	);
	await expect(
		driver.getByTestId(ConsultingService.WeMakeAnImpact).getByTestId(Container.ContainerNumber)
	).toHaveText('08');

	await expect(
		driver.getByTestId(ConsultingService.RelatedServices).getByTestId(Container.ContainerTitle)
	).toHaveText('Related \nServices');
	await expect(
		driver.getByTestId(ConsultingService.RelatedServices).getByTestId(Container.ContainerNumber)
	).toHaveText('09');

	await expect(driver.getByTestId(ConsultingService.Faq).getByTestId(Container.ContainerTitle)).toHaveText('FAQ');
	await expect(driver.getByTestId(ConsultingService.Faq).getByTestId(Container.ContainerNumber)).toHaveText('10');

	await expect(
		driver.getByTestId(ConsultingService.RelatedArticles).getByTestId(Container.ContainerTitle)
	).toHaveText('Related Articles');
	await expect(
		driver.getByTestId(ConsultingService.RelatedArticles).getByTestId(Container.ContainerNumber)
	).toHaveText('11');
});

test("Check section numbers and section titles in 'Information technology consulting services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const informationTechnologyConsultingServicesContainer = driver.getByTestId(
		ConsultingService.InformationTechnologyConsultingServices
	);
	const allSectionTitles = informationTechnologyConsultingServicesContainer.getByTestId(Container.SectionTitle);
	const testData = ['Infrastructure', 'Process audit', 'CI/CD roadmap', 'Testing strategy', 'UX analysis'];

	await expect(allSectionTitles).toHaveText(testData);
	await expect(informationTechnologyConsultingServicesContainer.getByTestId(Container.SectionNumber)).toHaveText([
		'01',
		'02',
		'03',
		'04',
		'05',
	]);
});

test("Check section titles in 'Consulting benefits' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingBenefitsContainer = driver.getByTestId(ConsultingService.ConsultingBenefits);
	const allSectionTitles = consultingBenefitsContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Eliminate waste of effort and focus on value;',
		'Minimize technical debt;',
		'Improve code quality and release a quality product;',
		'Improve motivation and engineering culture;',
		'Optimize infrastructure costs;',
		'Remove production issues and keep the environment stable.',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'Development process audit' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const developmentProcessAuditContainer = driver.getByTestId(ConsultingService.DevelopmentProcessAudit);
	const allSectionTitles = developmentProcessAuditContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Project management\nprocess',
		'Development\nprocess',
		'Release process /\nIntegration layer',
		'QA\nprocess',
		'Business analytics\nprocess',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'Software audit' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const softwareAuditContainer = driver.getByTestId(ConsultingService.SoftwareAudit);
	const allSectionTitles = softwareAuditContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Architecture',
		'AWS',
		'Code quality',
		'Security',
		'UX / UI',
		'Testing artifacts',
		'Database and data model',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check member names and roles in 'Consulting experts' container from the 'Consulting Service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const consultingExpertsContainer = driver.getByTestId(ConsultingService.ConsultingExperts);
	const allMemberRoles = consultingExpertsContainer.getByTestId(Container.MemberRole);
	const testDataRoles = [
		'CEO, Software Architect,\nRuns critical initiatives that make products grow',
		'CTO, Software Architect,\nElaborates on the technology strategy',
		'R&D Engineer, Software Engineering Lead,\nYevhenii will advise the best custom solution',
		'Sr. Director of Quality Engineering,\nOversees technology-related initiatives',
		'VP of Engineering,\nFull-stack development and microservices expert',
		'Chief Creative Officer,\nAligns UX with users’ needs / business goals',
		'Head of Account Management,\nDrives cross-functional process transformation',
	];

	await expect(allMemberRoles).toHaveText(testDataRoles);

	const allMemberNames = consultingExpertsContainer.getByTestId(Container.MemberName);
	const testDataNames = [
		ExpertNames.IvanIeremenko,
		ExpertNames.OleksiiSvystun,
		ExpertNames.YevheniiKarachevtsev,
		ExpertNames.VitaliiDolotov,
		ExpertNames.IvanYeremenko,
		ExpertNames.DmytroDytiuk,
		ExpertNames.DmytroShtapauk,
	];

	await expect(allMemberNames).toHaveText(testDataNames);
});

test("Check section titles in 'Related Services' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const relatedServicesContainer = driver.getByTestId(ConsultingService.RelatedServices);
	const allSectionTitles = relatedServicesContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'UX/UI Design',
		'QA as a Service',
		'Mobile \ndevelopment',
		'Custom software \ndevelopment',
		'AI & ML',
		'Big Data & Analytics',
		'IoT',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles in 'FAQ' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const faqContainer = driver.getByTestId(ConsultingService.Faq);
	const allSectionTitles = faqContainer.getByTestId(Container.SectionTitle);
	const testData = [
		'Why are consulting services\nnecessary for business?',
		'Who are the consultants\nand what will they do?',
		'Why can Techstack provide\nconsulting services to\ntechnology businesses?',
		'What types of companies\nbenefit from consulting\nthe most?',
		'What types of audits\ndo we offer?',
	];

	await expect(allSectionTitles).toHaveText(testData);
});

test("Check section titles and award cards in 'We make an impact' container from the 'Consulting service' block @Regression @ConsultingService @TSWEB-697", async () => {
	const weMakeAnImpactContainer = driver.getByTestId(ConsultingService.WeMakeAnImpact);
	const allSectionTitles = weMakeAnImpactContainer.getByTestId(Container.SectionTitle);
	const testData = ['Retain clients', 'Improve\nperformance', 'Aim for quality'];

	await expect(allSectionTitles).toHaveText(testData);

	const awardCards = weMakeAnImpactContainer.getByTestId(Container.AwardCard);
	const numberOfCards = 6;
	await baseDriverSteps.checkImagesVisibility(awardCards, numberOfCards);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
