/// <reference types="grecaptcha" />
/// <reference types="react" />
export type Props = {
    sitekey: string;
    targetId: string;
    scriptId?: string;
    hl?: string;
    size?: ReCaptchaV2.Size;
    badge?: ReCaptchaV2.Badge;
    callback?: () => void;
    expiredCallback?: () => void;
    errorCallback?: () => void;
};
export type UseRecaptchaResult = {
    recaptchaRef: React.MutableRefObject<HTMLDivElement | null>;
    recaptchaToken: string | null;
    resetRecaptcha: () => void;
};
export declare const useRecaptchaV2: ({ sitekey, targetId, size, scriptId, hl, badge, callback, expiredCallback, errorCallback, }: Props) => UseRecaptchaResult;
