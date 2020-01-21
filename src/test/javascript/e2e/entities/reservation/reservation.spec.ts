import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReservationComponentsPage, ReservationDeleteDialog, ReservationUpdatePage } from './reservation.page-object';

const expect = chai.expect;

describe('Reservation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reservationComponentsPage: ReservationComponentsPage;
  let reservationUpdatePage: ReservationUpdatePage;
  let reservationDeleteDialog: ReservationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reservations', async () => {
    await navBarPage.goToEntity('reservation');
    reservationComponentsPage = new ReservationComponentsPage();
    await browser.wait(ec.visibilityOf(reservationComponentsPage.title), 5000);
    expect(await reservationComponentsPage.getTitle()).to.eq('tennisApp.reservation.home.title');
  });

  it('should load create Reservation page', async () => {
    await reservationComponentsPage.clickOnCreateButton();
    reservationUpdatePage = new ReservationUpdatePage();
    expect(await reservationUpdatePage.getPageTitle()).to.eq('tennisApp.reservation.home.createOrEditLabel');
    await reservationUpdatePage.cancel();
  });

  it('should create and save Reservations', async () => {
    const nbButtonsBeforeCreate = await reservationComponentsPage.countDeleteButtons();

    await reservationComponentsPage.clickOnCreateButton();
    await promise.all([
      reservationUpdatePage.courtSelectLastOption(),
      reservationUpdatePage.joueurSelectLastOption(),
      reservationUpdatePage.horaireSelectLastOption()
    ]);
    await reservationUpdatePage.save();
    expect(await reservationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reservationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reservation', async () => {
    const nbButtonsBeforeDelete = await reservationComponentsPage.countDeleteButtons();
    await reservationComponentsPage.clickOnLastDeleteButton();

    reservationDeleteDialog = new ReservationDeleteDialog();
    expect(await reservationDeleteDialog.getDialogTitle()).to.eq('tennisApp.reservation.delete.question');
    await reservationDeleteDialog.clickOnConfirmButton();

    expect(await reservationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
