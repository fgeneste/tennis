import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CourtComponentsPage, CourtDeleteDialog, CourtUpdatePage } from './court.page-object';

const expect = chai.expect;

describe('Court e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let courtComponentsPage: CourtComponentsPage;
  let courtUpdatePage: CourtUpdatePage;
  let courtDeleteDialog: CourtDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Courts', async () => {
    await navBarPage.goToEntity('court');
    courtComponentsPage = new CourtComponentsPage();
    await browser.wait(ec.visibilityOf(courtComponentsPage.title), 5000);
    expect(await courtComponentsPage.getTitle()).to.eq('tennisApp.court.home.title');
  });

  it('should load create Court page', async () => {
    await courtComponentsPage.clickOnCreateButton();
    courtUpdatePage = new CourtUpdatePage();
    expect(await courtUpdatePage.getPageTitle()).to.eq('tennisApp.court.home.createOrEditLabel');
    await courtUpdatePage.cancel();
  });

  it('should create and save Courts', async () => {
    const nbButtonsBeforeCreate = await courtComponentsPage.countDeleteButtons();

    await courtComponentsPage.clickOnCreateButton();
    await promise.all([courtUpdatePage.numeroSelectLastOption(), courtUpdatePage.reservationSelectLastOption()]);
    await courtUpdatePage.save();
    expect(await courtUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await courtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Court', async () => {
    const nbButtonsBeforeDelete = await courtComponentsPage.countDeleteButtons();
    await courtComponentsPage.clickOnLastDeleteButton();

    courtDeleteDialog = new CourtDeleteDialog();
    expect(await courtDeleteDialog.getDialogTitle()).to.eq('tennisApp.court.delete.question');
    await courtDeleteDialog.clickOnConfirmButton();

    expect(await courtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
