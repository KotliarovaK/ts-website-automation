import { expect, test } from '@playwright/test';
import { driver } from '../../../base/driver/Driver';
import { baseDriverSteps } from '../../../base/step/BaseDriverSteps';
import AboutUs from '../../../identifiers/AboutUs';
import Button from '../../../identifiers/Button';
import UrlProvider from '../../../providers/UrlProvider';

test.beforeEach(async () => {
    await baseDriverSteps.createsNewBrowser();
    await baseDriverSteps.goToUrl(UrlProvider.careerUrl());
    await driver.getByTestId(Button.NavigationTab_AboutUs).click();
});

test("Check the section title and number from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    await expect(driver.getByTestId(AboutUs.WeAreTechstackTitle)).toHaveText('We are \nTechstack');
    await expect(driver.getByTestId(AboutUs.WeAreTechstackNumber)).toHaveText('01');

    await expect(driver.getByTestId(AboutUs.OurHistoryTitle)).toHaveText('Our History');
    await expect(driver.getByTestId(AboutUs.OurHistoryNumber)).toHaveText('02');

    await expect(driver.getByTestId(AboutUs.OurAchievementsTitle)).toHaveText('Our \nAchievements');
    await expect(driver.getByTestId(AboutUs.OurAchievementsNumber)).toHaveText('03');

    await expect(driver.getByTestId(AboutUs.TechstackInGrowsTitle)).toHaveText('Techstack \nin Growth');
    await expect(driver.getByTestId(AboutUs.TechstackInGrowsNumber)).toHaveText('04');

    await expect(driver.getByTestId(AboutUs.TechstackRolesTitle)).toHaveText('Techstack roles');
    await expect(driver.getByTestId(AboutUs.TechstackRolesNumber)).toHaveText('05');

    await expect(driver.getByTestId(AboutUs.EngineeringCultureTitle)).toHaveText('Engineering Culture');
    await expect(driver.getByTestId(AboutUs.EngineeringCultureNumber)).toHaveText('06');

    await expect(driver.getByTestId(AboutUs.SocialResponsibilityTitle)).toHaveText('Social Responsibility');
    await expect(driver.getByTestId(AboutUs.SocialResponsibilityNumber)).toHaveText('07');

    await expect(driver.getByTestId(AboutUs.CandidatePathTitle)).toHaveText('Candidate Path');
    await expect(driver.getByTestId(AboutUs.CandidatePathNumber)).toHaveText('08');
});

test("Check the 'Our History' carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let carousel = driver.getByTestId(AboutUs.OurHistoryCarousel);

    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(0)).toContainText('01 2014');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(1)).toContainText('02 2015');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(2)).toContainText('03 2016');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(3)).toContainText('04 2017');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(4)).toContainText('05 2018');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(5)).toContainText('06 2019');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(6)).toContainText('07 2020');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(7)).toContainText('08 2021');
});

test("Check the 'Candidate Path' carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let carousel = driver.getByTestId(AboutUs.CandidateCarousel);

    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(0)).toContainText('01 CV');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(1)).toContainText('02 Pre-screening');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(2)).toContainText('03 Test task');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(3)).toContainText('04 Tech expert review');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(4)).toContainText('05 Tech expert interview');
    await expect(carousel.getByTestId(AboutUs.CarouselBlock).nth(5)).toContainText('06 Product owner interview');
});

test("Check the 'Techstack roles', 'Engineering Culture' and 'Social Responsibility' blocks from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let techstackRoles = driver.Page.locator(`#${AboutUs.TechstackRolesId}`);

    await expect(techstackRoles.locator(`#${AboutUs.Roles_Mentor}`)).toContainText('Mentor');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_TechExpert}`)).toContainText('Tech Expert');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_PreSaleExpert}`)).toContainText('Pre-Sale Expert');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_TeamLead}`)).toContainText('Team Lead');
    await expect(techstackRoles.locator(`#${AboutUs.Roles_VPofFunction}`)).toContainText('VP of Function');

    let engineeringCulture = driver.Page.locator(`#${AboutUs.EngineeringCultureId}`);

    await expect(engineeringCulture.locator(`#${AboutUs.EC_TechClubs}`)).toContainText('Tech clubs');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_Meetups}`)).toContainText('Meetups');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_TechCompetitions}`)).toContainText('Tech Competitions');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_Library}`)).toContainText('Library');
    await expect(engineeringCulture.locator(`#${AboutUs.EC_LoyaltyProgram}`)).toContainText('Loyalty Program');

    let socialResponsibility = driver.Page.locator(`#${AboutUs.SocialResponsibilityId}`);

    await expect(socialResponsibility.locator(`#${AboutUs.SR_Charity}`)).toContainText('Charity');
    await expect(socialResponsibility.locator(`#${AboutUs.SR_EnvironmentalSafety}`)).toContainText('Environmental Safety');
    await expect(socialResponsibility.locator(`#${AboutUs.SR_EducationSupport}`)).toContainText('Education Support');
});

