import { Accounts, AccountsCommon, AccountsServer } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

/*
// refresh the page on login
Accounts.onLogin(function(){
  location.refresh();
});

// refresh the page on logout
Accounts.onLogout(function(){
  location.refresh();
});
*/