/****************** Settings bgn *******************/
const __VEINS = {
  TITLE: 'Veins',     // 表示名
  HOST: '?????',      // b00-ve001ac.shyme.net などサーバーのホスト名
  MY_NUMBER: '?????', // 発信元となる自分の電話番号
  LINE_ID: ?????,     // Veins で当該 TOKEN のユーザにて発信に使用可能な回線番号のID
  TOKEN: '?????'      // Veins にて発行した有効期限内の USR TOKEN
};
/****************** Settings end *******************/

/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/
/************************************/

const onOpen = (e) => { __veins_onOpen(e); };const __veins_URL = `https://api.${__VEINS.HOST}/v1/edges/xout`;const __veins_emptyContent = '（空のセル）';const __veins_sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();const __veins_getSelectedCellValue = () => {const range = __veins_sheet.getActiveCell();const cellValue = range.getValue();return cellValue || __veins_emptyContent;};const __veins_runEdgesXout = (number) => {if (number === __veins_emptyContent) { return false; };let cleaned = number.replace(/[\s\u3000]/g, '');cleaned = cleaned.replace(/[\-\u2010\u2013\u2014\u2212\uff0d]/g, '');const isValid = /^[0-9]{10,}$/.test(cleaned);if (!isValid) { return false; };const payload = {"from_ln_id": __VEINS.LINE_ID,"from_number": __VEINS.MY_NUMBER,"from_rm_id": 0,"from_timeout": 30,"from_type": 1,"from_ws_id": 0,"to_ln_id": __VEINS.LINE_ID,"to_number": cleaned,"to_rm_id": 0,"to_timeout": 30,"to_type": 1,"to_ws_id": 0};const options = {method: 'post',contentType: 'application/json',headers: {'accept': 'application/json','Authorization': `Bearer ${__VEINS.TOKEN}`,'Content-Type': 'application/json'},payload: JSON.stringify(payload)};try {const response = UrlFetchApp.fetch(__veins_URL, options);Logger.log(`API Response: ${response.getContentText()}`);return true;} catch (err) {Logger.log(`Error: ${err.toString()}`);return false;};};const __veins_onOpen = (e) => { const ui = SpreadsheetApp.getUi(); ui.createMenu(__VEINS.TITLE).addItem('起動する', '__veins_showSidebar').addToUi(); };const __veins_showSidebar = () => { const sidebarUi = HtmlService.createHtmlOutputFromFile('sidebar').setTitle(__VEINS.TITLE); SpreadsheetApp.getUi().showSidebar(sidebarUi); };