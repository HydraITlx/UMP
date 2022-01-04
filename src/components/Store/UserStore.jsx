import { extendObservable } from "mobx";

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: false,
      isLoggedIn: false,
      username: "",
      usertoken: "",
      show: false,
      users: [],
      showError: false,
      showWarning: false,
      isAdmin: false,
    });
  }
}
export default new UserStore();
