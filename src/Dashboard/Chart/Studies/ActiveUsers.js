import BaseWorkbenchStudy from "./BaseWorkbenchStudy";

class ActiveUsers extends BaseWorkbenchStudy {
	name = "Active Users";
	metric = "active_users";

	y_keys = ['unique_addresses', 'unique_senders', 'unique_receivers'];
}

export default ActiveUsers;
