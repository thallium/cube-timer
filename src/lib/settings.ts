export type Setting = "remoteDB";

export function getSetting(setting: Setting) {
  return localStorage.getItem(setting);
}

export function setSetting(setting: Setting, value: string) {
  localStorage.setItem(setting, value);
}
