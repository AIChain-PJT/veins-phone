export const DEFAULT_CALLING_TIMEOUT = 360 // seconds

export type VeinsRunType = 'PHONE' | 'APP'
export interface VeinsPositionType {
    name: string
    number: number
}
export interface VeinsPositionIf {
    [key: string]: {
        [key: string]: VeinsPositionType
    }
}
export const VeinsPosition: VeinsPositionIf = {
    X: {
        LEFT: { name: 'left', number: 1 },
        CENTER: { name: 'center', number: 2 },
        RIGHT: { name: 'right', number: 3 }
    },
    Y: {
        TOP: { name: 'top', number: 1 },
        MIDDLE: { name: 'middle', number: 2 },
        BOTTOM: { name: 'bottom', number: 3 }
    }
}

export type VeinsPhoneUpperX = 'LEFT' | 'RIGHT'
export type VeinsPhoneLowerX = 'left' | 'right'
export type VeinsPhoneUpperY = 'TOP' | 'BOTTOM'
export type VeinsPhoneLowerY = 'top' | 'bottom'
export type VeinsPhoneLocale = 'en' | 'ja'
export type VeinsPhoneTabType = 'phone' | 'book' | 'history' | 'settings'
export type VeinsPhoneModeType = 'sip' | 'veins'
export const VeinsPhoneMode = {
    SIP: 'sip',
    VEINS: 'veins'
} as { [k: string]: VeinsPhoneModeType }
export type VeinsPhoneCallingMaskModeType = 'calling' | 'ringing' | 'talking' | 'custom'
export const VeinsPhoneCallingMaskMode = {
    CALLING: 'calling',
    RINGING: 'ringing',
    TALKING: 'talking',
    CUSTOM: 'custom',
} as { [k: string]: VeinsPhoneCallingMaskModeType }

export type VeinsAppUpperX = 'LEFT' | 'CENTER' | 'RIGHT'
export type VeinsAppLowerX = 'left' | 'center' | 'right'
export type VeinsAppUpperY = 'TOP' | 'MIDDLE' | 'BOTTOM'
export type VeinsAppLowerY = 'top' | 'middle' | 'bottom'

export interface VeinsPhoneDictionary {
    [k: string]: string | VeinsPhoneDictionary
}

export interface VeinsPhoneBookPermissions {
    create?: boolean
    update?: boolean
}

export interface VeinsPhoneSpeedDialPermissions {
    create?: boolean
    update?: boolean
}

export interface VeinsPhonePermissions {
    call?: boolean,
    listen?: boolean,
    whisper?: boolean,
    barge?: boolean,
    book?: VeinsPhoneBookPermissions,
    speedDial?: VeinsPhoneSpeedDialPermissions
}

export interface VeinsPhoneDictionaryURL {
    url?: string,
    headers?: Record<string, string>
}

export interface VeinsPhoneDictionaryURLs {
    en?: VeinsPhoneDictionaryURL,
    ja?: VeinsPhoneDictionaryURL
}

export interface VeinsPhoneOptionsOtherSettings {
    isTabMemoryActive: boolean
    isSaveBookInLocal: boolean
    isSaveHistoryInLocal: boolean
    isSaveSpeedDialInLocal: boolean
    isUsePark: boolean
    isUseTransfer: boolean
    isUseLineInListOn: boolean
    isEventLogOn: boolean
}

export interface VeinsSip {
    host: string
    port: number
    path: string
    username: string
    password: string
    turnHost: string
    turnPort: number
    turnUsername: string
    turnPassword: string
}

export interface VeinsAccount {
    host: string
    apx: number
    vdr: number
    email: string
    password: string
}

export interface VeinsAudio {
    ringtone: string
    musiconhold: string
    dtmf: {
        [k: string]: string
    }
}

export interface VeinsAudioElm {
    ringtone: HTMLAudioElement
    musiconhold: HTMLAudioElement
    dtmf: {
        [k: string]: HTMLAudioElement
    }
}

export interface VeinsCallingInfo {
    line?: VeinsPhoneLine,
    to?: {
        id?: string,
        name?: string,
        number?: string
    }[]
}

export interface VeinsReceivingInfo {
    line?: VeinsPhoneLine,
    from?: {
        id?: string,
        name?: string,
        number?: string
    }[],
    ev?: VeinsPbxIncomingEv,
    evName?: string
}

export type VeinsCallingReceivingInfo = VeinsCallingInfo | VeinsReceivingInfo

