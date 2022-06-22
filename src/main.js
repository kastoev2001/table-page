import TablePresenter from './presenter/table-presenter';
import ApiService from './api-service';
import MembersModel from './model/members-model';

const TABLE_CLASS = '.table-page';

const tableElement = document.querySelector(TABLE_CLASS);

const membersModel = new MembersModel(new ApiService());

const tablePresenter = new TablePresenter(tableElement, membersModel);

tablePresenter.init();

membersModel.init();