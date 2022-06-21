export default {
  computed: {
    STATE() {
      return {
        enabled: "IŞJEŇ",
        disabled: "ÖÇÜRILEN",
      };
    },
    ROLE_TYPE() {
      return {
        admin: "Admin",
        user: "Ulanyjy",
      };
    },
    GROUP_FILE_TYPE() {
      return {
        ip: "IP",
        record: "TEXT",
      };
    },
    IP_TYPE() {
      return {
        ipv4: "IPv4",
        ipv6: "IPv6",
      };
    },
    RECORD_TYPE() {
      return {
        text: "TEXT",
      };
    },
  },
};

export const StateList = [
  { key: "enabled", value: "IŞJEŇ" },
  { key: "disabled", value: "ÖÇÜRILEN" },
];
export const RoleList = [
  { key: "admin", value: "Admin" },
  { key: "operator", value: "Operator" },
];
export const FileTypeList = [
  { key: "ip", value: "IP" },
  { key: "record", value: "TEXT" },
];
export const IPTypeList = [
  { key: "ipv4", value: "IPv4" },
  { key: "ipv6", value: "IPv6" },
];
export const RecordTypeList = [{ key: "text", value: "TEXT" }];
export const ActionList = [
  { key: "all-actions", value: "" },
  { key: "user-add", value: "user-add" },
  { key: "user-disable", value: "user-disable" },
  { key: "user-enable", value: "user-enable" },
  { key: "user-update", value: "user-update" },
  { key: "user-change-password", value: "user-change-password" },
  { key: "user-delete", value: "user-delete" },
  { key: "pol-group-add", value: "pol-group-add" },
  { key: "pol-group-update", value: "pol-group-update" },
  { key: "pol-group-enable", value: "pol-group-enable" },
  { key: "pol-group-disable", value: "pol-group-disable" },
  { key: "pol-group-delete", value: "pol-group-delete" },
  { key: "pol-group-file-add", value: "pol-group-file-add" },
  { key: "pol-group-file-import", value: "pol-group-file-import" },
  { key: "pol-group-file-enable", value: "pol-group-file-enable" },
  { key: "pol-group-file-disable", value: "pol-group-file-disable" },
  { key: "pol-group-file-delete", value: "pol-group-file-delete" },
  { key: "pol-entity-add", value: "pol-entity-add" },
  { key: "pol-entity-enable", value: "pol-entity-enable" },
  { key: "pol-entity-disable", value: "pol-entity-disable" },
  { key: "pol-entity-delete", value: "pol-entity-delete" },
  { key: "user-auth-add", value: "user-auth-add" },
  {
    key: "user-auth-update-private-data",
    value: "user-auth-update-private-data",
  },
  { key: "user-auth-delete", value: "user-auth-delete" },
  { key: "pol-install-success", value: "pol-install-success" },
  { key: "pol-install-failure", value: "pol-install-failure" },
  { key: "login-success", value: "login-success" },
  { key: "login-failed", value: "login-failed" },
];