export interface VeinsPhoneOptions {
    token: string
    mode: VeinsPhoneModeType
    x: VeinsPhoneLowerX
    y: VeinsPhoneLowerY
    locale?: VeinsPhoneLocale
    size: number
    color: string
    iconColor: string
    iconSize: number
    marginX: number
    marginY: number
    ripple: boolean
    fabOpacity: number
    bodyOpacity: number
    permissions: VeinsPhonePermissions
    dictionaryURLs: VeinsPhoneDictionaryURLs
    otherSettings?: VeinsPhoneOptionsOtherSettings
    defaultLineID?: number
    sip?: VeinsSip
    veins?: VeinsAccount
    audio?: VeinsAudio
}

export interface VeinsAppOptions {
    x: VeinsAppLowerX
    y: VeinsAppLowerY
    url: string
    color: string
    name: string
    ripple: boolean
}

export type VeinsIDs = {
    [key in VeinsRunType]: {
        [key in VeinsAppUpperX]: {
            [key in VeinsAppUpperY]: string
        }
    }
}

export interface VeinsPhoneBookItemDisables {
    call?: boolean
    listen?: boolean
    whisper?: boolean
    barge?: boolean
}

export interface VeinsPhoneLine {
    id: number
    name: string
    number: string
}

export const VeinsPhoneLineSample = {
    id: 0,
    name: '',
    number: ''
} as VeinsPhoneLine

export const VeinsPhoneLineSamples = [
    { id: 1, name: 'みかん回線', number: '0311112222' },
    { id: 2, name: 'りんご回線', number: '0611112222' },
    { id: 3, name: 'ばなな回線', number: '05011112222' }
] as VeinsPhoneLine[]

export type ListType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type CallType = ListType

export const ListTypes = {
    NORMAL: 0,
    LINE: 1,
    WORKSPACE: 2,
    ROOM: 3,
    ROOM_IN_WORKSPACE: 4,
    USER: 5,
    USER_IN_WORKSPACE: 6,
    USER_IN_ROOM: 7
} as { [k: string]: ListType }

export const CallTypes = ListTypes as { [k: string]: CallType }

export interface VeinsPhoneBookItem {
    id: string
    name: string
    number: string
    type: ListType
    myID: number,
    parentID: number,
    on?: boolean
    open?: boolean
    local?: boolean
    disables?: VeinsPhoneBookItemDisables
}

export interface VeinsPhoneBookItemPublic {
    id: string
    name: string
    number: string
    on?: boolean
    disables?: VeinsPhoneBookItemDisables
}

export const VeinsPhoneBookItemSample = {
    id: '',
    name: '',
    number: '',
    on: false,
    open: false,
    local: false,
    disables: { call: false, listen: false, whisper: false, barge: false }
} as VeinsPhoneBookItem

export const VeinsPhoneBookItemSamples = [
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
] as VeinsPhoneBookItemPublic[]

export interface VeinsPhoneHistoryItem {
    id: string
    name: string
    number: string
    type: ListType
    myID: number
    parentID: number
    datetime: string
    in?: boolean
    answer?: boolean
    open?: boolean
    local?: boolean
}

export interface VeinsPhoneHistoryItemPublic {
    id: string
    name: string
    number: string
    datetime: string
    in?: boolean
    answer?: boolean
}

export const VeinsPhoneHistoryItemSamples = [
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
] as VeinsPhoneHistoryItemPublic[]

export interface VeinsPhoneSpeedDialItem extends VeinsPhoneBookItem {}

export interface VeinsPhoneSpeedDialItemPublic extends VeinsPhoneBookItemPublic {}

export const VeinsPhoneSpeedDialItemSample = {
    id: '',
    name: '',
    number: '',
    on: false,
    open: false,
    local: false,
    disables: { call: false, listen: false, whisper: false, barge: false }
} as VeinsPhoneSpeedDialItem

export const VeinsPhoneSpeedDialItemSamples = [
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
] as VeinsPhoneSpeedDialItemPublic[]

export type VeinsPhoneLocalKeyPrefixes = {
    [key in VeinsPhoneUpperX]: {
        [key in VeinsPhoneUpperY]: string
    }
}

export const VeinsPhoneLocales = { EN: 'en', JA: 'ja' } as { [k: string]: VeinsPhoneLocale }

