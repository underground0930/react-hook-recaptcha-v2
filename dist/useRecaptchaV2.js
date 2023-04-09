import { useCallback, useEffect, useRef, useState } from 'react';
export const useRecaptchaV2 = ({ sitekey, size, scriptId = 'recaptchaApiScript', hl = 'ja', badge = 'bottomright', callback, expiredCallback, errorCallback, }) => {
    const recaptchaRef = useRef(null);
    const [recaptchaId, setRecaptchaId] = useState(null);
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
        const { current } = recaptchaRef;
        // stop reRender
        if (current && current.innerHTML !== '')
            return;
        setRecaptchaId(window.grecaptcha.render(current, {
            sitekey,
            size,
            badge,
            callback,
            'expired-callback': expiredCallback,
            'error-callback': errorCallback,
        }));
    }, [recaptchaId]);
    const resetRecaptcha = () => {
        if (window.grecaptcha && recaptchaId !== null) {
            window.grecaptcha.reset(recaptchaId);
        }
    };
    const executeRecaptcha = async () => {
        if (window.grecaptcha && recaptchaId !== null) {
            try {
                await window.grecaptcha.execute(recaptchaId);
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
        return () => {
            resetRecaptcha();
        };
    }, [renderRecaptcha]);
    return { recaptchaRef, resetRecaptcha, executeRecaptcha };
};
