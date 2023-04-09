/// <reference types="grecaptcha" />
/// <reference types="react" />
export type Options = {
    sitekey: string;
    scriptId?: string;
    hl?: string;
    size?: ReCaptchaV2.Size;
    badge?: ReCaptchaV2.Badge;
    callback: (token: string | null) => void;
    expiredCallback?: () => void;
    errorCallback?: () => void;
};
export type UseRecaptchaResult = {
    recaptchaRef: React.MutableRefObject<HTMLDivElement | null>;
    resetRecaptcha: () => void;
    executeRecaptcha: () => Promise<void>;
};
export declare const useRecaptchaV2: ({ sitekey, size, scriptId, hl, badge, callback, expiredCallback, errorCallback, }: Options) => UseRecaptchaResult;