export const VeinsPhoneConsts = {
    LOCAL_KEY: {
        LOCALE: 'LOCALE',
        TAB: 'TAB',
        BOOK_ITEMS: 'BOOK_ITEMS',
        HISTORY_ITEMS: 'HISTORY_ITEMS',
        SPEED_DIAL_ITEMS: 'SPEED_DIAL_ITEMS',
        IS_SET_OTHER_SETTINGS: 'IS_SET_OTHER_SETTINGS',
        IS_TAB_MEMORY_ACTIVE: 'IS_TAB_MEMORY_ACTIVE',
        IS_SAVE_BOOK_IN_LOCAL: 'IS_SAVE_BOOK_IN_LOCAL',
        IS_SAVE_HISTORY_IN_LOCAL: 'IS_SAVE_HISTORY_IN_LOCAL',
        IS_SAVE_SPEED_DIAL_IN_LOCAL: 'IS_SAVE_SPEED_DIAL_IN_LOCAL',
        IS_USE_PARK: 'IS_USE_PARK',
        IS_USE_TRANSFER: 'IS_USE_TRANSFER',
        IS_USE_LINE_IN_LIST: 'IS_USE_LINE_IN_LIST',
        IS_EVENT_LOG: 'IS_EVENT_LOG',
    }
}

export type VeinsPhoneCallingMaskItem = {
    title: string, // for v-html
    content: string // for v-html
}

export type VeinsPhoneCallingMaskTable = {
    caption: string, // for v-html
    items: VeinsPhoneCallingMaskItem[]
}

export const VeinsPhoneCallingMaskTablesSample = [
    {
        caption: 'Caption01',
        items: [
            { title: 'title01-1', content: 'content01-1' },
            { title: 'title01-2', content: 'content01-2' },
            { title: 'title01-3', content: 'content01-3' },
        ]
    },
    {
        caption: 'Caption02',
        items: [
            { title: 'title02-1', content: 'content02-1' },
            { title: 'title02-2', content: 'content02-2' },
            { title: 'title02-3', content: 'content02-3' },
        ]
    },
    {
        caption: 'Caption03',
        items: [
            { title: 'title03-1', content: 'content03-1' },
            { title: 'title03-2', content: 'content03-2' },
            { title: 'title03-3', content: 'content03-3' },
        ]
    },
] as VeinsPhoneCallingMaskTable[]

export type VeinsPhoneOpenCallingMaskOptions = {
    title?: string
    mode?: VeinsPhoneCallingMaskModeType,
    tables?: VeinsPhoneCallingMaskTable[],
    html?: string,
    isFullCustom?: boolean,
    timeout?: number,
    info?: VeinsCallingInfo | VeinsReceivingInfo
}

export const VeinsPhoneOpenCallingMaskOptionsSample = {
    title: undefined,
    mode: VeinsPhoneCallingMaskMode.CALLING,
    tables: VeinsPhoneCallingMaskTablesSample,
    html: '<span>Veins</span>',
    isFullCustom: false,
    timeout: DEFAULT_CALLING_TIMEOUT
} as VeinsPhoneOpenCallingMaskOptions

/*****************************
 * Veins Client Event Model
 *****************************/
