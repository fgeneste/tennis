import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HoraireComponentsPage, HoraireDeleteDialog, HoraireUpdatePage } from './horaire.page-object';

const expect = chai.expect;

describe('Horaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let horaireComponentsPage: HoraireComponentsPage;
  let horaireUpdatePage: HoraireUpdatePage;
  let horaireDeleteDialog: HoraireDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Horaires', async () => {
    await navBarPage.goToEntity('horaire');
    horaireComponentsPage = new HoraireComponentsPage();
    await browser.wait(ec.visibilityOf(horaireComponentsPage.title), 5000);
    expect(await horaireComponentsPage.getTitle()).to.eq('tennisApp.horaire.home.title');
  });

  it('should load create Horaire page', async () => {
    await horaireComponentsPage.clickOnCreateButton();
    horaireUpdatePage = new HoraireUpdatePage();
    expect(await horaireUpdatePage.getPageTitle()).to.eq('tennisApp.horaire.home.createOrEditLabel');
    await horaireUpdatePage.cancel();
  });

  it('should create and save Horaires', async () => {
    const nbButtonsBeforeCreate = await horaireComponentsPage.countDeleteButtons();

    await horaireComponentsPage.clickOnCreateButton();
    await promise.all([
      horaireUpdatePage.setJourInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      horaireUpdatePage.reservationSelectLastOption()
    ]);
    expect(await horaireUpdatePage.getJourInput()).to.contain('2001-01-01T02:30', 'Expected jour value to be equals to 2000-12-31');
    await horaireUpdatePage.save();
    expect(await horaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await horaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Horaire', async () => {
    const nbButtonsBeforeDelete = await horaireComponentsPage.countDeleteButtons();
    await horaireComponentsPage.clickOnLastDeleteButton();

    horaireDeleteDialog = new HoraireDeleteDialog();
    expect(await horaireDeleteDialog.getDialogTitle()).to.eq('tennisApp.horaire.delete.question');
    await horaireDeleteDialog.clickOnConfirmButton();

    expect(await horaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
