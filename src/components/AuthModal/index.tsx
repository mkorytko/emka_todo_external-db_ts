import React, {
    memo, useEffect, useState, useCallback, useRef, FormEvent, ChangeEvent,
} from "react";
import { useAppDispatch } from "../../store/hooks";
import Button from "../Button";
import { loginRequestAction, showNotifyAction } from "../../store/actions/app";
import {
    ADMIN_LOGIN, ADMIN_PWD,
    AUTH_ERROR_AUTO_CLEAR_TIME,
    AUTHORISE_FAILED_RULES,
} from "../../constants";

import "./style.scss";

interface AuthFields {
    login: string,
    pwd: string,
}

interface Props {
    open: boolean,
    authModalHandler: (c: () => void) => any,
}

const initialLogData: AuthFields = {
    login: "",
    pwd: "",
};

function AuthModal(props: Props) {
    const { open, authModalHandler } = props;
    const dispatch = useAppDispatch();
    const [fields, setFields] = useState<AuthFields>({ ...initialLogData });
    const [error, setError] = useState<boolean>(false);
    const loginInputRef = useRef<HTMLInputElement | null>(null);

    const onChangeInput = useCallback(({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [name]: value });
    }, [fields]);

    useEffect(() => {
        if (open) {
            loginInputRef?.current?.focus();
        } else {
            loginInputRef?.current?.blur();
        }
    }, [open]);

    const onClose = useCallback(() => {
        authModalHandler(() => setFields({ ...initialLogData }));
    }, [authModalHandler]);

    const _onSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const { login, pwd } = fields;
        if (login && pwd) {
            if (login !== ADMIN_LOGIN || pwd !== ADMIN_PWD) {
                setError(true);
            }
            return dispatch(loginRequestAction({ login, pwd }, onClose));
        }
        dispatch(showNotifyAction("error", AUTHORISE_FAILED_RULES));
        return setError(true);
    }, [fields]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, AUTH_ERROR_AUTO_CLEAR_TIME);
        }
    }, [error]);

    return (
        <form
            onSubmit={_onSubmit}
            className={`modal-container ${open ? "active" : ""}`}>
            <label htmlFor="login">
                <input
                    ref={loginInputRef}
                    onChange={onChangeInput}
                    value={fields.login}
                    className={`form-input ${error ? "error" : ""}`}
                    name="login"
                    placeholder="логин"
                    type="text"
                    id="login" />
            </label>
            <label htmlFor="pwd">
                <input
                    onChange={onChangeInput}
                    value={fields.pwd}
                    className={`form-input ${error ? "error" : ""}`}
                    name="pwd"
                    placeholder="пароль"
                    type="text"
                    id="pwd" />
            </label>
            <div className="footer">
                <Button
                    type="button"
                    onClick={onClose}>
                    Закрыть
                </Button>
                <Button type="submit">
                    Войти
                </Button>
            </div>
        </form>
    );
}

export default memo(AuthModal);