export type VeinsEventPhoneOnCreate = {
    id: string
}
export type VeinsEventPhoneOnMounted = {
    id: string
}
export type VeinsEventPhoneOnOpen = {
    id: string
}
export type VeinsEventPhoneOnClose = {
    id: string
}
export type VeinsEventPhoneOnOpenSnackbar = {
    id: string
    message: string,
    timeout?: number,
    icon?: string,
    line?: 1 | 2
}
export type VeinsEventPhoneOnCloseSnackbar = {
    id: string
}
export type VeinsEventPhoneOnLocaleChange = {
    id: string
    oldLocale: string
    newLocale: string
}
export type VeinsEventPhoneOnTabChange = {
    id: string,
    tab: VeinsPhoneTabType
}
export type VeinsEventPhoneOnInputNumberChange = {
    id: string,
    value: string,  // current number value
    input: string   // 1 digit number inputted
}
export type VeinsEventPhoneOnCall = {
    id: string,
    number: string
}
export type VeinsEventPhoneOnFilterBook = {
    id: string
    search: string
    filteredItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnFilterHistory = {
    id: string
    search: string
    filteredItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnFilterSpeedDial = {
    id: string
    search: string
    filteredItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnSearchBook = {
    id: string
    search: string
    filteredItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnSearchHistory = {
    id: string
    search: string
    filteredItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnSearchSpeedDial = {
    id: string
    search: string
    filteredItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnPutLines = {
    id: string
    oldLines: VeinsPhoneLine[]
    newLines: VeinsPhoneLine[]
}
export type VeinsEventPhoneOnPutLinesByUrl = {
    id: string
    oldLines: VeinsPhoneLine[]
    newLines: VeinsPhoneLine[]
}
export type VeinsEventPhoneOnPutBookItems = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnPutBookItemsByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnPutHistoryItems = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnPutHistoryItemsByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnPutSpeedDialItems = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnPutSpeedDialItemsByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnPutBookItemsLocal = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnPutBookItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
}
export type VeinsEventPhoneOnPutHistoryItemsLocal = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnPutHistoryItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
}
export type VeinsEventPhoneOnPutSpeedDialItemsLocal = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnPutSpeedDialItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
}
export type VeinsEventPhoneOnPushBookItems = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItems: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnPushBookItemsByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItems: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnPushHistoryItems = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedItems: VeinsPhoneHistoryItemPublic[]
}
export type VeinsEventPhoneOnPushHistoryItemsByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedItems: VeinsPhoneHistoryItemPublic[]
}
export type VeinsEventPhoneOnPushSpeedDialItems = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItems: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnPushSpeedDialItemsByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItems: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnPushBookItemsLocal = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItemsLocal: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnPushBookItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItemsLocal: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnPushHistoryItemsLocal = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedItemsLocal: VeinsPhoneHistoryItemPublic[]
}
export type VeinsEventPhoneOnPushHistoryItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedItemsLocal: VeinsPhoneHistoryItemPublic[]
}
export type VeinsEventPhoneOnPushSpeedDialItemsLocal = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItemsLocal: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnPushSpeedDialItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItemsLocal: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnUpdateBookItems = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItems: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnUpdateBookItemsByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItems: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnUpdateSpeedDialItems = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItems: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnUpdateSpeedDialItemsByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItems: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnUpdateBookItemsLocal = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItemsLocal: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnUpdateBookItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedItemsLocal: VeinsPhoneBookItemPublic[]
}
export type VeinsEventPhoneOnUpdateSpeedDialItemsLocal = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItemsLocal: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnUpdateSpeedDialItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedItemsLocal: VeinsPhoneSpeedDialItemPublic[]
}
export type VeinsEventPhoneOnDeleteBookItems = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteBookItemsByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteHistoryItems = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteHistoryItemsByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteSpeedDialItems = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteSpeedDialItemsByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteBookItemsLocal = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteBookItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneBookItem[]
    newItems: VeinsPhoneBookItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteHistoryItemsLocal = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteHistoryItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneHistoryItem[]
    newItems: VeinsPhoneHistoryItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteSpeedDialItemsLocal = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnDeleteSpeedDialItemsLocalByUrl = {
    id: string
    oldItems: VeinsPhoneSpeedDialItem[]
    newItems: VeinsPhoneSpeedDialItem[]
    requestedIDs: string[]
}
export type VeinsEventPhoneOnOpenCallingMask = {
    id: string
    title: string | undefined
    mode: VeinsPhoneCallingMaskModeType
    tables: VeinsPhoneCallingMaskTable[]
    html: string
    isFullCustom?: boolean
}
export type VeinsEventPhoneOnCloseCallingMask = {
    id: string
}
export type VeinsEventPhoneOnPutCustomCallingMaskHtml = {
    id: string
    html: string
}
export interface VeinsEventPhoneOnCreateBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnCreateSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export type VeinsEventPhoneOnUpdateBookItem = {
    id: string
    oldItem: VeinsPhoneBookItem
    newItem: VeinsPhoneBookItem
}

export type VeinsEventPhoneOnUpdateSpeedDialItem = {
    id: string
    oldItem: VeinsPhoneSpeedDialItem
    newItem: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnDeleteBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnDeleteHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnDeleteSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnClickBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnClickHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnClickSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnRightClickBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnRightClickHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnRightClickSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnLongPressBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnLongPressHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnLongPressSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnCallBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnCallHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnCallSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnListenBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnListenSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnWhisperBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnWhisperSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnBargeBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnBargeSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}

export interface VeinsEventPhoneOnDetailBookItem {
    id: string
    item: VeinsPhoneBookItem
}

export interface VeinsEventPhoneOnDetailHistoryItem {
    id: string
    item: VeinsPhoneHistoryItem
}

