# Veins
NOTE: 下記にて使用されているデータ型については、**[コチラ](./src/model/VeinsModel.ts)** をご参照・ご利用ください。

## Veins 内で外部から注入可能なデータ
### 電話回線
#### 注入例（直接指定）
```
const v = window.Veins
v.putPhoneLines(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, [
    { id: 1, name: 'みかん回線', number: '0311112222' },
    { id: 2, name: 'りんご回線', number: '0611112222' },
    { id: 3, name: 'ばなな回線', number: '05011112222' }
])
```
#### 注入例（取得API指定）
```
const v = window.Veins
const url = 'https://raw.githubusercontent.com/t-kawata/assets/master/json/veins/line_items.json'
v.putPhoneLinesByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, {})
```
Token 認証の必要がある場合は、以下のように Authorization ヘッダーを指定します。
```
〜〜〜〜〜
const header = { Authorization: 'Bearer YOUR-TOKEN' }
v.putPhoneLinesByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, header)
```
#### データ形式（以下の interface の配列）
```
export interface VeinsPhoneLine {
    id: number
    name: string
    number: string
}
```
#### Veins Phone 内での電話回線情報の扱い
- SIP モードで使用する場合、電話回線情報は、Veins Phone が担う範囲における電話通信内部で使用されることはありません。  
- VEINS モードで使用する場合、注入した電話回線のうち、現在選択されている回線を用いた通信を Veins PBX に指示します。
- 従って、VEINS モードで使用する場合に注入する電話回線情報は、Veins PBX から発行した回線情報と一致する必要があることに注意してください。
- SIP モード 及び VEINS モード のどちらで利用しても、以下の SIP Header を付与した INVITE がリクエストされます。
```
X-VEINS-LINE_ID     = 選択されている回線の VeinsPhoneLine.id
X-VEINS-LINE_NUMBER = 選択されている回線の VeinsPhoneLine.number
```
- 付与された SIP Header は、SIP サーバーにて受け取りが可能です。
- 例として Asterisk Dialplan での取得方法を以下に示します。
```
exten => _X.,1,Noop(${EXTEN})
 same =>     n,Set(LINE_ID=${PJSIP_HEADER(read,X-VEINS-LINE_ID)})
 same =>     n,Set(LINE_NUMBER=${PJSIP_HEADER(read,X-VEINS-LINE_NUMBER)})
```
### 電話帳
- id フィールドの最初の数字は、ユニークな数字とすること
#### 注入例（直接指定）
```
const v = window.Veins
v.putPhoneBookItems(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, [
    { "id": "1-5-3-0", "name": "山田太郎", "number": "00000000002", "on": true, "disables": {} },
    { "id": "2-5-4-0", "name": "鈴木一郎", "number": "00000000003", "on": true, "disables": {} },
    { "id": "3-5-5-0", "name": "佐々木花子", "number": "00000000004", "on": true, "disables": {} },
    { "id": "4-1-0-1", "name": "川田敏巳01", "number": "08012349876", "disables": {} },
    { "id": "5-1-0-1", "name": "川田敏巳02", "number": "09098761234", "disables": {} },
    { "id": "6-2-1-0", "name": "Workspace01", "number": "00000000001", "disables": {} },
    { "id": "7-3-1-0", "name": "Room01", "number": "00000000001", "disables": {} },
    { "id": "8-4-1-1", "name": "Room01 in Workspace01", "number": "881", "disables": {} },
    { "id": "9-6-3-1", "name": "山田太郎 in Workspace01", "number": "101", "on": true, "disables": {}},
    { "id": "10-6-4-1", "name": "鈴木一郎 in Workspace01", "number": "102", "on": true, "disables": {}},
    { "id": "11-6-5-1", "name": "佐々木花子 in Workspace01", "number": "103", "on": true, "disables": {}},
    { "id": "12-7-3-1", "name": "山田太郎 in Room01", "number": "991", "on": true, "disables": {}},
    { "id": "13-7-4-1", "name": "鈴木一郎 in Room01", "number": "992", "on": true, "disables": {}},
    { "id": "14-7-5-1", "name": "佐々木花子 in Room01", "number": "993", "on": true, "disables": {}},
    { "id": "15-1-0-2", "name": "株式会社ShyMe", "number": "0311112222", "disables": {} }
])
```
#### 注入例（取得API指定）
```
const v = window.Veins
const url = 'https://raw.githubusercontent.com/t-kawata/assets/master/json/veins/book_items.json'
v.putPhoneBookItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, {})
```
Token 認証の必要がある場合は、以下のように Authorization ヘッダーを指定します。
```
〜〜〜〜〜
const header = { Authorization: 'Bearer YOUR-TOKEN' }
v.putPhoneBookItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, header)
```
#### データ形式（以下の interface の配列）
```
export interface VeinsPhoneBookItemPublic {
    id: string
    name: string
    number: string
    on?: boolean
    disables?: VeinsPhoneBookItemDisables
}

export interface VeinsPhoneBookItemDisables {
    call?: boolean
    listen?: boolean
    whisper?: boolean
    barge?: boolean
}
```
#### disables について
- call: 当該リストに対する発信可否を boolean で指定します
- listen: 当該リストに対する「聞くだけモニタリング」可否を boolean で指定します
- whisper: 当該リストに対する「ささやきモニタリング」可否を boolean で指定します
- barge: 当該リストに対する「三者通話型モニタリング」可否を boolean で指定します
### 電話履歴
- id フィールドの最初の数字は、ユニークな数字とすること
#### 注入例（直接指定）
```
const v = window.Veins
v.putPhoneHistoryItems(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, [
    { "id": "1-5-3-0", "name": "山田太郎", "number": "00000000002", "in": false, "answer": true, "datetime": "2024/04/05 13:16" },
    { "id": "2-4-1-1", "name": "Room01 in Workspace01", "number": "881", "in": true, "answer": false, "datetime": "2024/03/22 09:45" },
    { "id": "3-6-3-1", "name": "山田太郎 in Workspace01", "number": "101", "in": true, "answer": true, "datetime": "2024/02/15 14:30" },
    { "id": "4-5-4-0", "name": "鈴木一郎", "number": "00000000003", "in": false, "answer": true, "datetime": "2024/01/10 11:20" },
    { "id": "5-5-5-0", "name": "佐々木花子", "number": "00000000004", "in": false, "answer": false, "datetime": "2024/05/18 16:05" },
    { "id": "6-1-0-1", "name": "川田敏巳01", "number": "08012349876", "in": false, "answer": true, "datetime": "2024/06/25 08:50" },
    { "id": "7-4-1-1", "name": "Room01 in Workspace01", "number": "881", "in": true, "answer": false, "datetime": "2024/07/30 10:15" },
    { "id": "8-6-3-1", "name": "山田太郎 in Workspace01", "number": "101", "in": true, "answer": true, "datetime": "2024/08/12 12:40" },
    { "id": "9-6-4-1", "name": "鈴木一郎 in Workspace01", "number": "102", "in": true, "answer": false, "datetime": "2024/09/05 14:55" },
    { "id": "10-1-0-1", "name": "川田敏巳02", "number": "09098761234", "in": false, "answer": false, "datetime": "2024/10/01 09:30" },
    { "id": "11-1-0-1", "name": "川田敏巳01", "number": "08012349876", "in": true, "answer": false, "datetime": "2024/11/20 11:45" },
    { "id": "12-6-5-1", "name": "佐々木花子 in Workspace01", "number": "103", "in": true, "answer": true, "datetime": "2024/12/15 13:10" },
    { "id": "13-7-5-1", "name": "佐々木花子 in Room01", "number": "993", "in": true, "answer": false, "datetime": "2024/01/25 15:35" },
    { "id": "14-1-0-1", "name": "川田敏巳02", "number": "09098761234", "in": true, "answer": false, "datetime": "2024/02/10 08:20" },
    { "id": "15-2-1-0", "name": "Workspace01", "number": "00000000001", "in": true, "answer": true, "datetime": "2024/03/05 09:55" },
    { "id": "16-2-1-0", "name": "Workspace01", "number": "00000000001", "in": false, "answer": false, "datetime": "2024/04/18 11:30" },
    { "id": "17-3-1-0", "name": "Room01", "number": "00000000001", "in": false, "answer": true, "datetime": "2024/05/22 13:05" },
    { "id": "18-4-1-1", "name": "Room01 in Workspace01", "number": "881", "in": false, "answer": true, "datetime": "2024/06/30 14:40" },
    { "id": "19-5-4-0", "name": "鈴木一郎", "number": "00000000003", "in": true, "answer": true, "datetime": "2024/07/15 16:15" },
    { "id": "20-5-5-0", "name": "佐々木花子", "number": "00000000004", "in": true, "answer": true, "datetime": "2024/08/20 08:50" },
    { "id": "21-6-3-1", "name": "山田太郎 in Workspace01", "number": "101", "in": false, "answer": false, "datetime": "2024/09/25 10:25" },
    { "id": "22-6-4-1", "name": "鈴木一郎 in Workspace01", "number": "102", "in": false, "answer": true, "datetime": "2024/10/30 12:00" },
    { "id": "23-7-3-1", "name": "山田太郎 in Room01", "number": "991", "in": true, "answer": false, "datetime": "2024/11/05 13:35" },
    { "id": "24-7-4-1", "name": "鈴木一郎 in Room01", "number": "992", "in": true, "answer": true, "datetime": "2024/12/10 15:10" },
    { "id": "25-6-5-1", "name": "佐々木花子 in Workspace01", "number": "103", "in": false, "answer": true, "datetime": "2024/01/15 08:45" },
    { "id": "26-7-3-1", "name": "山田太郎 in Room01", "number": "991", "in": false, "answer": false, "datetime": "2024/02/20 10:20" },
    { "id": "27-7-4-1", "name": "鈴木一郎 in Room01", "number": "992", "in": false, "answer": true, "datetime": "2024/03/25 11:55" },
    { "id": "28-5-3-0", "name": "山田太郎", "number": "00000000002", "in": true, "answer": true, "datetime": "2024/04/30 13:30" },
    { "id": "29-3-1-0", "name": "Room01", "number": "00000000001", "in": true, "answer": true, "datetime": "2024/05/05 15:05" },
    { "id": "30-7-5-1", "name": "佐々木花子 in Room01", "number": "993", "in": false, "answer": false, "datetime": "2024/06/10 08:40" }
])
```
#### 注入例（取得API指定）
```
const v = window.Veins
const url = 'https://raw.githubusercontent.com/t-kawata/assets/master/json/veins/history_items.json'
v.putPhoneHistoryItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, {})
```
Token 認証の必要がある場合は、以下のように Authorization ヘッダーを指定します。
```
〜〜〜〜〜
const header = { Authorization: 'Bearer YOUR-TOKEN' }
v.putPhoneHistoryItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, header)
```
#### データ形式（以下の interface の配列）
```
export interface VeinsPhoneHistoryItemPublic {
    id: string
    name: string
    number: string
    datetime: string
    in?: boolean
    answer?: boolean
}
```
### スピードダイヤル
- id フィールドの最初の数字は、ユニークな数字とすること
#### 注入例（直接指定）
```
const v = window.Veins
v.putPhoneSpeedDialItems(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, [
    { "id": "1-5-3-0", "name": "山田太郎", "number": "00000000002", "on": true, "disables": {} },
    { "id": "2-5-4-0", "name": "鈴木一郎", "number": "00000000003", "on": true, "disables": {} },
    { "id": "3-5-5-0", "name": "佐々木花子", "number": "00000000004", "on": true, "disables": {} },
    { "id": "4-1-0-1", "name": "川田敏巳01", "number": "08012349876", "disables": {} },
    { "id": "5-1-0-1", "name": "川田敏巳02", "number": "09098761234", "disables": {} },
    { "id": "6-2-1-0", "name": "Workspace01", "number": "00000000001", "disables": {} },
    { "id": "7-3-1-0", "name": "Room01", "number": "00000000001", "disables": {} },
    { "id": "8-4-1-1", "name": "Room01 in Workspace01", "number": "881", "disables": {} },
    { "id": "9-6-3-1", "name": "山田太郎 in Workspace01", "number": "101", "on": true, "disables": {}},
    { "id": "10-6-4-1", "name": "鈴木一郎 in Workspace01", "number": "102", "on": true, "disables": {}},
    { "id": "11-6-5-1", "name": "佐々木花子 in Workspace01", "number": "103", "on": true, "disables": {}},
    { "id": "12-7-3-1", "name": "山田太郎 in Room01", "number": "991", "on": true, "disables": {}},
    { "id": "13-7-4-1", "name": "鈴木一郎 in Room01", "number": "992", "on": true, "disables": {}},
    { "id": "14-7-5-1", "name": "佐々木花子 in Room01", "number": "993", "on": true, "disables": {}},
    { "id": "15-1-0-2", "name": "株式会社ShyMe", "number": "0311112222", "disables": {} }
])
```
#### 注入例（取得API指定）
```
const v = window.Veins
const url = 'https://raw.githubusercontent.com/t-kawata/assets/master/json/veins/speed_dial_items.json'
v.putPhoneSpeedDialItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, {})
```
Token 認証の必要がある場合は、以下のように Authorization ヘッダーを指定します。
```
〜〜〜〜〜
const header = { Authorization: 'Bearer YOUR-TOKEN' }
v.putPhoneSpeedDialItemsByUrl(v.PhoneX.RIGHT, v.PhoneY.BOTTOM, url, header)
```
#### データ形式（以下の interface の配列）
- VeinsPhoneSpeedDialItemPublic は、VeinsPhoneBookItemPublic の extends です
```
export interface VeinsPhoneSpeedDialItemPublic {
    id: string
    name: string
    number: string
    on?: boolean
    disables?: VeinsPhoneBookItemDisables
}

export interface VeinsPhoneBookItemDisables {
    call?: boolean
    listen?: boolean
    whisper?: boolean
    barge?: boolean
}
```
#### disables について
- call: 当該リストに対する発信可否を boolean で指定します
- listen: 当該リストに対する「聞くだけモニタリング」可否を boolean で指定します
- whisper: 当該リストに対する「ささやきモニタリング」可否を boolean で指定します
- barge: 当該リストに対する「三者通話型モニタリング」可否を boolean で指定します

