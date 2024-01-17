import React, {
    memo, useCallback, useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "../components/Button";
import Modal from "../components/AuthModal";
import { logoutAction } from "../store/actions/app";

import { MODAL_AUTO_CLOSE_TIME } from "../constants";
import { callBackIsFn } from "../helpers";
import { RootState } from "../store";

function Header() {
    const dispatch = useAppDispatch();
    const { isAdmin } = useAppSelector((store: RootState) => store.app);
    const [open, setOpen] = useState<boolean>(false);

    const authModalHandler = useCallback((callback: any) => {
        if (isAdmin) {
            return dispatch(logoutAction());
        }
        if (callBackIsFn(callback)) {
            setTimeout(() => {
                callback();
            }, MODAL_AUTO_CLOSE_TIME);
        }
        return setOpen(!open);
    }, [open]);

    return (
        <header className="header">
            <Button
                type="button"
                onClick={authModalHandler}>
                {isAdmin ? "Выйти" : "Админ"}
            </Button>
            <Modal
                authModalHandler={authModalHandler}
                open={open} />
        </header>
    );
}

export default memo(Header);