export interface VeinsEventPhoneOnDetailSpeedDialItem {
    id: string
    item: VeinsPhoneSpeedDialItem
}
export interface VeinsEventPhoneOnCancel {
    id: string
}
export interface VeinsEventPhoneOnReject {
    id: string
}
export interface VeinsEventPhoneOnAccept {
    id: string
}
export interface VeinsEventPhoneOnTurnMicOn {
    id: string
}
export interface VeinsEventPhoneOnTurnMicOff {
    id: string
}
export interface VeinsEventPhoneOnClickKeypad {
    id: string
}
export interface VeinsEventPhoneOnTurnSpeakerOn {
    id: string
}
export interface VeinsEventPhoneOnTurnSpeakerOff {
    id: string
}
export interface VeinsEventPhoneOnTurnHoldOn {
    id: string
}
export interface VeinsEventPhoneOnTurnHoldOff {
    id: string
}
export interface VeinsEventPhoneOnHangup {
    id: string
}
export interface VeinsEventPhoneOnClickTransfer {
    id: string
}
export interface VeinsEventPhoneOnClickKeypadNumber {
    id: string
    number: string
}
export type VeinsEventPhoneOnTransferInTalking = {
    id: string
    item: VeinsPhoneBookItem
}
export type VeinsEventPhoneOnPutActiveParkSlots = {
    id: string
    activeParkSlots: number[]
}
export type VeinsEventPhoneOnPushActiveParkSlot = {
    id: string
    slot: number
}
export type VeinsEventPhoneOnDeleteActiveParkSlot = {
    id: string
    slot: number
}
export type VeinsEventPhoneOnParkedUp = {
    id: string
    slot: number
}

export type VeinsEventPhoneOnUaPrepared = {
    id: string,
    sip?: VeinsSip
    veins?: VeinsAccount
}

export type VeinsEventPhoneOnConnect = {
    id: string
}

export type VeinsEventPhoneOnDisconnect = {
    id: string
    error?: Error
}

export type VeinsEventPhoneOnRegister = {
    id: string
}

export type VeinsEventPhoneOnUnregister = {
    id: string
}

export type VeinsEventPhoneOnCallTo = {
    id: string
    type: CallType
    info: VeinsCallingInfo
}

export type VeinsEventPhoneOnAnswer = {
    id: string
    isIn?: boolean
    info: VeinsCallingReceivingInfo
}

export type VeinsEventPhoneOnReceive = {
    id: string
    callerIdName: string
    callerIdNum: string
    evID: string
    evName: string
    evModelName: string
    ev: VeinsPbxIncomingEv
}

export type VeinsEventPhoneOnTerminate = {
    id: string
    isIn?: boolean
    info: VeinsCallingReceivingInfo
}

export type VeinsEventPhoneOnHold = {
    id: string
    isIn?: boolean
    info: VeinsCallingReceivingInfo
}

export type VeinsEventPhoneOnUnhold = {
    id: string
    isIn?: boolean
    info: VeinsCallingReceivingInfo
}

/*****************************
 * Veins PBX Event Model
 *****************************/
export const VeinsPbxIncomingTypes = {
    OUT_TO_WS_PUB_START: 'OutToWsPubStart',
    OUT_TO_RM_PUB_START: 'OutToRmPubStart',
    OUT_TO_RM_IN_WS_START: 'OutToRmInWsStart',
    OUT_TO_USR_PUB_START: 'OutToUsrPubStart',
    OUT_TO_USR_IN_WS_START: 'OutToUsrInWsStart',
    OUT_TO_USR_IN_RM_START: 'OutToUsrInRmStart',
    CALL_START: 'CallStart',
    QUE_START: 'QueStart'
}
export type VeinsPbxActType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const VeinsPbxActTypes = {
    AWR: 1,
    CALL: 2,
    PLY: 3,
    LISN: 4,
    XFER: 5,
    REC: 6,
    QUE: 7,
    JMP: 8,
    CONN: 9
} as { [k: string]: VeinsPbxActType }

export type VeinsPbxIncomingEv = VeinsPbxOutToWsPubStart | VeinsPbxOutToRmPubStart | VeinsPbxOutToRmInWsStart | VeinsPbxOutToUsrPubStart | VeinsPbxOutToUsrInWsStart | VeinsPbxOutToUsrInRmStart | VeinsPbxCallStart | VeinsPbxQueStart

export type VeinsPbxAct = {
	Type: VeinsPbxActType
	ID: number
	Param: string
}

export type VeinsPbxOneLayerRule = {
	Acts: VeinsPbxAct[]
	Nexts: VeinsPbxRuleMap
}

export type VeinsPbxRuleMap = {
    [k: string]: VeinsPbxOneLayerRule
}

export type VeinsPbxBase = {
	ID: string
	Unix: number
	ApxID: number
	VdrID: number
	Number: string
	Exten: string
}