## Veins Phone の SIP Mode 起動
- 下記例のように options 引数に指定して起動
```
window.addEventListener('load', () => {
    const v = window.Veins
    v.phone({
        x: v.PhoneX.RIGHT,
        y: v.PhoneY.BOTTOM,
        sip: {
            host: 'sip.sample.com',
            port: 443,
            path: '/veins/ws',
            username: 'v01-00002-00000000003-wss',
            password: 'Okx4?8qDkK2ft6Xmhg_y',
            turnHost: "sampleturn.com",
            turnPort: 3478,
            turnUsername: "sampleturn",
            turnPassword: "sampleturnpw"
        }
    })
    .then(id => { console.log('CURRENT_ID: '+id) })
    .catch(err => console.error(err))
})
```
- 通話時間が 3分 を超えると自動的に切電されます。
- 通話時間が 3分 に収まる利用方法であれば、下記 `token` と `sip.authHost` による制限解除は必要ありません。
- 起動時の options に、`token` と `sip.authHost` を正しく設定すると、3分 を超えても切電されません。
- 以下、`token` と `sip.authHost` の設定例です。
```
window.addEventListener('load', () => {
    const v = window.Veins
    v.phone({
        token: 'CwCsSrYZrRoUJNVSkoaksunSxc3XVmQ6tWXZUL3vSMPw==',
        x: v.PhoneX.RIGHT,
        y: v.PhoneY.BOTTOM,
        sip: {
            authHost: 'api.sample.com',
            host: 'sip.sample.com',
            port: 443,
            path: '/veins/ws',
            username: 'v01-00002-00000000003-wss',
            password: 'Okx4?8qDkK2ft6Xmhg_y',
            turnHost: "sampleturn.com",
            turnPort: 3478,
            turnUsername: "sampleturn",
            turnPassword: "sampleturnpw"
        }
    })
    .then(id => { console.log('CURRENT_ID: '+id) })
    .catch(err => console.error(err))
})
```
- `sip.authHost` は、いかなる Veins サーバーでも問題ありません。
- `token` は、`sip.authHost` の Veins サーバーにて APX 権限者により発行されたトークンである必要があります。
- その他、利用できる全ての options の定義は、**[コチラ](./src/model/VeinsModel.ts)** の `VeinsPhoneOptions` をご覧ください。
## Veins Phone の Veins Mode 起動
- APX 権限者により発行された下記情報を用意
    * host
    * apx
    * vdr
    * email
    * password
