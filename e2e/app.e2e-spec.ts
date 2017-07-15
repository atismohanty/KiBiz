import { MyAngularPage } from './app.po';

describe('my-angular App', () => {
  let page: MyAngularPage;

  beforeEach(() => {
    page = new MyAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