test("Check the 'Apply' block from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    await expect(driver.locator(`#${AboutUs.ApplyTitle}`)).toContainText('Would you like to be a part of our team?');
    
    await driver.getByTestId(AboutUs.ApplyNowButton).click();
    await baseDriverSteps.checkUrl(UrlProvider.careerUrl());
});

test("Check the buttons of the photo carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let engineeringCultureCarousel = driver.getByTestId(AboutUs.EngineeringCultureCarousel);
    let engineeringCulturePrevButton = engineeringCultureCarousel.getByTestId(AboutUs.CarouselPrevButton);
    let engineeringCultureNextButton = engineeringCultureCarousel.getByTestId(AboutUs.CarouselNextButton);

    await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'true');
    await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'false');

    await engineeringCultureNextButton.click();

    await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'false');

    let engineeringCultureCounter = 0;
    while (engineeringCultureCounter < 3) {
        await engineeringCultureNextButton.click();
        engineeringCultureCounter++;
    }

    await expect(engineeringCulturePrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(engineeringCultureNextButton).toHaveAttribute('data-disabled', 'true');

    let socialResponsibilityCarousel = driver.getByTestId(AboutUs.SocialResponsibilityCarousel);
    let socialResponsibilityPrevButton = socialResponsibilityCarousel.getByTestId(AboutUs.CarouselPrevButton);
    let socialResponsibilityNextButton = socialResponsibilityCarousel.getByTestId(AboutUs.CarouselNextButton);

    await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'true');
    await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'false');

    await socialResponsibilityNextButton.click();

    await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'false');

    let socialResponsibilityCounter = 0;
    while (socialResponsibilityCounter < 3) {
        await socialResponsibilityNextButton.click();
        socialResponsibilityCounter++;
    }

    await expect(socialResponsibilityPrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(socialResponsibilityNextButton).toHaveAttribute('data-disabled', 'true');
});

test("Check the buttons of the info carousel from the 'AboutUs' block @Regression @AboutUs @TSWEB-150", async () => {
    let ourHistoryCarousel = driver.getByTestId(AboutUs.OurHistoryCarousel);
    let ourHistotyPrevButton = ourHistoryCarousel.getByTestId(AboutUs.CarouselPrevButton);
    let ourHistoryNextButton = ourHistoryCarousel.getByTestId(AboutUs.CarouselNextButton);

    await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'true');
    await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'false');

    await ourHistoryNextButton.click();

    await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'false');

    let ourHistoryCounter = 0;
    while (ourHistoryCounter < 6) {
        await ourHistoryNextButton.click();
        ourHistoryCounter++;
    }

    await expect(ourHistotyPrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(ourHistoryNextButton).toHaveAttribute('data-disabled', 'true');

    let candidateCarousel = driver.getByTestId(AboutUs.CandidateCarousel);
    let candidatePrevButton = candidateCarousel.getByTestId(AboutUs.CarouselPrevButton);
    let candidateNextButton = candidateCarousel.getByTestId(AboutUs.CarouselNextButton);

    await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'true');
    await expect(candidateNextButton).toHaveAttribute('data-disabled', 'false');

    await candidateNextButton.click();

    await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(candidateNextButton).toHaveAttribute('data-disabled', 'false');

    let candidateCounter = 0;
    while (candidateCounter < 4) {
        await candidateNextButton.click();
        candidateCounter++;
    }

    await expect(candidatePrevButton).toHaveAttribute('data-disabled', 'false');
    await expect(candidateNextButton).toHaveAttribute('data-disabled', 'true');
});


test.afterEach(async () => {
    await driver.closeDrivers();
});