- 下記例のように options 引数に指定して起動
```
window.addEventListener('load', () => {
    const v = window.Veins
    v.phone({
        token: 'CwCsSrYZrRoUJNVSkoaksunSxc3XVmQ6tWXZUL3vSMPw==',
        x: v.PhoneX.RIGHT,
        y: v.PhoneY.BOTTOM,
        veins: {
            host: 'api.sample.com',
            apx: 1,
            vdr: 2,
            email: 'sample@sample.com',
            password: 'sampleaccountpw'
        }
    })
    .then(id => { console.log('CURRENT_ID: '+id) })
    .catch(err => console.error(err))
})
```
- その他、利用できる全ての options の定義は、**[コチラ](./src/model/VeinsModel.ts)** の `VeinsPhoneOptions` をご覧ください。

## Veins Phone 呼び出し関数
### ◼️ アプリ操作
#### ◉ Veins.on (ename, callback)
**概要:**
```
- Veins で発生する全ての Event に callback を設定します
```
**Interface:**
```
Veins.on (ename: string, callback: (e: CustomEvent) => void)
```
#### ◉ Veins.off (ename, callback)
**概要:**
```
- Veins.on() にて設定した Event の callback を削除します
```
**Interface:**
```
Veins.off (ename: string, callback: (e: CustomEvent) => void)
```
#### ◉ Veins.phone (options)
**概要:**
```
- 画面上に電話Appを表示させます
```
**Interface:**
```
Veins.phone (options?: VeinsPhoneOptions): string
```
#### ◉ Veins.openPhone (x, y)
**概要:**
```
- 表示されている電話Appフローティングアクションボタンを開きます
```
**Interface:**
```
Veins.openPhone (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY)
```
#### ◉ Veins.closePhone (x, y)
**概要:**
```
- 表示されている電話Appを閉じてフローティングアクションボタンに戻します
```
**Interface:**
```
Veins.closePhone (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY)
```
#### ◉ Veins.openPhoneSnackbar (x, y, message, timeout?, icon?, line?)
**概要:**
```
- スナックバーとして任意のメッセージを開きます
```
**Interface:**
```
Veins.openPhoneSnackbar (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, message: string, timeout?: number, icon?: string, line?: 1 | 2)
```
#### ◉ Veins.closePhoneSnackbar (x, y)
**概要:**
```
- 開いているスナックバーを閉じます
```
**Interface:**
```
Veins.closePhoneSnackbar (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY)
```
#### ◉ Veins.setPhoneLocale (x, y, locale)
**概要:**
```
- 使用する言語を設定します
```
**Interface:**
```
Veins.setPhoneLocale(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, locale: VeinsPhoneLocale)
```
#### ◉ Veins.getPhoneLocale (x, y)
**概要:**
```
- 現在の言語名を取得します
```
**Interface:**
```
Veins.getPhoneLocale (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): VeinsPhoneLocale | string
```
#### ◉ Veins.setPhoneTab (x, y, tab)
**概要:**
```
- 電話Appの特定のタブをアクティブにします
```
**Interface:**
```
Veins.setPhoneTab (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, tab: VeinsPhoneTabType)
```
#### ◉ Veins.getPhoneTab (x, y)
**概要:**
```
- 現在アクティブになっているタブ名を取得します
```
**Interface:**
```
Veins.getPhoneTab (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): string
```
#### ◉ Veins.setTabMemoryActive (x, y, isTabMemoryActive)
**概要:**
```
- 最後にアクティブになっていたタブを記憶するかどうかを設定します
- 記憶する場合、次回起動時には最後にアクティブになっていたタブが自動的に開きます
```
**Interface:**
```
Veins.setTabMemoryActive (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isTabMemoryActive: boolean)
```
#### ◉ Veins.getTabMemoryActive (x, y)
**概要:**
```
- 現在のタブ記憶設定を取得します
```
**Interface:**
```
Veins.getTabMemoryActive (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
#### ◉ Veins.setSaveBookInLocal (x, y, isSaveBookInLocal)
**概要:**
```
- ローカル電話帳を使用するか否かを設定します
```
**Interface:**
```
Veins.setSaveBookInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isSaveBookInLocal: boolean)
```
#### ◉ Veins.getSaveBookInLocal (x, y)
**概要:**
```
- 現在のローカル電話帳使用有無設定を取得します
```
**Interface:**
```
Veins.getSaveBookInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
#### ◉ Veins.setSaveHistoryInLocal (x, y, isSaveHistoryInLocal)
**概要:**
```
- ローカル電話履歴を使用するか否かを設定します
```
**Interface:**
```
Veins.setSaveHistoryInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isSaveHistoryInLocal: boolean)
```
#### ◉ Veins.getSaveHistoryInLocal (x, y)
**概要:**
```
- 現在のローカル電話履歴使用有無設定を取得します
```
**Interface:**
```
Veins.getSaveHistoryInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
#### ◉ Veins.setSaveSpeedDialInLocal (x, y, isSaveSpeedDialInLocal)
**概要:**
```
- ローカルスピードダイヤルを使用するか否かを設定します
```
**Interface:**
```
Veins.setSaveSpeedDialInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isSaveSpeedDialInLocal: boolean)
```
#### ◉ Veins.getSaveSpeedDialInLocal (x, y)
**概要:**
```
- 現在のローカルスピードダイヤル使用有無設定を取得します
```
**Interface:**
```
Veins.getSaveSpeedDialInLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
<!-- // 24.10.17 KAWATA
#### ◉ Veins.setUsePark (x, y, isUsePark)
**概要:**
```
- 話中パークを使用するか否かを設定します
```
**Interface:**
```
Veins.setUsePark (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isUsePark: boolean)
```
#### ◉ Veins.getUsePark (x, y)
**概要:**
```
- 現在の話中パーク使用有無設定を取得します
```
**Interface:**
```
Veins.getUsePark (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
#### ◉ Veins.setUseTransfer (x, y, isUseTransfer)
**概要:**
```
- 話中転送を使用するか否かを設定します
```
**Interface:**
```
Veins.setUseTransfer (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isUseTransfer: boolean)
```
#### ◉ Veins.getUseTransfer (x, y)
**概要:**
```
- 現在の話中転送使用有無設定を取得します
```
**Interface:**
```
Veins.getUseTransfer (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```
-->
#### ◉ Veins.setEventLog (x, y, isEventLog)
**概要:**
```
- 全イベントをコンソール出力するか否かを設定します
```
**Interface:**
```
Veins.setEventLog (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, isEventLog: boolean)
```
#### ◉ Veins.getEventLog (x, y)
**概要:**
```
- 現在、全イベントをコンソール出力設定となっているか否か取得します
```
**Interface:**
```
Veins.getEventLog (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): boolean
```

#### ◉ Veins.getPhoneI18nDictionary (x, y, asJsonStr, indent)
**概要:**
```
- 現在適用されている i18n 言語辞書 JSON を取得します
```
**Interface:**
```
Veins.getPhoneI18nDictionary (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, asJsonStr?: boolean, indent?: boolean): string | VeinsPhoneDictionary
```
#### ◉ Veins.getPhoneLineSamples ()
**概要:**
```
- 電話回線のデータ1件のサンプルを取得します
```
**Interface:**
```
Veins.getPhoneLineSamples (): VeinsPhoneLine[]
```
#### ◉ Veins.getPhoneBookItemSamples ()
**概要:**
```
- 電話帳のデータ1件のサンプルを取得します
```
**Interface:**
```
Veins.getPhoneBookItemSamples (): VeinsPhoneBookItemPublic[]
```
#### ◉ Veins.getPhoneHistoryItemSamples ()
**概要:**
```
- 電話履歴のデータ1件のサンプルを取得します
```
**Interface:**
```
Veins.getPhoneHistoryItemSamples (): VeinsPhoneHistoryItemPublic[]
```
#### ◉ Veins.getPhoneSpeedDialItemSamples ()
**概要:**
```
- スピードダイヤルのデータ1件のサンプルを取得します
```
**Interface:**
```
Veins.getPhoneSpeedDialItemSamples (): VeinsPhoneSpeedDialItemPublic[]
```
#### ◉ Veins.putPhoneLines (x, y, lines)
**概要:**
```
- 電話回線データを設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneLines (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, lines: VeinsPhoneLine[]): boolean
```
#### ◉ Veins.putPhoneLinesByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話回線データを取得して設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneLinesByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneBookItems (x, y, items)
**概要:**
```
- 電話帳データを設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneBookItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.putPhoneBookItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話帳データを取得して設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneBookItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneHistoryItems (x, y, items)
**概要:**
```
- 電話履歴データを設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneHistoryItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneHistoryItemPublic[]): boolean
```
#### ◉ Veins.putPhoneHistoryItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話履歴データを取得して設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneHistoryItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneSpeedDialItems (x, y, items)
**概要:**
```
- スピードダイヤルデータを設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneSpeedDialItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.putPhoneSpeedDialItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからスピードダイヤルデータを取得して設置します
- この関数を使用した場合、既存のデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneSpeedDialItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneBookItemsLocal (x, y, items)
**概要:**
```
- ローカル電話帳データを設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneBookItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.putPhoneBookItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカル電話帳データを取得して設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneBookItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneHistoryItemsLocal (x, y, items)
**概要:**
```
- ローカル電話履歴データを設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneHistoryItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneHistoryItemPublic[]): boolean
```
#### ◉ Veins.putPhoneHistoryItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカル電話履歴データを取得して設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneHistoryItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.putPhoneSpeedDialItemsLocal (x, y, items)
**概要:**
```
- ローカルスピードダイヤルデータを設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneSpeedDialItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.putPhoneSpeedDialItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカルスピードダイヤルデータを取得して設置します
- この関数を使用した場合、既存のローカルデータを上書きすることに注意してください
```
**Interface:**
```
Veins.putPhoneSpeedDialItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneBookItems (x, y, items)
**概要:**
```
- 電話帳データを追加します
```
**Interface:**
```
Veins.pushPhoneBookItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneBookItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話帳データを取得して追加します
```
**Interface:**
```
Veins.pushPhoneBookItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneHistoryItems (x, y, items)
**概要:**
```
- 電話履歴データを追加します
```
**Interface:**
```
Veins.pushPhoneHistoryItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneHistoryItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneHistoryItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話履歴データを取得して追加します
```
**Interface:**
```
Veins.pushPhoneHistoryItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneSpeedDialItems (x, y, items)
**概要:**
```
- スピードダイヤルデータを追加します
```
**Interface:**
```
Veins.pushPhoneSpeedDialItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneSpeedDialItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからスピードダイヤルデータを取得して追加します
```
**Interface:**
```
Veins.pushPhoneSpeedDialItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneBookItemsLocal (x, y, items)
**概要:**
```
- ローカル電話帳データを追加します
```
**Interface:**
```
Veins.pushPhoneBookItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneBookItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカル電話帳データを取得して追加します
```
**Interface:**
```
Veins.pushPhoneBookItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneHistoryItemsLocal (x, y, items)
**概要:**
```
- ローカル電話履歴データを追加します
```
**Interface:**
```
Veins.pushPhoneHistoryItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneHistoryItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneHistoryItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカル電話履歴データを取得して追加します
```
**Interface:**
```
Veins.pushPhoneHistoryItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.pushPhoneSpeedDialItemsLocal (x, y, items)
**概要:**
```
- ローカルスピードダイヤルデータを追加します
```
**Interface:**
```
Veins.pushPhoneSpeedDialItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.pushPhoneSpeedDialItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカルスピードダイヤルデータを取得して追加します
```
**Interface:**
```
Veins.pushPhoneSpeedDialItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.updatePhoneBookItems (x, y, items)
**概要:**
```
- 電話帳データを更新します
```
**Interface:**
```
Veins.updatePhoneBookItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.updatePhoneBookItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから電話帳データを取得して更新します
```
**Interface:**
```
Veins.updatePhoneBookItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.updatePhoneSpeedDialItems (x, y, items)
**概要:**
```
- スピードダイヤルデータを更新します
```
**Interface:**
```
Veins.updatePhoneSpeedDialItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.updatePhoneSpeedDialItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからスピードダイヤルデータを取得して更新します
```
**Interface:**
```
Veins.updatePhoneSpeedDialItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.updatePhoneBookItemsLocal (x, y, items)
**概要:**
```
- ローカル電話帳データを更新します
```
**Interface:**
```
Veins.updatePhoneBookItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneBookItemPublic[]): boolean
```
#### ◉ Veins.updatePhoneBookItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカル電話帳データを取得して更新します
```
**Interface:**
```
Veins.updatePhoneBookItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.updatePhoneSpeedDialItemsLocal (x, y, items)
**概要:**
```
- ローカルスピードダイヤルデータを更新します
```
**Interface:**
```
Veins.updatePhoneSpeedDialItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, items: VeinsPhoneSpeedDialItemPublic[]): boolean
```
#### ◉ Veins.updatePhoneSpeedDialItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIからローカルスピードダイヤルデータを取得して更新します
```
**Interface:**
```
Veins.updatePhoneSpeedDialItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneBookItems (x, y, itemIDs)
**概要:**
```
- 電話帳データを削除します
```
**Interface:**
```
Veins.deletePhoneBookItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneBookItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象の電話帳データIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneBookItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneHistoryItems (x, y, itemIDs)
**概要:**
```
- 電話履歴データを削除します
```
**Interface:**
```
Veins.deletePhoneHistoryItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneHistoryItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象の電話履歴データIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneHistoryItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneSpeedDialItems (x, y, itemIDs)
**概要:**
```
- スピードダイヤルデータを削除します
```
**Interface:**
```
Veins.deletePhoneSpeedDialItems (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneSpeedDialItemsByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象のスピードダイヤルデータIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneSpeedDialItemsByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneBookItemsLocal (x, y, itemIDs)
**概要:**
```
- ローカル電話帳データを削除します
```
**Interface:**
```
Veins.deletePhoneBookItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneBookItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象のローカル電話帳データIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneBookItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneHistoryItemsLocal (x, y, itemIDs)
**概要:**
```
- ローカル電話履歴データを削除します
```
**Interface:**
```
Veins.deletePhoneHistoryItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneHistoryItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象のローカル電話履歴データIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneHistoryItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.deletePhoneSpeedDialItemsLocal (x, y, itemIDs)
**概要:**
```
- ローカルスピードダイヤルデータを削除します
```
**Interface:**
```
Veins.deletePhoneSpeedDialItemsLocal (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, itemIDs: string[]): boolean
```
#### ◉ Veins.deletePhoneSpeedDialItemsLocalByUrl (x, y, url, headers)
**概要:**
```
- 指定したURLのAPIから対象のローカルスピードダイヤルデータIDを取得して削除します
```
**Interface:**
```
Veins.deletePhoneSpeedDialItemsLocalByUrl (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, url: string, headers: Record<string, string>): Promise<boolean>
```
#### ◉ Veins.searchBookItem (x, y, search, isEventOn)
**概要:**
```
- フリーワードで電話帳を検索します
```
**Interface:**
```
Veins.searchBookItem (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneBookItem[]
```
#### ◉ Veins.searchHistoryItem (x, y, search, isEventOn)
**概要:**
```
- フリーワードで電話履歴を検索します
```
**Interface:**
```
Veins.searchHistoryItem (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneHistoryItem[]
```
#### ◉ Veins.searchSpeedDialItem (x, y, search, isEventOn)
**概要:**
```
- フリーワードでスピードダイヤルを検索します
```
**Interface:**
```
Veins.searchSpeedDialItem (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneSpeedDialItem[]
```
#### ◉ Veins.searchBookItemExactly (x, y, search, isEventOn)
**概要:**
```
- フリーワードで電話帳を完全一致で検索します
```
**Interface:**
```
Veins.searchBookItemExactly (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneBookItem[]
```
#### ◉ Veins.searchHistoryItemExactly (x, y, search, isEventOn)
**概要:**
```
- フリーワードで電話履歴を完全一致で検索します
```
**Interface:**
```
Veins.searchHistoryItemExactly (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneHistoryItem[]
```
#### ◉ Veins.searchSpeedDialItemExactly (x, y, search, isEventOn)
**概要:**
```
- フリーワードでスピードダイヤルを完全一致で検索します
```
**Interface:**
```
Veins.searchSpeedDialItemExactly (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, search: string, isEventOn?: boolean): VeinsPhoneSpeedDialItem[]
```
#### ◉ Veins.openCallingMask (x, y, options)
**概要:**
```
- 発信中や着信中、通話中等を示す画面を電話App内で開きます
```
**Interface:**
```
Veins.openCallingMask (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, options?: VeinsPhoneOpenCallingMaskOptions)
```
#### ◉ Veins.closeCallingMask (x, y)
**概要:**
```
- 発信中や着信中、通話中等を示す画面を電話App内で閉じます
```
**Interface:**
```
Veins.closeCallingMask (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY)
```
#### ◉ Veins.putCustomCallingMaskHtml (x, y, html)
**概要:**
```
- カスタムモードで開いた発信中や着信中、通話中等を示す画面内のカスタム領域に任意のHTMLを挿入します
```
**Interface:**
```
Veins.putCustomCallingMaskHtml (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, html: string)
```
<!-- // 24.10.17 KAWATA
#### ◉ Veins.putActiveParkSlots (x, y, activeParkSlots)
**概要:**
```
- 現在埋まっているパークスロット番号を設定します
```
**Interface:**
```
Veins.putActiveParkSlots (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, activeParkSlots: number[])
```
#### ◉ Veins.pushActiveParkSlot (x, y, slot)
**概要:**
```
- 現在埋まっているパークスロット番号を追加します
```
**Interface:**
```
Veins.pushActiveParkSlot (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, slot: number)
```
#### ◉ Veins.delActiveParkSlot (x, y, slot)
**概要:**
```
- 現在埋まっているパークスロット番号を削除（解放）します
```
**Interface:**
```
Veins.delActiveParkSlot (x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, slot: number)
```
-->
---

### ◼️ 電話操作
#### ◉ Veins.register()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.register()
```
#### ◉ Veins.unregister()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.unregister()
```
#### ◉ Veins.call(x, y, exten)
**概要:**
```
- exten に対して直に発信を行います
- PBX上のダイヤルプランにおいて、exten に指定した文字列がそのまま EXTEN として扱われる発信方法です
- 現在選択されている電話回線の情報は、以下の SIP Header に付与されて INVITE されます
    * X-VEINS-LINE_ID     = 選択されている回線の VeinsPhoneLine.id
    * X-VEINS-LINE_NUMBER = 選択されている回線の VeinsPhoneLine.number
```
**Interface:**
```
Veins.call(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, exten: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callBySelectedLine(x, y, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- 現在選択されている電話回線を使用して外線発信を行います
```
**Interface:**
```
Veins.callBySelectedLine(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToLine(x, y, lineID, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- lineID 引数にて、特定の電話回線のIDを指定して外線発信を行います
- lineID に指定する電話回線のIDは、Veins PBX により発行された回線である必要があります
- Veins Phone を起動した、Veins ユーザーのアカウントにて発信権限のある回線である必要があります
```
**Interface:**
```
Veins.callToLine(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, lineID: number, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToWorkspace(x, y, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ワークスペースの公開内線番号に対して内線発信を行います
- 公開内線番号とは、Veins 通信網内においてはどこからでも呼出可能な、電話番号のように振る舞う番号です
```
**Interface:**
```
Veins.callToWorkspace(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToRoom(x, y, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ルームの公開内線番号に対して内線発信を行います
- 公開内線番号とは、Veins 通信網内においてはどこからでも呼出可能な、電話番号のように振る舞う番号です
```
**Interface:**
```
Veins.callToRoom(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToRoomInWorkspace(x, y, workspaceID, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ワークスペース内でのみ有効なルームの内線番号に対して内線発信を行います
- workspaceID 引数にて、特定のワークスペースのIDを指定して内線発信を行います
- Veins Phone を起動した、Veins ユーザーのアカウントにて発信権限がある場合にのみ発信可能です
```
**Interface:**
```
Veins.callToRoomInWorkspace(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, workspaceID: number, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToUser(x, y, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ユーザーの公開内線番号に対して内線発信を行います
- 公開内線番号とは、Veins 通信網内においてはどこからでも呼出可能な、電話番号のように振る舞う番号です
```
**Interface:**
```
Veins.callToUser(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToUserInWorkspace(x, y, workspaceID, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ワークスペース内でのみ有効なユーザーの内線番号に対して内線発信を行います
- workspaceID 引数にて、特定のワークスペースのIDを指定して内線発信を行います
- Veins Phone を起動した、Veins ユーザーのアカウントにて発信権限がある場合にのみ発信可能です
```
**Interface:**
```
Veins.callToUserInWorkspace(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, workspaceID: number, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.callToUserInRoom(x, y, roomID, number)
**概要:**
```
- VEINS mode で起動時に限り使用可能です
- ルーム内でのみ有効なユーザーの内線番号に対して内線発信を行います
- roomID 引数にて、特定のルームのIDを指定して内線発信を行います
- Veins Phone を起動した、Veins ユーザーのアカウントにて発信権限がある場合にのみ発信可能です
```
**Interface:**
```
Veins.callToUserInRoom(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, roomID: number, number: string): Promise<Inviter | undefined>
```
#### ◉ Veins.answer(x, y)
**概要:**
```
- 着信に対して応答します
```
**Interface:**
```
Veins.answer(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.hangup(x, y)
**概要:**
```
- 電話を切ります
- 発信中であれば、キャンセルを意味します
- 着信中であれば、拒否を意味します
- 通話中であれば、通話終了を意味します
```
**Interface:**
```
Veins.hangup(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.hold(x, y)
**概要:**
```
- 通話中にのみ使用できます
- 通話を保留状態にします
```
**Interface:**
```
Veins.hold(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.unhold(x, y)
**概要:**
```
- 通話中にのみ使用できます
- 通話の保留状態を解除します
```
**Interface:**
```
Veins.unhold(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.mute(x, y)
**概要:**
```
- 通話中にのみ使用できます
- ミュートです
- 自分の声が相手に届かなくなります
```
**Interface:**
```
Veins.mute(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.unmute(x, y)
**概要:**
```
- 通話中にのみ使用できます
- ミュートを解除し、自分の声が再び相手に届くようになります
```
**Interface:**
```
Veins.unmute(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY): Promise<any>
```
#### ◉ Veins.dtmf(x, y, tone)
**概要:**
```
- DTMFプッシュトーンを送信します
- 使用できるDTMFプッシュトーンは、正規表現「^[0-9A-D#*,]$」にマッチする必要があります
- 典型的な利用例
    * 発信先が応答し「〇〇に御用の方は 1 を、◻︎◻︎ に御用の方は 2 を押してください」などのアナウンスが流れる
    * 2 をプッシュし、◻︎◻︎ の担当者に繋いでもらう。
- 上記「典型的な利用例」における「2 をプッシュ」は「Veins.dtmf(x, y, '2')」のように表現します
```
**Interface:**
```
Veins.dtmf(x: VeinsPhoneLowerX, y: VeinsPhoneLowerY, tone: string): Promise<any>
```
<!-- // 24.10.17 KAWATA
#### ◉ Veins.transfer()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.transfer()
```
#### ◉ Veins.cancelTransfer()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.cancelTransfer()
```
#### ◉ Veins.park()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.park()
```
#### ◉ Veins.parkup()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.parkup()
```
#### ◉ Veins.listen()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.listen()
```
#### ◉ Veins.whisper()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.whisper()
```
#### ◉ Veins.barge()
**概要:**
```
- coming soon
```
**Interface:**
```
Veins.barge()
```
-->

---

## Veins Phone Events
### ⚫︎ ON_CREATED
**概要:**
```
- 電話Appのインスタンスが生成された時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCreate`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CREATED.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CREATED.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_MOUNTED
**概要:**
```
- 電話Appがマウントされた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnMounted`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_MOUNTED.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_MOUNTED.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_OPEN
**概要:**
```
- 電話Appが開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnOpen`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_OPEN.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_OPEN.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLOSE
**概要:**
```
- 電話Appが閉じた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClose`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLOSE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLOSE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_OPEN_SNACKBAR
**概要:**
```
- スナックバーが開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnOpenSnackbar`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_OPEN_SNACKBAR.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_OPEN_SNACKBAR.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLOSE_SNACKBAR
**概要:**
```
- スナックバーが閉じた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCloseSnackbar`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLOSE_SNACKBAR.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLOSE_SNACKBAR.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_LOCALE_CHANGE
**概要:**
```
- 言語設定が変更された時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnLocaleChange`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LOCALE_CHANGE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LOCALE_CHANGE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TAB_CHANGE
**概要:**
```
- タブが切り替わった時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTabChange`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TAB_CHANGE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TAB_CHANGE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_INPUT_NUMBER_CHANGE
**概要:**
```
- 電話タブにて番号が入力された時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnInputNumberChange`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_INPUT_NUMBER_CHANGE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_INPUT_NUMBER_CHANGE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CALL
**概要:**
```
- 電話をかけた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCall`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CALL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CALL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_FILTER_BOOK
**概要:**
```
- 電話帳の検索等、絞り込みが行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnFilterBook`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_FILTER_BOOK.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_FILTER_BOOK.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_FILTER_HISTORY
**概要:**
```
- 電話履歴の検索等、絞り込みが行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnFilterHistory`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_FILTER_HISTORY.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_FILTER_HISTORY.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_FILTER_SPEED_DIAL
**概要:**
```
- スピードダイヤルの検索等、絞り込みが行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnFilterSpeedDial`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_FILTER_SPEED_DIAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_FILTER_SPEED_DIAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_SEARCH_BOOK
**概要:**
```
- Veins関数から電話帳の検索が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnSearchBook`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_SEARCH_BOOK.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_SEARCH_BOOK.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_SEARCH_HISTORY
**概要:**
```
- Veins関数から電話履歴の検索が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnSearchHistory`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_SEARCH_HISTORY.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_SEARCH_HISTORY.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_SEARCH_SPEED_DIAL
**概要:**
```
- Veins関数からスピードダイヤルの検索が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnSearchSpeedDial`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_SEARCH_SPEED_DIAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_SEARCH_SPEED_DIAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_LINES
**概要:**
```
- 電話回線データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutLines`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_LINES.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_LINES.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_LINES_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話回線データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutLinesByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_LINES_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_LINES_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_BOOK_ITEMS
**概要:**
```
- 電話帳データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutBookItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_BOOK_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_BOOK_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_BOOK_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話帳データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutBookItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_HISTORY_ITEMS
**概要:**
```
- 電話履歴データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutHistoryItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_HISTORY_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_HISTORY_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_HISTORY_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話履歴データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutHistoryItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_SPEED_DIAL_ITEMS
**概要:**
```
- スピードダイヤルデータの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutSpeedDialItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_SPEED_DIAL_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用したスピードダイヤルデータの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutSpeedDialItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_BOOK_ITEMS_LOCAL
**概要:**
```
- ローカル電話帳データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutBookItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_BOOK_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話帳データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutBookItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_HISTORY_ITEMS_LOCAL
**概要:**
```
- ローカル電話履歴データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutHistoryItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_HISTORY_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話履歴データの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutHistoryItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_SPEED_DIAL_ITEMS_LOCAL
**概要:**
```
- ローカルスピードダイヤルデータの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutSpeedDialItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_SPEED_DIAL_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカルスピードダイヤルデータの設置が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutSpeedDialItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_BOOK_ITEMS
**概要:**
```
- 電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushBookItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_BOOK_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_BOOK_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_BOOK_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushBookItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_HISTORY_ITEMS
**概要:**
```
- 電話履歴データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushHistoryItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_HISTORY_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話履歴データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushHistoryItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_SPEED_DIAL_ITEMS
**概要:**
```
- スピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushSpeedDialItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_SPEED_DIAL_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用したスピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushSpeedDialItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_BOOK_ITEMS_LOCAL
**概要:**
```
- ローカル電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushBookItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_BOOK_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushBookItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_HISTORY_ITEMS_LOCAL
**概要:**
```
- ローカル電話履歴データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushHistoryItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_HISTORY_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話履歴データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushHistoryItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_SPEED_DIAL_ITEMS_LOCAL
**概要:**
```
- ローカルスピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushSpeedDialItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_SPEED_DIAL_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカルスピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushSpeedDialItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_BOOK_ITEMS
**概要:**
```
- 電話帳データの更新が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateBookItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_BOOK_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateBookItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_SPEED_DIAL_ITEMS
**概要:**
```
- スピードダイヤルデータの更新が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateSpeedDialItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_SPEED_DIAL_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用したスピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateSpeedDialItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_BOOK_ITEMS_LOCAL
**概要:**
```
- ローカル電話帳データの更新が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateBookItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_BOOK_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話帳データの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateBookItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL
**概要:**
```
- ローカルスピードダイヤルデータの更新が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateSpeedDialItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカルスピードダイヤルデータの追加が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateSpeedDialItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_BOOK_ITEMS
**概要:**
```
- 電話帳データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteBookItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_BOOK_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_BOOK_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_BOOK_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話帳データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteBookItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_HISTORY_ITEMS
**概要:**
```
- 電話履歴データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteHistoryItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_HISTORY_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用した電話履歴データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteHistoryItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_SPEED_DIAL_ITEMS
**概要:**
```
- スピードダイヤルデータの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteSpeedDialItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_SPEED_DIAL_ITEMS_BY_URL
**概要:**
```
- APIへの問い合わせを利用したスピードダイヤルデータの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteSpeedDialItemsByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_BOOK_ITEMS_LOCAL
**概要:**
```
- ローカル電話帳データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteBookItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_BOOK_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話帳データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteBookItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_BOOK_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_HISTORY_ITEMS_LOCAL
**概要:**
```
- ローカル電話履歴データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteHistoryItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_HISTORY_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカル電話履歴データの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteHistoryItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_HISTORY_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_SPEED_DIAL_ITEMS_LOCAL
**概要:**
```
- ローカルスピードダイヤルデータの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteSpeedDialItemsLocal`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_LOCAL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_SPEED_DIAL_ITEMS_LOCAL_BY_URL
**概要:**
```
- APIへの問い合わせを利用したローカルスピードダイヤルデータの削除が行われた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteSpeedDialItemsLocalByUrl`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEMS_LOCAL_BY_URL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_OPEN_CALLING_MASK
**概要:**
```
- 発信中や着信中、通話中等を示す画面が開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnOpenCallingMask`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_OPEN_CALLING_MASK.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_OPEN_CALLING_MASK.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLOSE_CALLING_MASK
**概要:**
```
- 発信中や着信中、通話中等を示す画面が閉じた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCloseCallingMask`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLOSE_CALLING_MASK.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLOSE_CALLING_MASK.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_CUSTOM_CALLING_MASK_HTML
**概要:**
```
- 発信中や着信中、通話中等を示す画面のカスタムモードに任意のHTMLを挿入した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutCustomCallingMaskHtml`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_CUSTOM_CALLING_MASK_HTML.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_CUSTOM_CALLING_MASK_HTML.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CREATE_BOOK_ITEM
**概要:**
```
- UI上から電話帳データを作成した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCreateBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CREATE_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CREATE_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CREATE_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータを作成した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCreateSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CREATE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CREATE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_BOOK_ITEM
**概要:**
```
- UI上から電話帳データを更新した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UPDATE_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータを更新した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUpdateSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UPDATE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_BOOK_ITEM
**概要:**
```
- UI上から電話帳データを削除した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteBookItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_HISTORY_ITEM
**概要:**
```
- UI上から電話履歴データを削除した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteHistoryItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータを削除した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteSpeedDialItems`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLICK_BOOK_ITEM
**概要:**
```
- UI上から電話帳データをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLICK_HISTORY_ITEM
**概要:**
```
- UI上から電話履歴データをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickHistoryItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLICK_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_RIGHT_CLICK_BOOK_ITEM
**概要:**
```
- UI上から電話帳データを右クリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnRightClickBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_RIGHT_CLICK_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_RIGHT_CLICK_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_RIGHT_CLICK_HISTORY_ITEM
**概要:**
```
- UI上から電話履歴データを右クリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnRightClickHistoryItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_RIGHT_CLICK_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_RIGHT_CLICK_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_RIGHT_CLICK_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータを右クリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnRightClickSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_RIGHT_CLICK_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_RIGHT_CLICK_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_LONG_PRESS_BOOK_ITEM
**概要:**
```
- UI上から電話帳データを長押しした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnLongPressBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LONG_PRESS_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LONG_PRESS_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_LONG_PRESS_HISTORY_ITEM
**概要:**
```
- UI上から電話履歴データを長押しした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnLongPressHistoryItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LONG_PRESS_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LONG_PRESS_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_LONG_PRESS_SPEED_DIAL_ITEM
**概要:**
```
- UI上からスピードダイヤルデータを長押しした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnLongPressSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LONG_PRESS_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LONG_PRESS_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CALL_BOOK_ITEM
**概要:**
```
- UI上で電話帳データから発信をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCallBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CALL_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CALL_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CALL_HISTORY_ITEM
**概要:**
```
- UI上で電話履歴データから発信をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCallHistoryItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CALL_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CALL_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CALL_SPEED_DIAL_ITEM
**概要:**
```
- UI上でスピードダイヤルデータから発信をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCallSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CALL_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CALL_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
<!-- // 24.10.17 KAWATA
### ⚫︎ ON_LISTEN_BOOK_ITEM
**概要:**
```
- UI上で電話帳データから「聞くだけモニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnListenBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LISTEN_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LISTEN_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_LISTEN_SPEED_DIAL_ITEM
**概要:**
```
- UI上でスピードダイヤルデータから「聞くだけモニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnListenSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_LISTEN_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_LISTEN_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_WHISPER_BOOK_ITEM
**概要:**
```
- UI上で電話帳データから「ささやきモニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnWhisperBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_WHISPER_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_WHISPER_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_WHISPER_SPEED_DIAL_ITEM
**概要:**
```
- UI上でスピードダイヤルデータから「ささやきモニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnWhisperSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_WHISPER_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_WHISPER_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_BARGE_BOOK_ITEM
**概要:**
```
- UI上で電話帳データから「三者通話モニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnBargeBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_BARGE_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_BARGE_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_BARGE_SPEED_DIAL_ITEM
**概要:**
```
- UI上でスピードダイヤルデータから「三者通話モニタリング」をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnBargeSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_BARGE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_BARGE_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
-->
### ⚫︎ ON_DETAIL_BOOK_ITEM
**概要:**
```
- UI上で電話帳データから詳細を開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDetailBookItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DETAIL_BOOK_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DETAIL_BOOK_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DETAIL_HISTORY_ITEM
**概要:**
```
- UI上で電話履歴データから詳細を開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDetailHistoryItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DETAIL_HISTORY_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DETAIL_HISTORY_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DETAIL_SPEED_DIAL_ITEM
**概要:**
```
- UI上でスピードダイヤルデータから詳細を開いた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDetailSpeedDialItem`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DETAIL_SPEED_DIAL_ITEM.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DETAIL_SPEED_DIAL_ITEM.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CANCEL
**概要:**
```
- 発信のキャンセルを行った時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCancel`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CANCEL.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CANCEL.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_REJECT
**概要:**
```
- 着信に対して拒否を行った時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnReject`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_REJECT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_REJECT.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_ACCEPT
**概要:**
```
- 着信に対して応答を行った時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnAccept`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_ACCEPT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_ACCEPT.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_MIC_ON
**概要:**
```
- 通話中にマイクをオンに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnMicOn`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_MIC_ON.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_MIC_ON.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_MIC_OFF
**概要:**
```
- 通話中にマイクをオフに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnMicOff`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_MIC_OFF.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_MIC_OFF.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CLICK_KEYPAD
**概要:**
```
- 通話中にキーバッドボタンをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickKeypad`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_KEYPAD.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_KEYPAD.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_SPEAKER_ON
**概要:**
```
- 通話中にスピーカーをオンに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnSpeakerOn`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_SPEAKER_ON.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_SPEAKER_ON.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_SPEAKER_OFF
**概要:**
```
- 通話中にスピーカーをオフに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnSpeakerOff`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_SPEAKER_OFF.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_SPEAKER_OFF.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_HOLD_ON
**概要:**
```
- 通話中に保留をオンに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnHoldOn`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_HOLD_ON.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_HOLD_ON.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TURN_HOLD_OFF
**概要:**
```
- 通話中に保留をオフに変えた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTurnHoldOff`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TURN_HOLD_OFF.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TURN_HOLD_OFF.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_HANGUP
**概要:**
```
- 通話中に切電をした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnHangup`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_HANGUP.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_HANGUP.RIGHT.BOTTOM, e.detail)
})
```
<!-- // 24.10.17 KAWATA
### ⚫︎ ON_CLICK_TRANSFER
**概要:**
```
- 通話中に転送ボタンをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickTransfer`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_TRANSFER.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_TRANSFER.RIGHT.BOTTOM, e.detail)
})
```
-->
### ⚫︎ ON_CLICK_KEYPAD_NUMBER
**概要:**
```
- 通話中にキーパッド内の番号ボタンをクリックした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnClickKeypad`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CLICK_KEYPAD_NUMBER.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CLICK_KEYPAD_NUMBER.RIGHT.BOTTOM, e.detail)
})
```
<!-- // 24.10.17 KAWATA
### ⚫︎ ON_TRANSFER_IN_TALKING
**概要:**
```
- 通話中に転送を実行した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTransferInTalking`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TRANSFER_IN_TALKING.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TRANSFER_IN_TALKING.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUT_ACTIVE_PARK_SLOTS
**概要:**
```
- 現在埋まっているパークスロットを設定した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPutActiveParkSlots`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUT_ACTIVE_PARK_SLOTS.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUT_ACTIVE_PARK_SLOTS.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PUSH_ACTIVE_PARK_SLOT
**概要:**
```
- 現在埋まっているパークスロットを追加した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnPushActiveParkSlot`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PUSH_ACTIVE_PARK_SLOT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PUSH_ACTIVE_PARK_SLOT.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DELETE_ACTIVE_PARK_SLOT
**概要:**
```
- 現在埋まっているパークスロットを削除（解放）した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDeleteActiveParkSlot`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DELETE_ACTIVE_PARK_SLOT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DELETE_ACTIVE_PARK_SLOT.RIGHT.BOTTOM, e.detail)
})
```
-->
### ⚫︎ ON_UA_PREPARED
**概要:**
```
- ユーザエージェントの生成に成功した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUaPrepared`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UA_PREPARED.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UA_PREPARED.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CONNECT
**概要:**
```
- ユーザーエージェントがサーバーに接続した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnConnect`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CONNECT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CONNECT.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_DISCONNECT
**概要:**
```
- ユーザーエージェントとサーバーの接続が切れた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnDisconnect`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_DISCONNECT.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_DISCONNECT.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_REGISTER
**概要:**
```
- ユーザーエージェントがサーバーにレジストした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnRegister`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_REGISTER.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_REGISTER.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UNREGISTER
**概要:**
```
- ユーザーエージェントがサーバーからアンレジストした時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUnregister`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UNREGISTER.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UNREGISTER.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_CALL_TO
**概要:**
```
- 発信した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnCallTo`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_CALL_TO.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_CALL_TO.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_ANSWER
**概要:**
```
- コールの応答に成功時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnAnswer`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_ANSWER.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_ANSWER.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_RECEIVE
**概要:**
```
- コールを受けた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnReceive`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_RECEIVE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_RECEIVE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_TERMINATE
**概要:**
```
- コールの終了に成功した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnTerminate`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_TERMINATE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_TERMINATE.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_HOLD
**概要:**
```
- 通話の保留に成功した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnHold`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_HOLD.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_HOLD.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_UNHOLD
**概要:**
```
- 通話の保留解除に成功した時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnUnhold`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_UNHOLD.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_UNHOLD.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PARKSLOTS_REFRESHED
**概要:**
```
- パークスロットがリフレッシュされた時に発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnParkslotsRefreshed`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PARKSLOTS_REFRESHED.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PARKSLOTS_REFRESHED.RIGHT.BOTTOM, e.detail)
})
```
### ⚫︎ ON_PARKSLOTS_CHANGE
**概要:**
```
- パークスロットが変化した時に発火します
- パークスロットのリフレッシュ時には、情報に変化がなくても発火します
```
**使用例:**
- `e.detail` の型は、 **[コチラ](./src/model/VeinsModel.ts)** の `VeinsEventPhoneOnParkslotsChange`
```
const v = window.Veins
v.on(v.Event.PHONE.ON_PARKSLOTS_CHANGE.RIGHT.BOTTOM, (e) => {
    console.log(v.Event.PHONE.ON_PARKSLOTS_CHANGE.RIGHT.BOTTOM, e.detail)
})
```