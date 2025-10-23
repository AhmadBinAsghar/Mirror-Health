enum NotifierType {
    Data_Tel = 0,
    Data_Sms = 1,
    Data_WeChat = 2,
    Data_Facebook = 3,
    Data_Instagram = 4,
    Data_Skype = 5,
    Data_Telegram = 6,
    Data_Twitter = 7,
    Data_Vkclient = 8,
    Data_WhatApp = 9,
    Data_QQ = 10,
    Data_IN = 11,
    Data_Stop_Tel = 0xff
}

class Notifier {
    type: NotifierType;
    info: string = "";
    title: string = "";

    constructor(type: NotifierType) {
        this.type = type;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getType(): NotifierType {
        return this.type;
    }

    setType(type: NotifierType): void {
        this.type = type;
    }

    getInfo(): string {
        return this.info;
    }

    setInfo(info: string): void {
        this.info = info;
    }

    toString(): string {
        return `Notifier{type=${this.type}, info='${this.info}', title='${this.title}'}`;
    }
}