export type VeinsPbxEvWs = {
	ID: number
	Name: string
	PubNum: string
}

export type VeinsPbxEvRm = {
	ID: number
	Name: string
	PubNum: string
}

export type VeinsPbxEvUsr = {
	ID: number
	Name: string
	PubNum: string
	Email: string
}

export type VeinsPbxEvLn = {
	ID: number
	Name: string
	Number: string
	Username: string
}

export type VeinsPbxEvCall = {
	ActID: number
	Name: string
	CallType: number
	WsID: number
	RmID: number
	UsrID: number
	DialTimeout: number
	Data: string
}

export type VeinsPbxEvQue = {
	ActID: number
	Name: string
	CallType: number
	AcdType: number
	WsID: number
	RmID: number
	UsrID: number
	DialTimeout: number
	WaitTimeout: number
	Interval: number
	Urls: string[]
	Data: string
}

export type VeinsPbxEvRule = {
	ID: number
	Name: string
	Map: VeinsPbxRuleMap
}

export type VeinsPbxEvInFrom = {
	Number: string
}

export type VeinsPbxOutToWsPubStartTo = {
	Ws: VeinsPbxEvWs
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToWsPubStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToWsPubStartTo
}

export type VeinsPbxOutToRmPubStartTo = {
	Rm: VeinsPbxEvRm
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToRmPubStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToRmPubStartTo
}

export type VeinsPbxOutToRmInWsStartTo = {
	Ws: VeinsPbxEvWs
	Rm: VeinsPbxEvRm
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToRmInWsStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToRmInWsStartTo
}

export type VeinsPbxOutToUsrPubStartTo = {
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToUsrPubStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToUsrPubStartTo
}

export type VeinsPbxOutToUsrInWsStartTo = {
	Ws: VeinsPbxEvWs
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToUsrInWsStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToUsrInWsStartTo
}

export type VeinsPbxOutToUsrInRmStartTo = {
	Rm: VeinsPbxEvRm
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxOutToUsrInRmStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvUsr
	To: VeinsPbxOutToUsrInRmStartTo
}

export type VeinsPbxInStartTo = {
	Ln: VeinsPbxEvLn
}

export type VeinsPbxInStart = {
	Base: VeinsPbxBase
	From: VeinsPbxEvInFrom
	To: VeinsPbxInStartTo
}

export type VeinsPbxRuleStart = {
	Base: VeinsPbxBase
	Rule: VeinsPbxEvRule
	From: VeinsPbxEvInFrom
	To: VeinsPbxInStartTo
	InStart: VeinsPbxInStart
}

export type VeinsPbxCallStartToWs = {
	Ws: VeinsPbxEvWs
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxCallStartToRm = {
	Rm: VeinsPbxEvRm
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxCallStartToUsr = {
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxCallStartTo = {
	Ln: VeinsPbxEvLn
	Call: VeinsPbxEvCall
	ToWs: VeinsPbxCallStartToWs
	ToRm: VeinsPbxCallStartToRm
	ToUsr: VeinsPbxCallStartToUsr
}

export type VeinsPbxCallStart = {
	Base: VeinsPbxBase
	Index: string
	ActAt: number
	From: VeinsPbxEvInFrom
	To: VeinsPbxCallStartTo
	InStart: VeinsPbxInStart
	RuleStart: VeinsPbxRuleStart
}

export type VeinsPbxQueStartToWs = {
	Ws: VeinsPbxEvWs
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxQueStartToRm = {
	Rm: VeinsPbxEvRm
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxQueStartToUsr = {
	Usrs: VeinsPbxEvUsr[]
}

export type VeinsPbxQueStartTo = {
	Ln: VeinsPbxEvLn
	Que: VeinsPbxEvQue
	ToWs: VeinsPbxQueStartToWs
	ToRm: VeinsPbxQueStartToRm
	ToUsr: VeinsPbxQueStartToUsr
}

export type VeinsPbxQueStart = {
	Base: VeinsPbxBase
	Index: string
	ActAt: number
	From: VeinsPbxEvInFrom
	To: VeinsPbxQueStartTo
	InStart: VeinsPbxInStart
	RuleStart: VeinsPbxRuleStart
}
/*****************************
 * Veins App Event Model
 *****************************/
export type VeinsEventAppOnCreate = {
    id: string
}
export type VeinsEventAppOnMounted = {
    id: string
}
export type VeinsEventAppOnOpen = {
    id: string
}
export type VeinsEventAppOnClose = {
    id: string
}