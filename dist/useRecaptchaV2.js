import { useCallback, useEffect, useRef, useState } from 'react';
export const useRecaptchaV2 = ({ sitekey, targetId, size, scriptId = 'recaptchaApiScript', hl = 'ja', badge = 'bottomright', callback, expiredCallback, errorCallback, }) => {
    const recaptchaRef = useRef(null);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);
    const loadRecaptchaScript = () => {
        if (document.getElementById(scriptId))
            return;
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${hl}`;
        script.async = true;
        script.defer = true;
        script.id = scriptId;
        script.onload = () => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(renderRecaptcha);
            }
        };
        document.body.appendChild(script);
    };
    const renderRecaptcha = useCallback(() => {
        if (!window.grecaptcha || typeof window.grecaptcha?.render !== 'function') {
            return;
        }
        const target = document.getElementById(targetId);
        // stop reRender
        if (target && target.innerHTML !== '')
            return;
        setRecaptchaInstance(window.grecaptcha.render(recaptchaRef.current, {
            sitekey,
            size,
            badge,
            callback: (token) => {
                setRecaptchaToken(token);
                callback?.();
            },
            'expired-callback': () => {
                setRecaptchaToken(null);
                expiredCallback?.();
            },
            'error-callback': () => {
                setRecaptchaToken(null);
                errorCallback?.();
            },
        }));
        return () => {
            resetRecaptcha();
        };
    }, [recaptchaInstance]);
    const resetRecaptcha = () => {
        if (window.grecaptcha && recaptchaInstance !== null) {
            window.grecaptcha.reset(recaptchaInstance);
        }
    };
    const executeRecaptcha = async () => {
        if (window.grecaptcha && recaptchaInstance !== null) {
            try {
                await window.grecaptcha.execute(recaptchaInstance);
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    useEffect(() => {
        if (!window.grecaptcha) {
            loadRecaptchaScript();
        }
        else {
            window.grecaptcha.ready(renderRecaptcha);
        }
    }, [renderRecaptcha]);
    return { recaptchaRef, recaptchaToken, resetRecaptcha, executeRecaptcha };
};
