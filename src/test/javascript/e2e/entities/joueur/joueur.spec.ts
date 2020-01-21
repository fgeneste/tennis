import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JoueurComponentsPage, JoueurDeleteDialog, JoueurUpdatePage } from './joueur.page-object';

const expect = chai.expect;

describe('Joueur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let joueurComponentsPage: JoueurComponentsPage;
  let joueurUpdatePage: JoueurUpdatePage;
  let joueurDeleteDialog: JoueurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Joueurs', async () => {
    await navBarPage.goToEntity('joueur');
    joueurComponentsPage = new JoueurComponentsPage();
    await browser.wait(ec.visibilityOf(joueurComponentsPage.title), 5000);
    expect(await joueurComponentsPage.getTitle()).to.eq('tennisApp.joueur.home.title');
  });

  it('should load create Joueur page', async () => {
    await joueurComponentsPage.clickOnCreateButton();
    joueurUpdatePage = new JoueurUpdatePage();
    expect(await joueurUpdatePage.getPageTitle()).to.eq('tennisApp.joueur.home.createOrEditLabel');
    await joueurUpdatePage.cancel();
  });

  it('should create and save Joueurs', async () => {
    const nbButtonsBeforeCreate = await joueurComponentsPage.countDeleteButtons();

    await joueurComponentsPage.clickOnCreateButton();
    await promise.all([
      joueurUpdatePage.setPrenomInput('prenom'),
      joueurUpdatePage.setNomInput('nom'),
      joueurUpdatePage.setLoginInput('login'),
      joueurUpdatePage.reservationSelectLastOption()
    ]);
    expect(await joueurUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await joueurUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await joueurUpdatePage.getLoginInput()).to.eq('login', 'Expected Login value to be equals to login');
    await joueurUpdatePage.save();
    expect(await joueurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await joueurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Joueur', async () => {
    const nbButtonsBeforeDelete = await joueurComponentsPage.countDeleteButtons();
    await joueurComponentsPage.clickOnLastDeleteButton();

    joueurDeleteDialog = new JoueurDeleteDialog();
    expect(await joueurDeleteDialog.getDialogTitle()).to.eq('tennisApp.joueur.delete.question');
    await joueurDeleteDialog.clickOnConfirmButton();

    expect(await joueurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
