export const getButtonsEventList = (settings) => (
  [
    {
      rootSection: settings.signinForm,
      identifier: '.form__redirect-link',
      action: 'click',
      effect: () => {
        settings.signinFormInstance.hide();
        settings.signupFormInstance.show();
      },
    },
    {
      rootSection: settings.signupForm,
      identifier: '.form__redirect-link',
      action: 'click',
      effect: () => {
        settings.signupFormInstance.hide();
        settings.signinFormInstance.show();
      },
    },
    {
      identifier: '.header__menu-icon',
      action: 'click',
      effect: () => {
        settings.mobileMenu.classList.remove('mobile-menu_invisible');
      },
    },
    {
      identifier: '.close-icon_type_mobile',
      action: 'click',
      effect: () => {
        settings.mobileMenu.classList.add('mobile-menu_invisible');
      },
    },
    {
      identifier: '.close-icon_type_screen',
      action: 'click',
      effect: () => {
        settings.popupInstance.hide();
        settings.signupFormInstance.hide();
      },
    },
    {
      identifier: '.close-icon_type_mobile',
      action: 'click',
      effect: () => {
        settings.popupInstance.hide();
        settings.signinForm.classList.remove('form_active');
      },
    },
    {
      identifier: '.search__button',
      target: null,
      action: 'click',
      effect: () => {
        console.log('search__button');
      },
    },
  ]
);

export const getButtonsLazyEventList = (settings) => (
  [
    {
      identifier: '#button-logout-screen',
      action: 'click',
      effect: () => {
        localStorage.removeItem('token');
        settings.headerScreenNavigation.render();
      },
    },
    {
      identifier: '#button-logout-mobile',
      action: 'click',
      effect: () => {
        localStorage.removeItem('token');
        settings.headerMobileNavigation.render();
      },
    },
    {
      identifier: '#button-login-screen',
      action: 'click',
      effect: () => {
        settings.popupInstance.show();
        settings.signinFormInstance.show();
      },
    },
    {
      identifier: '#button-login-mobile',
      action: 'click',
      effect: () => {
        settings.popupInstance.show();
        settings.signinFormInstance.show();
      },
    },
  ]
);
